import {integer,number,result} from './common.mjs';
import {colors,parseColor} from './web.mjs';
const cap=16000000;
export function imageHeader(bytes){
 const dv=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),ascii=(i,n)=>String.fromCharCode(...bytes.subarray(i,i+n));let width,height,type;
 if(bytes.length>=24&&ascii(1,3)==='PNG'&&bytes[0]===137){type='image/png';width=dv.getUint32(16);height=dv.getUint32(20);for(let i=8;i+12<=bytes.length;){const n=dv.getUint32(i),chunk=ascii(i+4,4);if(chunk==='acTL')throw Error('Animated PNG is not supported. Choose a static image.');i+=12+n;}}
 else if(bytes.length>=30&&ascii(0,4)==='RIFF'&&ascii(8,4)==='WEBP'){
  type='image/webp';for(let i=12;i+8<=bytes.length;){const name=ascii(i,4),n=dv.getUint32(i+4,true);if(name==='ANIM'||name==='ANMF')throw Error('Animated WebP is not supported. Choose a static image.');if(name==='VP8X'&&i+18<=bytes.length){width=1+bytes[i+12]+(bytes[i+13]<<8)+(bytes[i+14]<<16);height=1+bytes[i+15]+(bytes[i+16]<<8)+(bytes[i+17]<<16);}if(name==='VP8 '&&i+18<=bytes.length){width=dv.getUint16(i+14,true)&0x3fff;height=dv.getUint16(i+16,true)&0x3fff;}if(name==='VP8L'&&i+13<=bytes.length){const b=i+9;width=1+bytes[b]+((bytes[b+1]&63)<<8);height=1+(bytes[b+1]>>6)+(bytes[b+2]<<2)+((bytes[b+3]&15)<<10);}i+=8+n+(n%2);}
 }else if(bytes.length>=4&&bytes[0]===255&&bytes[1]===216){type='image/jpeg';for(let i=2;i+4<bytes.length;){if(bytes[i]!==255){i++;continue;}const marker=bytes[i+1];if(marker===218||marker===217)break;if(marker===216||marker===1){i+=2;continue;}const len=dv.getUint16(i+2);if(len<2)throw Error('Invalid JPEG segment.');if([192,193,194,195,197,198,199,201,202,203,205,206,207].includes(marker)&&i+9<bytes.length){height=dv.getUint16(i+5);width=dv.getUint16(i+7);break;}i+=2+len;}}
 else throw Error('Choose a static JPEG, PNG or WebP file. Renaming another format does not convert it.');
 if(!width||!height)throw Error('Could not read supported image dimensions. The file may be damaged.');
 if(width*height>cap)throw Error('Image exceeds 16 megapixels. Reduce its dimensions before opening it here.');return {type,width,height};
}
export async function loadImage(file){
 if(!file||file.size===0)throw Error('Choose a nonempty image file.');if(file.size>10485760)throw Error('Image exceeds the 10 MiB file limit.');
 const header=imageHeader(new Uint8Array(await file.arrayBuffer()));let image;
 try{image=await createImageBitmap(file,{imageOrientation:'from-image'});}catch{throw Error('The browser could not decode this image. It may be damaged or unsupported.');}
 if(image.width*image.height>cap){image.close();throw Error('Decoded image exceeds 16 megapixels.');}
 const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;canvas.getContext('2d').drawImage(image,0,0);image.close();
 return {canvas,file,type:header.type,width:canvas.width,height:canvas.height};
}
const cancelled=signal=>{if(signal?.aborted)throw Error('Processing cancelled.');};
export async function searchQuality(encode,initial,maximum,target){
 if(initial.size<=target)return initial;
 let smallest=initial,accepted=null,lo=.01,hi=maximum;
 // Keep the highest tested quality that meets the target, not the smallest file.
 const low=await encode(lo);if(low.size<smallest.size)smallest=low;if(low.size<=target)accepted=low;
 for(let i=0;i<9;i++){const q=(lo+hi)/2,candidate=await encode(q);if(candidate.size<smallest.size)smallest=candidate;if(candidate.size<=target){accepted=candidate;lo=q;}else hi=q;}
 return accepted||smallest;
}
async function blob(canvas,type,q,signal){cancelled(signal);const b=await new Promise((resolve,reject)=>canvas.toBlob(v=>v?resolve(v):reject(Error('The browser could not export this image.')),type,q));cancelled(signal);if(b.type!==type)throw Error('This browser cannot encode the chosen format. Try PNG or JPEG.');return b;}
function draw(source,w,h,o={},crop){
 if(!Number.isInteger(w)||!Number.isInteger(h)||w<1||h<1||w*h>cap)throw Error('Output must be positive whole pixels and no more than 16 megapixels.');
 const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
 if(o.format==='image/jpeg'){const color=parseColor(o.matte||'#ffffff');if(color[3]!==1)throw Error('JPEG background must be opaque.');ctx.fillStyle=colors(color).HEX;ctx.fillRect(0,0,w,h);}
 if(crop)ctx.drawImage(source,...crop,0,0,w,h);else ctx.drawImage(source,0,0,w,h);return c;
}
export async function runImage(slug,source,o={},signal){
 if(!source)throw Error('Choose a JPEG, PNG or WebP image first.');cancelled(signal);const {canvas,width,height,file,type}=source;
 if(slug==='image-inspector'){
  const data=canvas.getContext('2d').getImageData(0,0,width,height).data;let alpha=false;for(let i=3;i<data.length;i+=4)if(data[i]!==255){alpha=true;break;}
  const gcd=(a,b)=>b?gcd(b,a%b):a,g=gcd(width,height);const stats={'Width (px)':width,'Height (px)':height,'File bytes':file.size,'Decimal KB':Number((file.size/1000).toFixed(3)),'Binary KiB':Number((file.size/1024).toFixed(3)),'Aspect ratio':`${width/g}:${height/g}`,'Detected format':type,'Transparent pixels':alpha?'Present':'None'};
  return result(Object.entries(stats).map(([k,v])=>k+': '+v).join('\n'),'Image inspected. Dimensions reflect displayed orientation. This is not a complete metadata or GPS inspection.',{stats});
 }
 if(slug==='image-color-picker'){
  const x=integer(o.x??0,'Pixel X',0,width-1),y=integer(o.y??0,'Pixel Y',0,height-1),area=integer(o.area??1,'Sample size',1,100);
  if(x+area>width||y+area>height)throw Error('The sample area extends beyond the image edge. Reduce its size or move it.');
  const data=canvas.getContext('2d').getImageData(x,y,area,area).data;const sums=[0,0,0,0];for(let i=0;i<data.length;i+=4)for(let c=0;c<4;c++)sums[c]+=data[i+c];const rgba=sums.map((v,i)=>v/(area*area)/(i===3?255:1));const values=colors(rgba);
  return result(Object.entries(values).map(([k,v])=>k+': '+v).join('\n'),`Sampled ${area} × ${area} pixels at (${x}, ${y}). Values reflect the browser’s decoded sRGB pixels.`,{stats:values,swatch:values.HEX});
 }
 let w=width,h=height,crop;
 if(slug==='image-resizer'){
  const W=integer(o.width,'Width',1,16000),H=integer(o.height,'Height',1,16000);
  if(o.mode==='percent'){const p=number(o.percent,'Scale percentage',1,400)/100;w=Math.max(1,Math.round(width*p));h=Math.max(1,Math.round(height*p));}
  else if(o.mode==='stretch'&&!o.lock){w=W;h=H;}else {const ratio=Math.min(W/width,H/height);w=Math.max(1,Math.round(width*ratio));h=Math.max(1,Math.round(height*ratio));}
  if(!o.upscale&&(w>width||h>height))throw Error('Requested dimensions upscale the image. Reduce them or explicitly allow upscaling.');
 }
 if(slug==='image-cropper'){
  const x=integer(o.x,'Left',0,width-1),y=integer(o.y,'Top',0,height-1);w=integer(o.width,'Crop width',1,width);h=integer(o.height,'Crop height',1,height);
  if(o.ratio&&o.ratio!=='free')h=Math.max(1,Math.round(w/Number(o.ratio)));
  if(x+w>width||y+h>height)throw Error('Crop extends outside the image. Reduce its size or move the top-left corner.');crop=[x,y,w,h];
 }
 const format=o.format||'image/png';if(!['image/png','image/jpeg','image/webp'].includes(format))throw Error('Unsupported output format.');
 const quality=number(o.quality??85,'Quality',1,100)/100;let output=draw(canvas,w,h,o,crop),best=await blob(output,format,quality,signal),target;
 if(slug==='image-compressor'){
  target=number(o.target,'Target KB',.001,10000)*1000;
  if(format!=='image/png'&&best.size>target)best=await searchQuality(q=>blob(output,format,q,signal),best,quality,target);
  if(o.resize&&best.size>target){for(let i=0;i<10&&best.size>target&&(w>1||h>1);i++){w=Math.max(1,Math.floor(w*.8));h=Math.max(1,Math.floor(h*.8));output=draw(canvas,w,h,o);let candidate=await blob(output,format,quality,signal);if(format!=='image/png')candidate=await searchQuality(q=>blob(output,format,q,signal),candidate,quality,target);if(candidate.size<best.size)best=candidate;}}
 }
 cancelled(signal);const check=await createImageBitmap(best);w=check.width;h=check.height;check.close();
 const savings=(file.size-best.size)/file.size*100;
 const change=`${Math.abs(savings).toFixed(1)}% ${savings<0?'larger':'smaller'}`;
 return {text:`${w} × ${h} pixels\n${best.size} bytes\n${format}\n${change} than input`,summary:`${w} × ${h} pixels · ${best.size.toLocaleString()} bytes${target?best.size<=target?' · Target met':' · Target not met — try another format or allow resizing':''}. ${savings<0?'Output is larger than the source. ':''}Original image retained.`,blob:best,filename:'utilitypilot-image.'+({'image/jpeg':'jpg','image/png':'png','image/webp':'webp'}[format]),stats:{'Width (px)':w,'Height (px)':h,'Output bytes':best.size,'Byte change':change},image:true};
}
