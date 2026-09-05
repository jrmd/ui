"use client";
import {useState} from 'react';
import {Badge} from '@/components/jez-ui/ui/badge';
import {NumberTicker} from '@/components/jez-ui/ui/number-ticker';
import {Button} from '@/components/jez-ui/ui/button';
import {Plus} from 'lucide-react';

export default function Example(){
const [count,setCount]=useState(128);
return <><div className="grid w-full max-w-md gap-7"><div className="flex items-center justify-between"><h3 className="text-2xl">A growing idea.</h3><Badge tone="positive">Live demo</Badge></div><NumberTicker value={count} className="font-display text-8xl tracking-tight"/><div className="flex items-center justify-between border-t border-border pt-5"><p className="text-sm text-muted-foreground">People on the list</p><Button variant="outline" onClick={()=>setCount(c=>c+17)}>Add 17 <Plus size={14}/></Button></div></div></>;
}