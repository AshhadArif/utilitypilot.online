import {runText} from '../lib/text.mjs';
import {runData} from '../lib/data.mjs';
import {runWeb} from '../lib/web.mjs';
self.onmessage=({data})=>{try{const {category,slug,a,b,options,files}=data;const result=(category==='text'?runText:category==='data'?runData:runWeb)(slug,a,b,options,files);if(new TextEncoder().encode(result.text).length>20971520)throw Error('Output exceeds 20 MiB. Process a smaller input.');self.postMessage({result});}catch(error){self.postMessage({error:error.message});}};
