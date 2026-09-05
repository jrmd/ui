"use client";
import {SpotlightCard} from '@/components/jez-ui/ui/spotlight-card';
import {Plus} from 'lucide-react';

export default function Example(){

return <><SpotlightCard className="w-full max-w-sm border-0 bg-foreground p-8 text-background"><div className="flex min-h-64 flex-col justify-between"><Plus size={32}/><h3 className="text-4xl leading-tight tracking-tight">The detail<br/>is the difference.</h3><p className="text-xs opacity-70">Follow your curiosity. And the light.</p></div></SpotlightCard></>;
}