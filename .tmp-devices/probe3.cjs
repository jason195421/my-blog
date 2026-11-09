
const hosts=JSON.parse(process.argv[2]);
(async()=>{for(const u of hosts){const t=Date.now();try{const r=await fetch(u,{headers:{'User-Agent':'Mozilla/5.0'}});const b=Buffer.from(await r.arrayBuffer());console.log(r.status,r.headers.get('content-type'),b.length,(Date.now()-t)+'ms');if(r.ok)require('fs').writeFileSync('C:/Users/Jason/Documents/GitHub/my-blog/.tmp-devices/wm_probe.bin',b);}catch(e){console.log('ERR',e.message,(Date.now()-t)+'ms');}}})();
