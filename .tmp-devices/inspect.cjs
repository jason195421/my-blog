
const sharp=require('sharp');
const files=['mate80.png','matepad.png','zolf_0.jpg','zolf_1.jpg'];
(async()=>{
 for(const f of files){
   const p='C:/Users/Jason/Documents/GitHub/my-blog/.tmp-devices/'+f;
   const m=await sharp(p).metadata();
   const {data,info}=await sharp(p).ensureAlpha().raw().toBuffer({resolveWithObject:true});
   const px=(x,y)=>{const i=(y*info.width+x)*4;return [data[i],data[i+1],data[i+2],data[i+3]];};
   console.log(f, m.width+'x'+m.height, 'ch='+m.channels, 'alpha='+m.hasAlpha, 'corners', JSON.stringify([px(0,0),px(info.width-1,0),px(0,info.height-1),px(info.width-1,info.height-1)]));
 }
})();
