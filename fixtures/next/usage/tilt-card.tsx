"use client";
import {TiltCard} from '@/components/jez-ui/ui/tilt-card';

export default function Example(){

return <><TiltCard className="w-full max-w-sm border-0 bg-primary p-0 text-primary-foreground"><div className="flex min-h-80 flex-col justify-between p-8"><div className="flex justify-between text-sm"><span>Jez Studio</span><span>↗</span></div><h3 className="text-5xl font-medium leading-[1.05] tracking-tight">A different<br/>perspective.</h3><div className="flex justify-between border-t border-white/30 pt-5 text-xs"><span>Move your pointer.</span><span>Make it yours.</span></div></div></TiltCard></>;
}