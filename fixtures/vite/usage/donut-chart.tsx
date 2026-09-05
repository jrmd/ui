"use client";
import {DonutChart} from '@/components/jez-ui/ui/donut-chart';

export default function Example(){

return <><div className="w-full max-w-2xl"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><h3 className="text-3xl tracking-tight">Where it all goes.</h3><p className="mt-2 text-sm text-muted-foreground">A week of studio time</p></div><span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">Demo data</span></div><DonutChart/></div></>;
}