
(async()=>{
 const u='https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/8/80/Redmi_K20_Pro_%E6%AD%A3%E9%9D%A2%E6%81%AF%E5%B1%8F%E7%85%A7.jpg/1400px-Redmi_K20_Pro_%E6%AD%A3%E9%9D%A2%E6%81%AF%E5%B1%8F%E7%85%A7.jpg';
 const r=await fetch(u);console.log(r.status, await r.text());
 const r2=await fetch('https://wsrv.nl/?url=wsrv.nl/logo.png');console.log(r2.status,r2.headers.get('content-type'),(await r2.arrayBuffer()).byteLength);
})();
