"use client";
import {Heatmap} from '@/components/jez-ui/ui/heatmap';

export default function Example(){

return <><div className="w-full max-w-2xl"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><h3 className="text-3xl tracking-tight">Keep showing up.</h3><p className="mt-2 text-sm text-muted-foreground">A year of small, consistent steps</p></div><span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">Demo data</span></div><Heatmap/></div></>;
}