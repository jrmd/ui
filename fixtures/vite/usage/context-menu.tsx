"use client";
import {useState} from 'react';
import {ContextMenu} from '@/components/jez-ui/ui/context-menu';

export default function Example(){
const [notice,setNotice]=useState('');
const actions=[{label:'Duplicate',onSelect:()=>setNotice('A copy is ready.')},{label:'Archive',onSelect:()=>setNotice('Moved to archive.')}];
return <><ContextMenu trigger={<div tabIndex={0} className="rounded-xl border border-dashed border-border p-10 text-sm">Right-click for actions</div>} items={actions}/><p role="status">{notice}</p></>;
}