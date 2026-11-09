
const cands=JSON.parse(process.argv[2]);
(async()=>{for(const u of cands){try{const r=await fetch(u);const b=Buffer.from(await r.arrayBuffer());console.log(r.status,r.headers.get('content-type'),b.length);if(r.status===200&&/image/.test(r.headers.get('content-type')||'')){require('fs').writeFileSync('C:/Users/Jason/Documents/GitHub/my-blog/.tmp-devices/wm_front.jpg',b);console.log('SAVED');break;}else console.log(b.toString().slice(0,120));}catch(e){console.log('ERR',e.message);}}})();
