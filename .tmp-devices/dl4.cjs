
const fs=require('fs'),path=require('path');
const dir='C:/Users/Jason/Documents/GitHub/my-blog/.tmp-devices';
const urls=JSON.parse(process.argv[2]);
const sharp=require('sharp');
(async()=>{
  const saved=[];
  for(let i=0;i<urls.length;i++){
    try{const r=await fetch(urls[i],{headers:{Referer:'https://detail.zol.com.cn/','User-Agent':'Mozilla/5.0'}});
      const b=Buffer.from(await r.arrayBuffer());
      if(!r.ok){console.log(i,r.status);continue;}
      const f=path.join(dir,'zolf_'+i+'.jpg');fs.writeFileSync(f,b);saved.push([i,b.length]);}
    catch(e){console.log(i,'ERR',e.message);}
  }
  const cell=320,cols=3,rows=Math.ceil(urls.length/cols);
  const comps=[];
  for(let i=0;i<urls.length;i++){
    const f=path.join(dir,'zolf_'+i+'.jpg');
    if(!fs.existsSync(f))continue;
    const buf=await sharp(f).resize(cell,cell,{fit:'contain',background:'#ffffff'}).toBuffer();
    comps.push({input:buf,left:(i%cols)*cell,top:Math.floor(i/cols)*cell});
  }
  await sharp({create:{width:cols*cell,height:rows*cell,channels:3,background:'#cccccc'}}).composite(comps).png().toFile(path.join(dir,'sheet_zol.png'));
  console.log(JSON.stringify(saved));
})();
