
const fs = require('fs'), path = require('path');
const dir = 'C:/Users/Jason/Documents/GitHub/my-blog/.tmp-devices';
const targets = [
  ['k20_a.jpg','https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-k20-pro-1.jpg'],
  ['k20_b.jpg','https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-k20-pro-2.jpg'],
  ['mate80.png','https://consumer.huawei.com/content/dam/huawei-cbg-site/cn/mkt/pdp/phones/mate80/list/green.png'],
  ['matepad.png','https://consumer.huawei.com/content/dam/huawei-cbg-site/cn/mkt/pdp/tablets/matepad-pro-12/list/pink.png']
];
(async () => {
  for (const [name, url] of targets) {
    try {
      const res = await fetch(url, { headers: { 'Referer': 'https://consumer.huawei.com/', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
      const buf = Buffer.from(await res.arrayBuffer());
      console.log(name, res.status, buf.length, res.headers.get('content-type'));
      if (res.ok) fs.writeFileSync(path.join(dir, name), buf);
    } catch (e) { console.log(name, 'ERR', e.message); }
  }
})();
