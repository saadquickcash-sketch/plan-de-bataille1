/**
 * Plan de Bataille — Fonction serverless « IA Premium » (Cloudflare Pages Functions)
 * ------------------------------------------------------------------------------
 * Appelle un modèle IA PUISSANT en gardant la ou les clés SECRÈTES côté serveur.
 * Les clés n'apparaissent JAMAIS dans le site public.
 *
 * ▶ BASCULEMENT AUTOMATIQUE (plusieurs clés) — NOUVEAU
 *   Tu peux configurer PLUSIEURS clés/fournisseurs. Si l'un se bloque
 *   (limite de débit 429, clé invalide 401/403, panne serveur, délai dépassé),
 *   le suivant prend le relais AUTOMATIQUEMENT, sans que l'élève voie d'erreur.
 *
 *   Clé n°1 (principale) :   AI_API_KEY   (+ AI_PROVIDER / AI_BASE / AI_MODEL / AI_VISION_MODEL)
 *   Clé n°2 (secours)    :   AI_API_KEY2  (+ AI_PROVIDER2 / AI_BASE2 / AI_MODEL2 / AI_VISION_MODEL2)
 *   Clé n°3 (secours)    :   AI_API_KEY3  (+ …3)   … jusqu'à AI_API_KEY6
 *
 *   • Si tu ajoutes SEULEMENT AI_API_KEY2, AI_API_KEY3 (sans les autres variables),
 *     elles héritent du même fournisseur/modèle que la clé n°1 → simple rotation de
 *     clés pour NE PLUS être bloqué par les limites de débit. C'est le cas le plus courant.
 *   • Si tu ajoutes AI_PROVIDER2 = gemini + AI_MODEL2 + AI_API_KEY2, la clé n°2 devient
 *     un fournisseur DIFFÉRENT (ex. Gemini) utilisé en secours de Groq.
 *
 * ▶ SPÉCIALISATION PAR DOMAINE (facultatif)  —  AI_ROLE{n}
 *   AI_ROLE   = text | vision | all   (défaut : all)
 *   Ex. : une clé dédiée aux PHOTOS (analyse d'image) et une autre au TEXTE :
 *       AI_ROLE    = text            (clé n°1 = seulement le texte)
 *       AI_ROLE2   = vision          (clé n°2 = seulement l'analyse de photos)
 *   Pour une question TEXTE : on essaie les clés « text » et « all ».
 *   Pour une PHOTO          : on essaie les clés « vision » et « all ».
 *
 *   Fournisseurs pris en charge :
 *   • GOOGLE GEMINI  : AI_PROVIDER=gemini, AI_MODEL=gemini-2.5-flash, AI_API_KEY=AQ.… / AIza…
 *   • Compatible OpenAI (OpenAI, Groq, OpenRouter…) : AI_API_KEY, AI_MODEL, AI_BASE (endpoint /chat/completions)
 */

const SLOTS = ['', '2', '3', '4', '5', '6'];           // AI_API_KEY, AI_API_KEY2 … AI_API_KEY6
const REQUEST_TIMEOUT_MS = 40000;                       // au-delà, on bascule vers la clé suivante

