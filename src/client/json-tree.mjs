// Input labels/values are always text nodes, never interpreted as HTML.
export function renderTree(container,tree){
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 const wrapper=el('div');wrapper.className='json-tree';
 const controls=el('div');controls.className='tree-controls';
 const label=el('label','Search keys, values or JSON Pointer paths'),search=el('input');search.type='search';search.id='tree-search';label.htmlFor=search.id;search.maxLength=200;
 const status=el('p');status.setAttribute('role','status');const entries=[];
 const build=node=>{const row=el(node.children?'details':'div');row.className='tree-node';const heading=el(node.children?'summary':'p');heading.append(document.createTextNode(node.label+': '));const value=el('code',node.children?`${node.type} (${node.children.length})`:node.value);heading.append(value);const path=el('small',`JSON Pointer: ${node.path||'"" (root)'}`);heading.append(path);row.append(heading);if(node.children){row.open=node.path==='';node.children.forEach(c=>row.append(build(c)));}entries.push({row,node,heading});return row;};
 const root=build(tree);
 for(const [name,open] of [['Expand all',true],['Collapse all',false]]){const button=el('button',name);button.type='button';button.className='button secondary small';button.addEventListener('click',()=>entries.forEach(x=>{if(x.node.children)x.row.open=open;}));controls.append(button);}
 const update=()=>{const q=search.value.toLowerCase();let matches=0;for(const {row,node} of entries){const own=q&&[node.label,node.path,node.value||''].some(s=>s.toLowerCase().includes(q));if(own)matches++;const childVisible=node.children&&[...row.children].slice(1).some(c=>!c.hidden);row.hidden=!!q&&!own&&!childVisible;if(q&&node.children&&childVisible)row.open=true;}status.textContent=q?`${matches} matching values or paths. Ancestors remain visible.`:`${entries.length} values. Full formatted JSON is available below.`;};
 search.addEventListener('input',update);wrapper.append(label,search,controls,status,root);container.append(wrapper);update();
}
