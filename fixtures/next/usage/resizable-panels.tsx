"use client";
import {ResizablePanels} from '@/components/jez-ui/ui/resizable-panels';

export default function Example(){

return <><div className="w-full max-w-2xl"><div className="mb-7"><h3 className="text-2xl tracking-tight">Space that works for you.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Adjust the balance with a pointer or the arrow keys.</p></div><ResizablePanels left={<p className="text-sm">Drag the divider, or focus it and use arrow keys.</p>} right={<p className="text-sm">Room for your work.</p>}/></div></>;
}