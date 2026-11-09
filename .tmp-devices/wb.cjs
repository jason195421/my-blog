
const fs = require('fs'), path = require('path');
const dir = 'C:/Users/Jason/Documents/GitHub/my-blog/.tmp-devices';
(async () => {
  const url = 'https://web.archive.org/web/20261011172650/https://www.mi.com/redmik20pro';
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 90000);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    console.log('status', res.status, 'len', html.length);
    const imgs = [...new Set((html.match(/https?:\/\/[^"'\s)]+\.(?:png|jpg|webp)/gi) || []))].filter(u => /mi-img|appmifile/i.test(u));
    console.log('candidates', imgs.length);
    imgs.slice(0, 12).forEach((u, i) => console.log(i, u.slice(0, 160)));
    fs.writeFileSync(path.join(dir, 'k20_page.html'), html);
  } catch (e) { console.log('ERR', e.message); }
  clearTimeout(t);
})();
