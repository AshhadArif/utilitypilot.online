import {runText} from '../lib/text.mjs';
import {runData} from '../lib/data.mjs';
import {runWeb} from '../lib/web.mjs';
self.onmessage=async({data})=>{try{const {category,slug,a,b,options,files}=data;let result;
 if(category==='developer')result=await(await import('../lib/developer.mjs')).runDeveloper(slug,a,b,options);
 else if(['json-viewer','json-compare'].includes(slug))result=(await import('../lib/json-tools.mjs')).runJSONTool(slug,a,b,options);
 else result=(category==='text'?runText:category==='data'?runData:runWeb)(slug,a,b,options,files);
 if(new TextEncoder().encode(result.text).length>20971520)throw Error('Output exceeds 20 MiB. Process a smaller input.');self.postMessage({result});}catch(error){self.postMessage({error:error.message});}};
