
const sharp=require('sharp');
const fs=require('fs');
const dir='C:/Users/Jason/Documents/GitHub/my-blog/.tmp-devices/';

async function keyWhite(file){
  const {data,info}=await sharp(file).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const w=info.width,h=info.height;
  const idx=(x,y)=>(y*w+x)*4;
  const isWhite=(i)=>data[i]>236&&data[i+1]>236&&data[i+2]>236;
  const visited=new Uint8Array(w*h);
  const stack=[];
  for(let x=0;x<w;x++){stack.push([x,0]);stack.push([x,h-1]);}
  for(let y=0;y<h;y++){stack.push([0,y]);stack.push([w-1,y]);}
  while(stack.length){
    const [x,y]=stack.pop();
    if(x<0||y<0||x>=w||y>=h)continue;
    const p=y*w+x;
    if(visited[p])continue;
    visited[p]=1;
    const i=p*4;
    if(!isWhite(i))continue;
    data[i+3]=0;
    stack.push([x+1,y],[x-1,y],[x,y+1],[x,y-1]);
  }
  return sharp(data,{raw:{width:w,height:h,channels:4}}).png();
}

(async()=>{
  for(const [src,out] of [['zolf_0.jpg','k20_front.png'],['zolf_1.jpg','k20_back.png']]){
    const img=await keyWhite(dir+src);
    const buf=await img.png().toBuffer();
    const trimmed=await sharp(buf).trim({threshold:5}).png().toBuffer();
    const m=await sharp(trimmed).metadata();
    fs.writeFileSync(dir+out,trimmed);
    console.log(out,m.width+'x'+m.height);
  }
})();
