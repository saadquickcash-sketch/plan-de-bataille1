/**
 * Plan de Bataille — Recherche web côté serveur (/api/search)
 * ----------------------------------------------------------
 * Renvoie une liste de résultats web (titre, url, extrait) pour une requête,
 * afin que le Tuteur IA puisse « faire des recherches sur Google » via le site.
 * Utilise DuckDuckGo (pas de clé nécessaire). Repli sur l'API "instant answer".
 *
 *   /api/search?q=dérivée d'une fonction   ->  { query, results:[{title,url,snippet}] }
 */
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': 'same-origin', 'Cache-Control': 'public, max-age=600' };
  const bad = (s, e) => new Response(JSON.stringify({ error: e }), { status: s, headers });

  let q = url.searchParams.get('q') || '';
  if (!q && request.method === 'POST') { try { const b = await request.json(); q = b.q || b.query || ''; } catch (e) {} }
  q = String(q || '').replace(/\s+/g, ' ').trim().slice(0, 300);
  if (!q) return bad(400, 'q manquante');

  const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36';
  let results = [];

  // 1) DuckDuckGo HTML (résultats organiques)
  try {
    const r = await fetchT('https://html.duckduckgo.com/html/?q=' + encodeURIComponent(q) + '&kl=fr-fr', UA);
    if (r && r.ok) { const html = await r.text(); results = parseDDG(html); }
  } catch (e) {}

  // 2) Repli : version "lite"
  if (!results.length) {
    try {
      const r = await fetchT('https://lite.duckduckgo.com/lite/?q=' + encodeURIComponent(q), UA);
      if (r && r.ok) { const html = await r.text(); results = parseDDGLite(html); }
    } catch (e) {}
  }

  // 3) Repli : Instant Answer API (définitions, résumés)
  let answer = '';
  if (!results.length) {
    try {
      const r = await fetchT('https://api.duckduckgo.com/?q=' + encodeURIComponent(q) + '&format=json&no_html=1&no_redirect=1&kl=fr-fr', UA);
      if (r && r.ok) {
        const j = await r.json();
        answer = (j && (j.AbstractText || j.Answer)) || '';
        if (j && Array.isArray(j.RelatedTopics)) {
          j.RelatedTopics.forEach(t => {
            if (results.length >= 6) return;
            if (t && t.FirstURL && t.Text) results.push({ title: t.Text.split(' - ')[0].slice(0, 140), url: t.FirstURL, snippet: t.Text });
          });
        }
      }
    } catch (e) {}
  }

  return new Response(JSON.stringify({ query: q, answer, results: results.slice(0, 8) }), { headers });
}

async function fetchT(u, UA) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 11000);
  try {
    return await fetch(u, { signal: ctrl.signal, headers: { 'User-Agent': UA, 'Accept': 'text/html,*/*', 'Accept-Language': 'fr,en;q=0.8' } });
  } finally { clearTimeout(timer); }
}

function decodeEntities(s) {
  return String(s || '')
    .replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/&#x27;/gi, "'")
    .replace(/&#(\d+);/g, function (_, n) { try { return String.fromCodePoint(parseInt(n, 10)); } catch (e) { return ' '; } })
    .replace(/&#x([0-9a-f]+);/gi, function (_, n) { try { return String.fromCodePoint(parseInt(n, 16)); } catch (e) { return ' '; } });
}
function strip(h) { return decodeEntities(String(h || '').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim(); }

// Décode les liens DuckDuckGo (/l/?uddg=<url encodée>)
function realUrl(href) {
  try {
    if (/^\/\//.test(href)) href = 'https:' + href;
    const m = /[?&]uddg=([^&]+)/.exec(href);
    if (m) return decodeURIComponent(m[1]);
    if (/^https?:\/\//i.test(href)) return href;
  } catch (e) {}
  return href;
}

function parseDDG(html) {
  const out = [];
  const re = /<a[^>]+class="[^"]*result__a[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  const snippets = [];
  const sre = /<a[^>]+class="[^"]*result__snippet[^"]*"[^>]*>([\s\S]*?)<\/a>/gi;
  let sm; while ((sm = sre.exec(html)) && snippets.length < 20) snippets.push(strip(sm[1]));
  let i = 0;
  while ((m = re.exec(html)) && out.length < 8) {
    const url = realUrl(m[1]);
    const title = strip(m[2]);
    if (title && /^https?:/i.test(url)) { out.push({ title: title.slice(0, 160), url, snippet: (snippets[i] || '').slice(0, 320) }); i++; }
  }
  return out;
}

function parseDDGLite(html) {
  const out = [];
  const re = /<a[^>]+class="[^"]*result-link[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) && out.length < 8) {
    const url = realUrl(m[1]); const title = strip(m[2]);
    if (title && /^https?:/i.test(url)) out.push({ title: title.slice(0, 160), url, snippet: '' });
  }
  return out;
}
