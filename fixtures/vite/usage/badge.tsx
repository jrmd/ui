"use client";
import {Badge} from '@/components/jez-ui/ui/badge';

export default function Example(){

return <><div className="grid max-w-md gap-7"><h3 className="text-2xl">A status worth noticing.</h3><div className="flex flex-wrap gap-3"><Badge tone="positive">● Live</Badge><Badge tone="accent">In review</Badge><Badge tone="warning">Needs attention</Badge><Badge>Draft</Badge></div><p className="text-sm text-muted-foreground">Small signals. Clear next steps.</p></div></>;
}