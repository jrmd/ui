"use client";
import {AnimatedCounter} from '@/components/jez-ui/ui/animated-counter';

export default function Example(){

return <><div className="w-full rounded-xl bg-accent p-9 text-foreground md:p-14"><AnimatedCounter target={2048} className="font-display text-7xl tracking-tight md:text-8xl"/><h3 className="mt-6 text-2xl">Small steps. Real progress.</h3><p className="mt-2 text-sm">Counts into view, once you're here.</p></div></>;
}