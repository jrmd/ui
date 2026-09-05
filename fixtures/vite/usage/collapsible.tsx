"use client";
import {Collapsible} from '@/components/jez-ui/ui/collapsible';
import {FileCode2} from 'lucide-react';

export default function Example(){

return <><div className="w-full max-w-md"><Collapsible title="Changed files · 3" defaultOpen>{["components/button.tsx","styles/theme.css","tests/controls.spec.ts"].map((file,i)=><div key={file} className="flex items-center gap-2 py-2 text-sm"><FileCode2 size={15} className="shrink-0 text-muted-foreground"/><span className="min-w-0 flex-1 truncate font-mono text-xs">{file}</span><span className="text-xs text-primary">+{[24,8,16][i]}</span></div>)}</Collapsible></div></>;
}