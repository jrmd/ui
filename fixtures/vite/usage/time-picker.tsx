"use client";
import {TimePicker} from '@/components/jez-ui/ui/time-picker';

export default function Example(){

return <><div className="w-full max-w-sm"><div className="mb-7"><h3 className="text-2xl tracking-tight">Meet in the morning.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Find a time that works for everyone.</p></div><TimePicker defaultValue="09:30"/></div></>;
}