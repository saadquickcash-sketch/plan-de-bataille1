/**
 * Brio — Voix en ligne (Text-To-Speech), surtout pour l'ARABE
 * -----------------------------------------------------------------------
 * Beaucoup de navigateurs n'ont AUCUNE voix arabe installée : la synthèse
 * intégrée ne peut donc pas lire l'arabe. Cette fonction récupère la voix
 * côté serveur (Google Translate TTS, gratuit) et renvoie un MP3 servi
 * depuis TON domaine — donc lisible sans blocage CORS/CSP.
 *
 *   /api/tts?lang=ar&text=مرحبا   ->  audio/mpeg
 */
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const cors = { 'Access-Control-Allow-Origin': 'same-origin', 'Cache-Control': 'public, max-age=86400' };

  let text = url.searchParams.get('text') || '';
  let lang = (url.searchParams.get('lang') || 'ar').toLowerCase();
  if (!text && request.method === 'POST') {
    try { const b = await request.json(); text = b.text || ''; lang = (b.lang || lang).toLowerCase(); } catch (e) {}
  }
  // normalise la langue (ar, fr, en…) — Google veut un code court
  lang = lang.slice(0, 5).replace(/_/g, '-');
  const short = lang.slice(0, 2);

  text = String(text || '').replace(/\s+/g, ' ').trim().slice(0, 1200);
  if (!text) return new Response('no text', { status: 400, headers: cors });

  const chunks = chunkText(text, 180);
  const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36';
  try {
    const parts = [];
    for (const c of chunks) {
      const g = 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=' +
                encodeURIComponent(short) + '&q=' + encodeURIComponent(c);
      const r = await fetch(g, { headers: { 'User-Agent': UA, 'Referer': 'https://translate.google.com/', 'Accept': 'audio/mpeg,*/*' } });
      if (!r.ok) throw new Error('tts_http_' + r.status);
      const ab = new Uint8Array(await r.arrayBuffer());
      if (!ab.length) throw new Error('tts_empty');
      parts.push(ab);
    }
    let total = 0; for (const p of parts) total += p.length;
    const out = new Uint8Array(total); let o = 0; for (const p of parts) { out.set(p, o); o += p.length; }
    return new Response(out, { status: 200, headers: Object.assign({}, cors, { 'Content-Type': 'audio/mpeg' }) });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e && e.message) || 'tts_error' }), { status: 502, headers: Object.assign({}, cors, { 'Content-Type': 'application/json' }) });
  }
}

/* Découpe le texte en morceaux <= max caractères, aux frontières de phrases/mots. */
function chunkText(t, max) {
  const out = [];
  // coupe d'abord aux ponctuations fortes (. ! ? ؟ ، ; : saut de ligne)
  const sentences = t.split(/(?<=[\.\!\?؟،;:\n])\s+/);
  let cur = '';
  for (let s of sentences) {
    while (s.length > max) {
      // phrase trop longue : coupe au dernier espace avant max
      let cut = s.lastIndexOf(' ', max);
      if (cut <= 0) cut = max;
      const piece = s.slice(0, cut).trim();
      if (piece) out.push(piece);
      s = s.slice(cut).trim();
    }
    if (!s) continue;
    if ((cur + ' ' + s).trim().length <= max) { cur = (cur ? cur + ' ' : '') + s; }
    else { if (cur) out.push(cur); cur = s; }
  }
  if (cur) out.push(cur);
  return out.length ? out : [t.slice(0, max)];
}
