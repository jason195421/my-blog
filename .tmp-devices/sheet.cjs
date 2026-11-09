
const fs = require('fs'); const path = require('path');
const sharp = require('sharp');
const dir = path.join('', '.tmp-devices');
(async () => {
  const files = fs.readdirSync('C:/Users/Jason/Documents/GitHub/my-blog/.tmp-devices').filter(f => f.endsWith('.png')).sort();
  const cell = 300, cols = 3, rows = Math.ceil(files.length / cols);
  const comps = [];
  for (let i = 0; i < files.length; i++) {
    const buf = await sharp('C:/Users/Jason/Documents/GitHub/my-blog/.tmp-devices/' + files[i]).resize(cell, cell, { fit: 'contain', background: '#eeeeee' }).toBuffer();
    comps.push({ input: buf, left: (i % cols) * cell, top: Math.floor(i / cols) * cell });
  }
  await sharp({ create: { width: cols * cell, height: rows * cell, channels: 3, background: '#ffffff' } }).composite(comps).png().toFile('C:/Users/Jason/Documents/GitHub/my-blog/.tmp-devices/sheet_mi.png');
  console.log('ok', files.length);
})();
