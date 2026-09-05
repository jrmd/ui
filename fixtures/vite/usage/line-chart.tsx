"use client";
import {LineChart} from '@/components/jez-ui/ui/line-chart';

export default function Example(){

return <><div className="w-full max-w-2xl"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><h3 className="text-3xl tracking-tight">A steady rhythm.</h3><p className="mt-2 text-sm text-muted-foreground">Weekly publishing activity</p></div><span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">Demo data</span></div><LineChart/></div></>;
}