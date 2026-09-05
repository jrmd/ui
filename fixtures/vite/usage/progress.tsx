"use client";
import {useState,useEffect} from 'react';
import {Progress} from '@/components/jez-ui/ui/progress';
import {Button} from '@/components/jez-ui/ui/button';
import {Pause} from 'lucide-react';
import {Play} from 'lucide-react';
import {RotateCcw} from 'lucide-react';

export default function Example(){
const [progress,setProgress]=useState(0);const [progressRunning,setProgressRunning]=useState(false);useEffect(()=>{if(!progressRunning)return;if(progress>=100){setProgressRunning(false);return;}const timer=setTimeout(()=>setProgress(v=>Math.min(100,v+4)),200);return()=>clearTimeout(timer);},[progressRunning,progress]);
return <><div className="w-full max-w-sm"><div className="mb-7"><h3 className="text-2xl tracking-tight">Getting there.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">The next release is taking shape.</p></div><div className="grid gap-4"><div className="flex items-center justify-between text-sm"><span>{progress===100?"Export complete":progressRunning?"Preparing export…":progress>0?"Export paused":"Ready to export"}</span><span className="font-mono tabular-nums">{progress}%</span></div><Progress value={progress} label="Export progress" showLabel={false}/><div className="flex gap-2"><Button size="sm" disabled={progress===100} onClick={()=>setProgressRunning(v=>!v)}>{progressRunning?<Pause size={14}/>:<Play size={14}/>} {progressRunning?"Pause":progress>0?"Resume":"Start export"}</Button><Button size="sm" variant="ghost" aria-label="Reset progress" onClick={()=>{setProgressRunning(false);setProgress(0);}}><RotateCcw size={14}/></Button></div><p className="text-xs text-muted-foreground">Simulated export · try pausing halfway through.</p></div></div></>;
}