"use client";
import {LiveLineChart} from '@/components/jez-ui/ui/live-line-chart';

export default function Example(){

return <><div className="w-full max-w-2xl"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><h3 className="text-3xl tracking-tight">In the moment.</h3><p className="mt-2 text-sm text-muted-foreground">A simulated feed, updating live</p></div><span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">Demo data</span></div><LiveLineChart/></div></>;
}