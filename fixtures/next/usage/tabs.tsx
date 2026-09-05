"use client";
import {Tabs} from '@/components/jez-ui/ui/tabs';

export default function Example(){

return <><div className="w-full max-w-md"><h3 className="mb-5 text-2xl">Room for the whole process.</h3><Tabs items={[{value:'design',label:'Design',content:<div className="py-5"><p className="text-3xl">Start with a question.</p><p className="mt-3 text-sm text-muted-foreground">Sketch the possibilities before you choose a direction.</p></div>},{value:'build',label:'Build',content:<div className="py-5"><p className="text-3xl">Give it a useful shape.</p><p className="mt-3 text-sm text-muted-foreground">Make the smallest version that tells you something.</p></div>},{value:'share',label:'Share',content:<div className="py-5"><p className="text-3xl">Let someone try it.</p><p className="mt-3 text-sm text-muted-foreground">The next good idea might come from them.</p></div>}]}/></div></>;
}