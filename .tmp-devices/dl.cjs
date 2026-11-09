
const fs = require('fs');
const path = require('path');
const dir = path.join('C:/Users/Jason/Documents/GitHub/my-blog', '.tmp-devices');
fs.mkdirSync(dir, { recursive: true });
const urls = JSON.parse(process.argv[2]);
(async () => {
  const saved = [];
  for (let i = 0; i < urls.length; i++) {
    try {
      const res = await fetch(urls[i], { headers: { 'Referer': 'https://www.mi.com/' } });
      if (!res.ok) { console.log('fail', i, res.status); continue; }
      const buf = Buffer.from(await res.arrayBuffer());
      const f = path.join(dir, 'mi_' + String(i).padStart(2,'0') + '.png');
      fs.writeFileSync(f, buf);
      saved.push([i, f, buf.length]);
    } catch (e) { console.log('err', i, e.message); }
  }
  console.log(JSON.stringify(saved));
})();
