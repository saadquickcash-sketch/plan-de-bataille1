/**
 * Brio — Voix en ligne (Text-To-Speech) élégante et fiable, FR + AR
 * -----------------------------------------------------------------------
 * Beaucoup d'appareils n'ont AUCUNE voix arabe installée (et la voix du
 * navigateur lit mal). Cette fonction renvoie un MP3 servi depuis TON
 * domaine — donc lisible sur TOUS les appareils (iPhone, Android, PC…).
 *
 * Deux niveaux, automatiques :
 *   1) Google Cloud Text-to-Speech (voix NEURALES, très naturelles) si la
 *      variable d'environnement GOOGLE_TTS_KEY est définie dans Cloudflare.
 *      Voix par défaut : fr-FR-Neural2-C (français), ar-XA-Wavenet-B (arabe).
 *      Personnalisables via GTTS_VOICE_FR / GTTS_VOICE_AR.
 *   2) Repli GRATUIT (Google Translate TTS) si pas de clé ou en cas d'échec.
 *
 * Réponses mises en cache au bord (edge) → lectures répétées instantanées et
 * quota économisé.
 *
 *   GET /api/tts?lang=ar&text=مرحبا      -> audio/mpeg
 *   GET /api/tts?lang=fr&g=male&text=...  -> audio/mpeg
 */
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const cors = { 'Access-Control-Allow-Origin': 'same-origin', 'Cache-Control': 'public, max-age=604800' };

  let text = url.searchParams.get('text') || '';
  let lang = (url.searchParams.get('lang') || 'fr').toLowerCase();
  let gender = (url.searchParams.get('g') || '').toLowerCase();
  if (!text && request.method === 'POST') {
    try { const b = await request.json(); text = b.text || ''; lang = (b.lang || lang).toLowerCase(); gender = (b.g || gender).toLowerCase(); } catch (e) {}
  }
  const short = lang.slice(0, 2);
  text = String(text || '').replace(/\s+/g, ' ').trim().slice(0, 1600);
  if (!text) return new Response('no text', { status: 400, headers: cors });

  // --- Cache edge (Workers Cache API) : on sert la copie en cache si présente ---
  let cache = null, cacheKey = null;
  try {
    cache = caches.default;
    cacheKey = new Request(url.toString(), { method: 'GET' });
    const hit = await cache.match(cacheKey);
    if (hit) return hit;
  } catch (e) { cache = null; }

  const finish = (bytes, engine) => {
    const res = new Response(bytes, { status: 200, headers: Object.assign({}, cors, { 'Content-Type': 'audio/mpeg', 'X-TTS-Engine': engine }) });
    if (cache && cacheKey) { try { context.waitUntil(cache.put(cacheKey, res.clone())); } catch (e) {} }
    return res;
  };

  // --- 1) Google Cloud TTS (voix neurales) si clé configurée ---
  const KEY = env && (env.GOOGLE_TTS_KEY || env.GCP_TTS_KEY || env.TTS_KEY);
  if (KEY) {
    try {
      const bytes = await googleCloudTTS(text, short, gender, KEY, env);
      if (bytes && bytes.length) return finish(bytes, 'gcloud');
    } catch (e) { /* bascule sur le repli gratuit */ }
  }

  // --- 2) Repli gratuit : Google Translate TTS ---
  try {
    const bytes = await translateTTS(text, short);
    if (bytes && bytes.length) return finish(bytes, 'gtx');
    throw new Error('tts_empty');
  } catch (e) {
    return new Response(JSON.stringify({ error: (e && e.message) || 'tts_error' }), {
      status: 502, headers: Object.assign({}, cors, { 'Content-Type': 'application/json' })
    });
  }
}

/* ---------- Google Cloud Text-to-Speech (REST, clé API) ---------- */
function voiceFor(short, gender, env) {
  if (short === 'ar') {
    const name = (env && env.GTTS_VOICE_AR) || (gender === 'male' ? 'ar-XA-Wavenet-B' : 'ar-XA-Wavenet-B');
    return { languageCode: 'ar-XA', name };
  }
  // français (par défaut)
  const name = (env && env.GTTS_VOICE_FR) || (gender === 'male' ? 'fr-FR-Neural2-D' : 'fr-FR-Neural2-C');
  return { languageCode: 'fr-FR', name };
}
async function googleCloudTTS(text, short, gender, key, env) {
  const v = voiceFor(short, gender, env);
  const body = {
    input: { text },
    voice: { languageCode: v.languageCode, name: v.name },
    audioConfig: { audioEncoding: 'MP3', speakingRate: 0.96, pitch: 0.0 }
  };
  const r = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=' + encodeURIComponent(key), {
    method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error('gcloud_http_' + r.status);
  const j = await r.json();
  if (!j || !j.audioContent) throw new Error('gcloud_noaudio');
  return b64ToBytes(j.audioContent);
}
function b64ToBytes(b64) {
  const bin = atob(b64);
  const n = bin.length;
  const u = new Uint8Array(n);
  for (let i = 0; i < n; i++) u[i] = bin.charCodeAt(i);
  return u;
}

/* ---------- Repli gratuit : Google Translate TTS (découpé en <=180) ---------- */
async function translateTTS(text, short) {
  const chunks = chunkText(text, 180);
  const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36';
  const parts = [];
  for (const c of chunks) {
    const g = 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=' +
              encodeURIComponent(short) + '&q=' + encodeURIComponent(c);
    const r = await fetch(g, { headers: { 'User-Agent': UA, 'Referer': 'https://translate.google.com/', 'Accept': 'audio/mpeg,*/*' } });
    if (!r.ok) throw new Error('gtx_http_' + r.status);
    const ab = new Uint8Array(await r.arrayBuffer());
    if (!ab.length) throw new Error('gtx_empty');
    parts.push(ab);
  }
  let total = 0; for (const p of parts) total += p.length;
  const out = new Uint8Array(total); let o = 0; for (const p of parts) { out.set(p, o); o += p.length; }
  return out;
}
function chunkText(t, max) {
  const out = [];
  const sentences = t.split(/([\.\!\?؟،؛;:\n])/).reduce((acc, cur, i) => {
    if (i % 2 === 0) acc.push(cur); else acc[acc.length - 1] += cur;
    return acc;
  }, []);
  let cur = '';
  for (let s of sentences) {
    s = (s || '').trim(); if (!s) continue;
    while (s.length > max) {
      let cut = s.lastIndexOf(' ', max); if (cut <= 0) cut = max;
      const piece = s.slice(0, cut).trim(); if (piece) out.push(piece);
      s = s.slice(cut).trim();
    }
    if (!s) continue;
    if ((cur + ' ' + s).trim().length <= max) cur = (cur ? cur + ' ' : '') + s;
    else { if (cur) out.push(cur); cur = s; }
  }
  if (cur) out.push(cur);
  return out.length ? out : [t.slice(0, max)];
}
