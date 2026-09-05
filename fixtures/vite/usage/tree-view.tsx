"use client";
import {useState} from 'react';
import {TreeView} from '@/components/jez-ui/ui/tree-view';

export default function Example(){
const [notice,setNotice]=useState('');
return <><div className="w-full max-w-sm"><div className="mb-7"><h3 className="text-2xl tracking-tight">Everything in its place.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">A clear path through your source.</p></div><TreeView nodes={[{id:'src',label:'Source',children:[{id:'components',label:'Components',children:[{id:'button',label:'button.tsx'},{id:'card',label:'card.tsx'}]},{id:'theme',label:'theme.css'}]}]} onSelect={n=>setNotice(n.label+' selected')}/></div><p role="status">{notice}</p></>;
}