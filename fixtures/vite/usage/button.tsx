"use client";
import {useState,useEffect} from 'react';
import {Badge} from '@/components/jez-ui/ui/badge';
import {Button} from '@/components/jez-ui/ui/button';
import {Plus} from 'lucide-react';
import {ArrowUpRight} from 'lucide-react';
import {Check} from 'lucide-react';

export default function Example(){
const [buttonBusy,setButtonBusy]=useState(false);useEffect(()=>{if(!buttonBusy)return;const timer=setTimeout(()=>{setButtonBusy(false);setNotice('Project published.');},900);return()=>clearTimeout(timer);},[buttonBusy]);
const [notice,setNotice]=useState('');
const actions=[{label:'Duplicate',onSelect:()=>setNotice('A copy is ready.')},{label:'Archive',onSelect:()=>setNotice('Moved to archive.')}];
return <><div className="grid w-full max-w-lg gap-6"><div className="flex items-center justify-between border-b border-border pb-5"><div><h3 className="text-lg font-semibold">Project actions</h3><p className="mt-1 text-sm text-muted-foreground">Website refresh · Draft</p></div><Badge>Draft</Badge></div><div className="flex flex-wrap items-center gap-3"><Button loading={buttonBusy} onClick={()=>setButtonBusy(true)}><Plus size={16}/>Publish project</Button><Button variant="outline" onClick={()=>setNotice('Draft saved.')}>Save draft</Button><Button variant="ghost" onClick={()=>setNotice('Preview selected.')}>Preview <ArrowUpRight size={15}/></Button></div><div className="flex flex-wrap items-center gap-3"><Button size="sm" variant="secondary" onClick={()=>setNotice('Invitation link copied in this example.')}>Invite member</Button><Button size="sm" variant="danger" onClick={()=>setNotice('Archive action selected.')}>Archive</Button><Button size="sm" disabled>Up to date <Check size={14}/></Button></div></div><p role="status">{notice}</p></>;
}