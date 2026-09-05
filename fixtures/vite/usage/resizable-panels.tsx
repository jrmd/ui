"use client";
import {ResizablePanelGroup} from '@/components/jez-ui/ui/resizable-panels';
import {ResizablePanel} from '@/components/jez-ui/ui/resizable-panels';
import {ResizableHandle} from '@/components/jez-ui/ui/resizable-panels';

export default function Example(){

return <><div className="w-full max-w-2xl"><div className="mb-7"><h3 className="text-2xl tracking-tight">Space that works for you.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Adjust the balance with a pointer or the arrow keys.</p></div><ResizablePanelGroup><ResizablePanel defaultSize={25} minSize={15}>Navigation</ResizablePanel><ResizableHandle aria-label="Resize navigation"/><ResizablePanel defaultSize={50} minSize={20}>Your workspace. Drag a divider or focus it and use arrow keys.</ResizablePanel><ResizableHandle aria-label="Resize inspector"/><ResizablePanel defaultSize={25} minSize={15}>Inspector</ResizablePanel></ResizablePanelGroup></div></>;
}