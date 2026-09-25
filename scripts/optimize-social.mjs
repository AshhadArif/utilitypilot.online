// Lossless PNG recompression: retain every decoded pixel and metadata chunk.
import {readFile,writeFile} from 'node:fs/promises';
import {inflateSync,deflateSync} from 'node:zlib';
import assert from 'node:assert/strict';
const file='public/assets/social.png',source=await readFile(file),chunks=[];
for(let i=8;i<source.length;){const n=source.readUInt32BE(i);chunks.push(source.subarray(i,i+n+12));i+=n+12;}
const isData=c=>c.toString('ascii',4,8)==='IDAT';
const pixels=inflateSync(Buffer.concat(chunks.filter(isData).map(c=>c.subarray(8,-4))));
const candidates=[0,1,2,3,4].map(strategy=>deflateSync(pixels,{level:9,strategy}));
const data=candidates.sort((a,b)=>a.length-b.length)[0];assert.deepEqual(inflateSync(data),pixels);
const chunk=Buffer.alloc(data.length+12);chunk.writeUInt32BE(data.length);chunk.write('IDAT',4);data.copy(chunk,8);
let crc=0xffffffff;for(const byte of chunk.subarray(4,-4)){crc^=byte;for(let bit=0;bit<8;bit++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}chunk.writeUInt32BE((crc^0xffffffff)>>>0,chunk.length-4);
let inserted=false;const output=Buffer.concat([source.subarray(0,8),...chunks.flatMap(c=>{if(!isData(c))return [c];if(inserted)return [];inserted=true;return [chunk];})]);
if(output.length<source.length)await writeFile(file,output);
console.log(JSON.stringify({before:source.length,after:Math.min(source.length,output.length),lossless:true}));
