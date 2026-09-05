"use client";
import {Stepper} from '@/components/jez-ui/ui/stepper';

export default function Example(){

return <><div className="w-full max-w-sm"><div className="mb-7"><h3 className="text-2xl tracking-tight">One thing at a time.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">A few small steps to make yourself at home.</p></div><Stepper steps={['Your details','Workspace','Ready']} current={1}/></div></>;
}