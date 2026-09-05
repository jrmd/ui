"use client";
import {useState} from 'react';
import {WebGLRibbonField} from '@/components/jez-ui/ui/webgl-ribbon-field';

export default function Example(){
const [scenePaused,setScenePaused]=useState(false);const [sceneSpeed,setSceneSpeed]=useState(1);const [sceneColor,setSceneColor]=useState<string|undefined>(undefined);
return <><div className="w-full"><WebGLRibbonField paused={scenePaused} speed={sceneSpeed} color={sceneColor}/><div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs"><button className="rounded-lg border border-border px-3 py-2" onClick={()=>setScenePaused(p=>!p)}>{scenePaused?'Play motion':'Pause motion'}</button><label className="flex items-center gap-2">Palette<select aria-label="Scene palette" className="rounded-lg border border-border bg-background px-2 py-2" value={sceneColor??''} onChange={e=>setSceneColor(e.target.value||undefined)}><option value="">Studio</option><option value="#a6c7cc">Glacier</option><option value="#df9e72">Copper</option><option value="#beb1eb">Iris</option></select></label><label className="flex items-center gap-2">Speed<input aria-label="Scene speed" type="range" min="0" max="2" step="0.1" value={sceneSpeed} onChange={e=>setSceneSpeed(Number(e.target.value))} className="w-20 accent-primary"/></label><span className="text-muted-foreground">Move your pointer to explore</span></div></div></>;
}