/**
 * Brio — Lecture de lien côté serveur (/api/fetch)
 * ------------------------------------------------------------
 * Récupère une page web et renvoie son TEXTE lisible (sans balises), pour que
 * le Tuteur IA puisse « analyser ce qu'il y a sur un lien ». La récupération se
 * fait depuis le serveur du site (Cloudflare) : pas de blocage CORS côté élève.
 *
 *   /api/fetch?url=https://exemple.com/page   ->  { url, title, text }
 *
 * Sécurité : uniquement http/https, on bloque les adresses internes/privées,
 * taille et durée bornées.
 */
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': 'same-origin', 'Cache-Control': 'public, max-age=600' };
  const bad = (s, e) => new Response(JSON.stringify({ error: e }), { status: s, headers });

  let target = url.searchParams.get('url') || '';
  if (!target && request.method === 'POST') { try { const b = await request.json(); target = b.url || ''; } catch (e) {} }
  target = String(target || '').trim();
  if (!target) return bad(400, 'url manquante');
  if (!/^https?:\/\//i.test(target)) target = 'https://' + target;

  let u;
  try { u = new URL(target); } catch (e) { return bad(400, 'url invalide'); }
  if (!/^https?:$/i.test(u.protocol)) return bad(400, 'protocole non autorisé');
  const host = u.hostname.toLowerCase();
  const blocked = host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal') ||
    /^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host) || /^169\.254\./.test(host) || host === '0.0.0.0' || host === '::1';
  if (blocked) return bad(403, 'adresse non autorisée');

  const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36';
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  let res;
  try {
    res = await fetch(u.toString(), {
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,application/pdf,text/plain,*/*', 'Accept-Language': 'fr,en;q=0.8' }
    });
  } catch (e) {
    clearTimeout(timer);
    return bad(502, 'page injoignable : ' + ((e && e.message) || 'erreur'));
  }
  clearTimeout(timer);
  if (!res.ok) return bad(502, 'HTTP ' + res.status);

  const ctype = (res.headers.get('content-type') || '').toLowerCase();
  // On ne lit que du texte / HTML (pas d'images ni binaires).
  if (!/text\/html|text\/plain|application\/(xhtml|json|xml)/.test(ctype)) {
    return new Response(JSON.stringify({ url: u.toString(), title: u.hostname, text: '', note: 'Type non lisible (' + (ctype || 'inconnu') + ').' }), { headers });
  }

  let raw = '';
  try { raw = (await res.text()).slice(0, 600000); } catch (e) { return bad(502, 'lecture impossible'); }

  const title = extractTitle(raw) || u.hostname;
  const text = htmlToText(raw).slice(0, 9000);
  return new Response(JSON.stringify({ url: u.toString(), title, text }), { headers });
}

function extractTitle(html) {
  const m = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  if (m) return decodeEntities(m[1].replace(/\s+/g, ' ').trim()).slice(0, 200);
  const h = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
  if (h) return decodeEntities(h[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()).slice(0, 200);
  return '';
}

function htmlToText(html) {
  let s = String(html || '');
  // enlève les zones non lisibles
  s = s.replace(/<script[\s\S]*?<\/script>/gi, ' ')
       .replace(/<style[\s\S]*?<\/style>/gi, ' ')
       .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
       .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
       .replace(/<!--[\s\S]*?-->/g, ' ')
       .replace(/<head[\s\S]*?<\/head>/gi, ' ')
       .replace(/<(nav|footer|aside)[\s\S]*?<\/\1>/gi, ' ');
  // sauts de ligne aux blocs
  s = s.replace(/<\/(p|div|li|h[1-6]|section|article|tr|br)[^>]*>/gi, '\n')
       .replace(/<br\s*\/?>/gi, '\n')
       .replace(/<[^>]+>/g, ' ');
  s = decodeEntities(s);
  s = s.replace(/[ \t\f\v]+/g, ' ').replace(/ ?\n ?/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  return s;
}

function decodeEntities(s) {
  return String(s || '')
    .replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/&laquo;/gi, '«').replace(/&raquo;/gi, '»')
    .replace(/&eacute;/gi, 'é').replace(/&egrave;/gi, 'è').replace(/&agrave;/gi, 'à').replace(/&ccedil;/gi, 'ç')
    .replace(/&#(\d+);/g, function (_, n) { try { return String.fromCodePoint(parseInt(n, 10)); } catch (e) { return ' '; } })
    .replace(/&#x([0-9a-f]+);/gi, function (_, n) { try { return String.fromCodePoint(parseInt(n, 16)); } catch (e) { return ' '; } });
}
