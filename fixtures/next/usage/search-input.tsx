"use client";
import {useState} from 'react';
import {SearchInput} from '@/components/jez-ui/ui/search-input';
import {Folder} from 'lucide-react';
import {ArrowUpRight} from 'lucide-react';

export default function Example(){
const [searchTerm,setSearchTerm]=useState('');
const [notice,setNotice]=useState('');
return <><div className="w-full max-w-sm"><div className="mb-7"><h3 className="text-2xl tracking-tight">Find the thing.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Projects, notes, and the details you nearly forgot.</p></div><div><SearchInput value={searchTerm} onValueChange={setSearchTerm} placeholder="Search projects…"/><div className="mt-3 overflow-hidden rounded-lg border border-border">{["Website refresh","Brand guidelines","Component library"].filter(t=>t.toLowerCase().includes(searchTerm.toLowerCase())).map(t=><button key={t} onClick={()=>setNotice(t+" opened.")} className="flex w-full items-center gap-3 border-b border-border/50 px-3 py-3 text-left text-sm last:border-0 hover:bg-muted"><Folder size={15} className="text-muted-foreground"/>{t}<ArrowUpRight size={13} className="ml-auto text-muted-foreground"/></button>)}{!["Website refresh","Brand guidelines","Component library"].some(t=>t.toLowerCase().includes(searchTerm.toLowerCase()))&&<p className="p-5 text-sm text-muted-foreground">No projects found.</p>}</div></div></div><p role="status">{notice}</p></>;
}