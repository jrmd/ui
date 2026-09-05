"use client";
import {ScatterChart} from '@/components/jez-ui/ui/scatter-chart';

export default function Example(){

return <><div className="w-full max-w-2xl"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><h3 className="text-3xl tracking-tight">Find the pattern.</h3><p className="mt-2 text-sm text-muted-foreground">The relationship behind the numbers</p></div><span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">Demo data</span></div><ScatterChart/></div></>;
}