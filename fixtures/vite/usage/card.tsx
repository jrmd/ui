"use client";
import {useState} from 'react';
import {Card} from '@/components/jez-ui/ui/card';
import {Badge} from '@/components/jez-ui/ui/badge';
import {Button} from '@/components/jez-ui/ui/button';

export default function Example(){
const [notice,setNotice]=useState('');
return <><Card className="w-full max-w-sm overflow-hidden p-0"><div className="flex h-40 items-end justify-between bg-accent p-6 text-foreground"><span className="text-5xl font-medium tracking-tight">Field<br/>notes.</span><span className="text-3xl">↗</span></div><div className="p-6"><div className="flex items-center justify-between"><h3 className="text-xl">An idea taking shape</h3><Badge tone="positive">Active</Badge></div><p className="mt-3 text-sm leading-relaxed text-muted-foreground">A shared space for the discoveries, sketches, and small details that make the work better.</p><div className="mt-6 flex items-center justify-between border-t border-border pt-4"><span className="text-xs text-muted-foreground">Updated a moment ago</span><Button size="sm" variant="ghost" onClick={()=>setNotice('Project opened.')}>Open project ↗</Button></div></div></Card><p role="status">{notice}</p></>;
}