
const fs = require('fs'), path = require('path');
const dir = 'C:/Users/Jason/Documents/GitHub/my-blog/.tmp-devices';
const urls = JSON.parse(process.argv[2]);
(async () => {
  for (let i=0;i<urls.length;i++){
    try{
      const res = await fetch(urls[i], { headers: { Referer: 'https://detail.zol.com.cn/', 'User-Agent':'Mozilla/5.0' } });
      const b = Buffer.from(await res.arrayBuffer());
      console.log(i, res.status, b.length);
      if(res.ok) fs.writeFileSync(path.join(dir,'zol_' + i + '.jpg'), b);
    }catch(e){ console.log(i,'ERR',e.message); }
  }
})();
