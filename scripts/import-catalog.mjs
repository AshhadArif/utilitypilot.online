import {readFile, mkdir, writeFile} from 'node:fs/promises';
const source = await readFile('docs/TOOL-CATALOG.md','utf8');
const tools = source.split(/\n## (?=UP\d)/).slice(1).map(block => {
 const [id,name] = block.split('\n')[0].split(' — ');
 const field = label => block.match(new RegExp('^- '+label+': (.*)$','m'))?.[1] || '';
 const path = field('URL').match(/`([^`]+)`/)[1];
 const category = path.split('/')[2], slug = path.split('/')[3];
 return {id,name,slug,category,path,description:field('User problem / why needed').split('. This avoids')[0]+'.',inputs:field('Inputs'),outputs:field('Outputs'),method:field('How it works'),limitations:field('Required original content and acceptance cases').split('. Explain these')[0],aliases:field('Search intent').split('Long tails: ')[1]?.replace(/\.$/,'').split('; ')||[],related:[...field('Related tools').matchAll(/`([^`]+)`/g)].map(m=>m[1]),status:'implemented',version:'1.0.0',processing:'browser',privacy:'Memory only; no input uploads or automatic persistence'};
});
if(tools.length!==32) throw Error('Expected 32 catalog tools');
await mkdir('src/data',{recursive:true});
await writeFile('src/data/tools.json',JSON.stringify(tools,null,2)+'\n');
console.log('Imported 32 tool contracts.');