export async function onRequestPost(context) {
  const { request, env } = context;
  const cors = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': 'same-origin',
    'Cache-Control': 'no-store'
  };
  const bad = (status, error) => new Response(JSON.stringify({ error }), { status, headers: cors });

  const backends = buildBackends(env);
  if (!backends.length) {
    return bad(503, "L'IA Premium n'est pas encore configurée (AI_API_KEY manquante).");
  }

  let body;
  try { body = await request.json(); } catch (e) { return bad(400, 'Requête invalide.'); }
  const messages = Array.isArray(body && body.messages) ? body.messages : null;
  if (!messages || !messages.length) return bad(400, 'Aucun message.');

  // borne la taille pour maîtriser le coût ; garde le contenu "vision" (tableau texte+image) tel quel
  const trimmed = messages.slice(-18).map(m => {
    const role = (m.role === 'system' || m.role === 'assistant' || m.role === 'user') ? m.role : 'user';
    if (Array.isArray(m.content)) return { role, content: m.content }; // message avec image (vision)
    return { role, content: String(m.content == null ? '' : m.content).slice(0, 8000) };
  });

  // Y a-t-il une image dans la requête ? (analyse de photo)
  const hasImage = trimmed.some(m => Array.isArray(m.content) && m.content.some(p => p && p.type === 'image_url'));

  // On ne garde que les clés adaptées au domaine demandé (texte ou vision)
  const usable = backends.filter(b => hasImage ? (b.role === 'vision' || b.role === 'all')
                                               : (b.role === 'text'   || b.role === 'all'));
  const chain = usable.length ? usable : backends;   // filet de sécurité : jamais vide

  const errors = [];
  for (let i = 0; i < chain.length; i++) {
    const b = chain[i];
    const model = hasImage ? b.visionModel : b.model;
    const maxTokens = hasImage ? b.visionMax : b.textMax;
    try {
      let reply = b.isGemini
        ? await callGemini(b, trimmed, model, maxTokens)
        : await callOpenAICompat(b, trimmed, model, maxTokens);
      reply = stripThink(reply);
      if (reply) {
        return new Response(JSON.stringify({ reply }), {
          status: 200,
          headers: Object.assign({}, cors, { 'X-AI-Backend': String(b.idx), 'X-AI-Tried': String(i + 1) })
        });
      }
      errors.push('clé#' + b.idx + ' : réponse vide');   // on tente la suivante
    } catch (e) {
      errors.push('clé#' + b.idx + ' : ' + ((e && e.message) ? e.message : 'erreur'));
      // on continue vers la clé suivante (basculement automatique)
    }
  }

  // Toutes les clés ont échoué
  return bad(502, "Toutes les IA configurées sont momentanément indisponibles. " + redactKeys(errors.join(' | ')).slice(0, 400));
}

/* ---------- Construit la liste des « backends » (une par clé configurée) ---------- */
function buildBackends(env) {
  if (!env) return [];
  const list = [];
  const dflBase = 'https://api.openai.com/v1/chat/completions';
  for (let n = 0; n < SLOTS.length; n++) {
    const s = SLOTS[n];
    const key = env['AI_API_KEY' + s];
    if (!key) continue;
    // Chaque variable numérotée hérite de la variable de base si elle n'est pas définie
    const base = env['AI_BASE' + s] || env.AI_BASE || dflBase;
    const provider = String(env['AI_PROVIDER' + s] || env.AI_PROVIDER || '').toLowerCase();
    const isGemini = provider === 'gemini' || /generativelanguage\.googleapis\.com/i.test(base);
    const model = env['AI_MODEL' + s] || env.AI_MODEL || (isGemini ? 'gemini-2.5-flash' : 'gpt-4o');
    const visionModel = env['AI_VISION_MODEL' + s] || env.AI_VISION_MODEL || (isGemini ? model : 'qwen/qwen3.6-27b');
    const textMax = Number(env['AI_MAXTOK' + s] || env.AI_MAXTOK) || 1800;
    const visionMax = Number(env['AI_VISION_MAXTOK' + s] || env.AI_VISION_MAXTOK) || 900;
    let role = String(env['AI_ROLE' + s] || 'all').toLowerCase();
    if (role !== 'text' && role !== 'vision') role = 'all';
    list.push({ idx: n + 1, key, base, isGemini, model, visionModel, textMax, visionMax, role });
  }
  return list;
}

/* ---------- fetch avec délai maximal (bascule plus vite en cas de blocage) ---------- */
async function fetchWithTimeout(url, opts) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, Object.assign({}, opts, { signal: ctrl.signal }));
  } catch (e) {
    if (e && e.name === 'AbortError') throw new Error('délai dépassé');
    throw e;
  } finally {
    clearTimeout(t);
  }
}

/* ---------- Retire le raisonnement interne <think>…</think> des modèles "reasoning" ---------- */
function stripThink(s) {
  if (!s) return s;
  s = String(s);
  s = s.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();   // bloc complet
  s = s.replace(/<think>[\s\S]*$/i, '').trim();             // bloc ouvert non fermé (réponse tronquée)
  s = s.replace(/^[\s\S]*?<\/think>/i, '').trim();          // fin de bloc sans début
  return s;
}

