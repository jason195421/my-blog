
const fs=require('fs'),path=require('path');
const dir='C:/Users/Jason/Documents/GitHub/my-blog/.tmp-devices/';
const urls=JSON.parse(process.argv[2]);
(async()=>{for(const [k,u] of Object.entries(urls)){try{const r=await fetch(u,{headers:{'User-Agent':'my-blog/1.0 (contact: jason)'}});const b=Buffer.from(await r.arrayBuffer());console.log(k,r.status,b.length);if(r.ok)fs.writeFileSync(path.join(dir,'wm_'+k+'.jpg'),b);}catch(e){console.log(k,'ERR',e.message);}}})();
