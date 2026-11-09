
(async()=>{
 const url='https://www.gsmarena.com/results.php3?sQuickSearch=yes&sName=Redmi+K20+Pro';
 try{
  const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}});
  const h=await r.text();
  console.log('status',r.status,'len',h.length);
  const links=[...new Set((h.match(/https:\/\/www\.gsmarena\.com\/[a-z0-9_]+-\d+\.php/g)||[]))];
  console.log(links.slice(0,10).join('\n'));
 }catch(e){console.log('ERR',e.message);}
})();
