"use client";
import {Checkbox} from '@/components/jez-ui/ui/checkbox';

export default function Example(){

return <><div className="grid w-full max-w-sm gap-5"><h3 className="text-2xl">Before we go live.</h3>{['Add the finishing touches','Check the small screen','Share it with the team'].map((text,i)=><label key={text} className="flex items-center gap-3 border-b border-border pb-4 text-sm"><Checkbox defaultChecked={i===0}/>{text}</label>)}</div></>;
}