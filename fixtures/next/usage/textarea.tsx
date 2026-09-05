"use client";
import {useState} from 'react';
import {Avatar} from '@/components/jez-ui/ui/avatar';
import {Textarea} from '@/components/jez-ui/ui/textarea';
import {Button} from '@/components/jez-ui/ui/button';
import {ArrowUpRight} from 'lucide-react';

export default function Example(){
const [draft,setDraft]=useState('');
const [notice,setNotice]=useState('');
return <><div className="w-full max-w-lg"><div className="mb-4 flex items-center gap-3"><Avatar alt="Alex Morgan" fallback="AM" className="size-8"/><div><h3 className="text-sm font-semibold">Add a project update</h3><p className="text-xs text-muted-foreground">Shared with your team</p></div></div><div className="overflow-hidden rounded-xl border border-border focus-within:border-primary/50 focus-within:ring-3 focus-within:ring-primary/8"><Textarea aria-label="Project description" placeholder="What changed? What’s next?" maxLength={500} value={draft} onChange={e=>setDraft(e.target.value)} className="min-h-36 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"/><div className="flex items-center justify-between border-t border-border/50 bg-muted/20 px-3 py-2"><span className="text-xs text-muted-foreground tabular-nums">{draft.length} / 500</span><Button size="sm" disabled={!draft.trim()} onClick={()=>{setNotice('Update posted: '+draft);setDraft('');}}>Post update <ArrowUpRight size={14}/></Button></div></div></div><p role="status">{notice}</p></>;
}