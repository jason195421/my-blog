
const sharp=require('sharp');
const fs=require('fs');
const dir='C:/Users/Jason/Documents/GitHub/my-blog/.tmp-devices/';
(async()=>{
  const H=1000;
  const front=await sharp(dir+'k20_front.png').resize({height:H}).png().toBuffer();
  const back=await sharp(dir+'k20_back.png').resize({height:Math.round(H*0.94)}).png().toBuffer();
  const fm=await sharp(front).metadata(), bm=await sharp(back).metadata();
  const gap=140;
  const W=fm.width+gap+bm.width;
  const canvasH=H+40;
  const comp=await sharp({create:{width:W,height:canvasH,channels:4,background:{r:0,g:0,b:0,alpha:0}}})
    .composite([
      {input:front,left:0,top:Math.round((canvasH-fm.height)/2)},
      {input:back,left:fm.width+gap,top:Math.round((canvasH-bm.height)/2)},
    ]).png().toBuffer();
  fs.writeFileSync(dir+'k20.png',comp);
  console.log('k20', W+'x'+canvasH);
  // preview over dark gradient
  const bg=await sharp({create:{width:W,height:canvasH,channels:3,background:'#23262e'}}).png().toBuffer();
  await sharp(bg).composite([{input:comp,left:0,top:0}]).png().toFile(dir+'preview_k20.png');
  // preview huawei on dark
  for(const f of ['mate80.png','matepad.png']){
    const m=await sharp(dir+f).metadata();
    const b=await sharp({create:{width:m.width,height:m.height,channels:3,background:'#23262e'}}).png().toBuffer();
    await sharp(b).composite([{input:dir+f,left:0,top:0}]).png().toFile(dir+'preview_'+f);
  }
  console.log('done');
})();
