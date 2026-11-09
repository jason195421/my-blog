
const hosts=[
 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Redmi_K20_Pro_%E6%AD%A3%E9%9D%A2%E6%81%AF%E5%B1%8F%E7%85%A7.jpg/1400px-Redmi_K20_Pro_%E6%AD%A3%E9%9D%A2%E6%81%AF%E5%B1%8F%E7%85%A7.jpg',
 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/Redmi_K20_Pro_%E6%AD%A3%E9%9D%A2%E6%81%AF%E5%B1%8F%E7%85%A7.jpg/1400px-Redmi_K20_Pro_%E6%AD%A3%E9%9D%A2%E6%81%AF%E5%B1%8F%E7%85%A7.jpg',
 'https://commons.wikimedia.org/wiki/Special:FilePath/Redmi_K20_Pro_%E6%AD%A3%E9%9D%A2%E6%81%AF%E5%B1%8F%E7%85%A7.jpg?width=1400'
];
(async()=>{for(const u of hosts){const t=Date.now();try{const r=await fetch(u,{headers:{'User-Agent':'Mozilla/5.0'}});const b=Buffer.from(await r.arrayBuffer());console.log(r.status,b.length,(Date.now()-t)+'ms',u.slice(0,50));}catch(e){console.log('ERR',(Date.now()-t)+'ms',e.message,u.slice(0,50));}}})();
