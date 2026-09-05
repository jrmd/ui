"use client";
import {Calendar} from '@/components/jez-ui/ui/calendar';

export default function Example(){

return <><div className="w-full max-w-sm"><div className="mb-7"><h3 className="text-2xl tracking-tight">Make a little time.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">A day for the next good idea.</p></div><Calendar defaultValue="2026-09-08"/></div></>;
}