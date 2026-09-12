/**
 * Plan de Bataille — Fonction serverless « IA Premium » (Cloudflare Pages Functions)
 * ------------------------------------------------------------------------------
 * Appelle un modèle IA PUISSANT en gardant la clé SECRÈTE côté serveur.
 * La clé n'apparaît JAMAIS dans le site public.
 *
 * ▶ À CONFIGURER dans Cloudflare Pages → Settings → Environment variables :
 *
 *   • Pour GOOGLE GEMINI (recommandé, gratuit — clés « AQ.… » comprises) :
 *       AI_PROVIDER = gemini
 *       AI_MODEL    = gemini-2.5-flash      (un modèle « Flash » = gratuit)
 *       AI_API_KEY  = ta clé (AQ.… ou AIza…)
 *       (AI_BASE n'est PAS nécessaire pour Gemini.)
 *
 *   • Pour un fournisseur compatible « OpenAI » (OpenAI, Groq, OpenRouter…) :
 *       AI_API_KEY  = ta clé
 *       AI_MODEL    = ex. gpt-4o, llama-3.3-70b-versatile…   (optionnel)
 *       AI_BASE     = URL du endpoint /chat/completions       (optionnel)
 *
 * Le client n'appelle cette route QUE pour les comptes Premium ; les comptes
 * gratuits gardent le modèle gratuit.
 *
 * ⚠ Sécurité : pour empêcher l'abus de la route, ajoute une vérification
 *   d'habilitation (voir « TODO habilitation »).
 */

export async function onRequestPost(context) {
  const { request, env } = context;
  const cors = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': 'same-origin',
    'Cache-Control': 'no-store'
  };
  const bad = (status, error) => new Response(JSON.stringify({ error }), { status, headers: cors });

  if (!env || !env.AI_API_KEY) {
    return bad(503, "L'IA Premium n'est pas encore configurée (AI_API_KEY manquante).");
  }

  let body;
  try { body = await request.json(); } catch (e) { return bad(400, 'Requête invalide.'); }
  const messages = Array.isArray(body && body.messages) ? body.messages : null;
  if (!messages || !messages.length) return bad(400, 'Aucun message.');

  /* -------- TODO habilitation (recommandé avant lancement public) --------
     Vérifie ici que l'appelant est bien un abonné Premium (jeton Firebase
     dans body.idToken -> vérifie -> lis son plan). Sinon return bad(402,…).
     En attendant, protège la route par un « Rate limiting » Cloudflare.
  ---------------------------------------------------------------------- */

  // borne la taille pour maîtriser le coût
  const trimmed = messages.slice(-18).map(m => ({
    role: (m.role === 'system' || m.role === 'assistant' || m.role === 'user') ? m.role : 'user',
    content: String(m.content == null ? '' : m.content).slice(0, 8000)
  }));

  // Détection du fournisseur
  const base = env.AI_BASE || 'https://api.openai.com/v1/chat/completions';
  const isGemini =
    String(env.AI_PROVIDER || '').toLowerCase() === 'gemini' ||
    /generativelanguage\.googleapis\.com/i.test(base);

  try {
    const reply = isGemini
      ? await callGemini(env, trimmed)
      : await callOpenAICompat(env, base, trimmed);
    if (!reply) return bad(502, "L'IA n'a rien renvoyé.");
    return new Response(JSON.stringify({ reply }), { status: 200, headers: cors });
  } catch (e) {
    return bad(502, (e && e.message) ? e.message : "Le service d'IA a renvoyé une erreur.");
  }
}

/* ---------- Fournisseur « compatible OpenAI » (OpenAI, Groq, OpenRouter…) ---------- */
async function callOpenAICompat(env, base, trimmed) {
  const model = env.AI_MODEL || 'gpt-4o';
  const res = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + env.AI_API_KEY },
    body: JSON.stringify({ model, messages: trimmed, temperature: 0.6, max_tokens: 1600 })
  });
  if (!res.ok) { let d = ''; try { d = (await res.text()).slice(0, 200); } catch (e) {} throw new Error("Erreur IA (" + res.status + "). " + d); }
  const data = await res.json();
  return (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) ||
         (data && data.content && Array.isArray(data.content) && data.content[0] && data.content[0].text) || '';
}

/* ---------- Google Gemini (endpoint NATIF — marche avec les clés AQ.… et AIza…) ---------- */
async function callGemini(env, trimmed) {
  const model = env.AI_MODEL || 'gemini-2.5-flash';
  // systemInstruction = tous les messages "system" réunis ; le reste en user/model
  const sysText = trimmed.filter(m => m.role === 'system').map(m => m.content).join('\n\n');
  const contents = trimmed
    .filter(m => m.role !== 'system')
    .map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
  const payload = {
    contents,
    generationConfig: { temperature: 0.6, maxOutputTokens: 1600 }
  };
  if (sysText) payload.systemInstruction = { parts: [{ text: sysText }] };

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/' +
              encodeURIComponent(model) + ':generateContent';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.AI_API_KEY },
    body: JSON.stringify(payload)
  });
  if (!res.ok) { let d = ''; try { d = (await res.text()).slice(0, 220); } catch (e) {} throw new Error("Erreur Gemini (" + res.status + "). " + d); }
  const data = await res.json();
  const cand = data && data.candidates && data.candidates[0];
  const parts = cand && cand.content && cand.content.parts;
  if (Array.isArray(parts)) return parts.map(p => p && p.text ? p.text : '').join('');
  return '';
}

// Sonde de disponibilité : GET /api/chat -> {ok, configured, provider}
export async function onRequestGet(context) {
  const env = context.env || {};
  const configured = !!env.AI_API_KEY;
  const provider = (String(env.AI_PROVIDER || '').toLowerCase() === 'gemini' ||
                    /generativelanguage\.googleapis\.com/i.test(env.AI_BASE || '')) ? 'gemini'
                    : (env.AI_BASE ? 'openai-compatible' : 'openai');
  return new Response(JSON.stringify({ ok: true, configured, provider }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
  });
}
