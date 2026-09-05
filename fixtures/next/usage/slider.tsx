"use client";
import {Slider} from '@/components/jez-ui/ui/slider';

export default function Example(){

return <><div className="grid min-w-0 w-full max-w-sm gap-8"><div className="flex items-end justify-between"><h3 className="text-3xl">Set the tone.</h3><span className="text-xs text-muted-foreground">Ambient radio</span></div><div className="flex h-20 min-w-0 items-center justify-center gap-1 sm:gap-1.5" aria-hidden="true">{Array.from({length:32},(_,i)=><span key={i} className="w-1.5 rounded-full bg-primary" style={{height:12+Math.abs(Math.sin(i*.8))*55}}/>)}</div><Slider label="Volume" defaultValue={[65]}/><div className="flex justify-between text-xs text-muted-foreground"><span>A little quieter</span><span>Turn it up</span></div></div></>;
}