/* ---------- Masque toute clé API dans un texte d'erreur (sécurité) ---------- */
function redactKeys(s) {
  return String(s == null ? '' : s)
    .replace(/AQ\.[A-Za-z0-9._\-]+/g, '[clé masquée]')
    .replace(/AIza[A-Za-z0-9._\-]+/g, '[clé masquée]')
    .replace(/gsk_[A-Za-z0-9._\-]+/g, '[clé masquée]')
    .replace(/sk-[A-Za-z0-9._\-]+/g, '[clé masquée]')
    .replace(/api[_-]?key["'\s:=]+[A-Za-z0-9._\-]+/gi, 'api_key:[masquée]');
}

/* ---------- Fournisseur « compatible OpenAI » (OpenAI, Groq, OpenRouter…) ---------- */
async function callOpenAICompat(backend, trimmed, modelOverride, maxTokens) {
  const model = modelOverride || backend.model || 'gpt-4o';
  const res = await fetchWithTimeout(backend.base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + backend.key },
    body: JSON.stringify({ model, messages: trimmed, temperature: 0.6, max_tokens: maxTokens || 1800 })
  });
  if (!res.ok) { let d = ''; try { d = (await res.text()).slice(0, 200); } catch (e) {} throw new Error("HTTP " + res.status + " " + redactKeys(d)); }
  const data = await res.json();
  return (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) ||
         (data && data.content && Array.isArray(data.content) && data.content[0] && data.content[0].text) || '';
}

/* ---------- Google Gemini (endpoint NATIF — marche avec les clés AQ.… et AIza…) ---------- */
async function callGemini(backend, trimmed, modelOverride, maxTokens) {
  const model = modelOverride || backend.model || 'gemini-2.5-flash';
  // systemInstruction = tous les messages "system" réunis ; le reste en user/model
  const sysText = trimmed.filter(m => m.role === 'system').map(m => (typeof m.content === 'string' ? m.content : '')).join('\n\n');
  const toParts = (content) => {
    if (Array.isArray(content)) {
      const parts = [];
      for (const p of content) {
        if (p && p.type === 'text') parts.push({ text: p.text || '' });
        else if (p && p.type === 'image_url' && p.image_url && p.image_url.url) {
          const mm = /^data:([^;]+);base64,(.*)$/.exec(p.image_url.url);
          if (mm) parts.push({ inline_data: { mime_type: mm[1], data: mm[2] } });
        }
      }
      return parts.length ? parts : [{ text: '' }];
    }
    return [{ text: String(content == null ? '' : content) }];
  };
  const contents = trimmed
    .filter(m => m.role !== 'system')
    .map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: toParts(m.content) }));
  const payload = {
    contents,
    generationConfig: { temperature: 0.6, maxOutputTokens: maxTokens || 1600 }
  };
  if (sysText) payload.systemInstruction = { parts: [{ text: sysText }] };

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/' +
              encodeURIComponent(model) + ':generateContent';
  const res = await fetchWithTimeout(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': backend.key },
    body: JSON.stringify(payload)
  });
  if (!res.ok) { let d = ''; try { d = (await res.text()).slice(0, 220); } catch (e) {} throw new Error("Gemini HTTP " + res.status + " " + redactKeys(d)); }
  const data = await res.json();
  const cand = data && data.candidates && data.candidates[0];
  const parts = cand && cand.content && cand.content.parts;
  if (Array.isArray(parts)) return parts.map(p => p && p.text ? p.text : '').join('');
  return '';
}

// Sonde de disponibilité : GET /api/chat -> {ok, configured, provider, keys}
export async function onRequestGet(context) {
  const env = context.env || {};
  const backends = buildBackends(env);
  const configured = backends.length > 0;
  const first = backends[0];
  const provider = first ? (first.isGemini ? 'gemini' : (env.AI_BASE ? 'openai-compatible' : 'openai')) : 'none';
  return new Response(JSON.stringify({ ok: true, configured, provider, keys: backends.length }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
  });
}
