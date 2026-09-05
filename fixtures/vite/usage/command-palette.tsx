"use client";
import {useState} from 'react';
import {CommandPalette} from '@/components/jez-ui/ui/command-palette';

export default function Example(){
const [notice,setNotice]=useState('');
return <><div className="w-full max-w-sm"><div className="mb-7"><h3 className="text-2xl tracking-tight">One shortcut away.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Find your next action without losing your place.</p></div><CommandPalette items={[{label:"Create a project",group:"Workspace",shortcut:"⌘ N",onSelect:()=>setNotice("Create project selected.")},{label:"Find a teammate",group:"Workspace",onSelect:()=>setNotice("Team search selected.")},{label:"Open settings",group:"Navigation",shortcut:"⌘ ,",onSelect:()=>setNotice("Settings selected.")},{label:"View archive",group:"Navigation",onSelect:()=>setNotice("Archive selected.")}]}/></div><p role="status">{notice}</p></>;
}