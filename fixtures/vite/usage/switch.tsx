"use client";
import {Switch} from '@/components/jez-ui/ui/switch';

export default function Example(){

return <><div className="grid w-full max-w-sm gap-6"><div><h3 className="text-2xl">Keep your focus.</h3><p className="mt-2 text-sm text-muted-foreground">A quieter workspace, on your terms.</p></div>{[{name:'Focus mode',hint:'Make a little room to think.',on:true},{name:'Project updates',hint:'Only the changes that matter.',on:true},{name:'Weekly roundup',hint:'The whole picture, once a week.',on:false}].map(o=><label key={o.name} className="flex items-center justify-between gap-6 border-b border-border pb-5"><div><span className="text-sm font-medium">{o.name}</span><p className="mt-1 text-xs text-muted-foreground">{o.hint}</p></div><Switch defaultChecked={o.on}/></label>)}</div></>;
}