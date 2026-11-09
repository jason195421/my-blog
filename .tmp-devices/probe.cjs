
const urls = JSON.parse(process.argv[2]);
(async()=>{for(const u of urls){try{const r=await fetch(u,{headers:{Referer:'https://detail.zol.com.cn/','User-Agent':'Mozilla/5.0'}});const b=Buffer.from(await r.arrayBuffer());console.log(r.status,b.length,u);}catch(e){console.log('ERR',u,e.message);}}})();
