"use client";
import {TagInput} from '@/components/jez-ui/ui/tag-input';

export default function Example(){

return <><div className="w-full max-w-sm"><div className="mb-7"><h3 className="text-2xl tracking-tight">A little more organised.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Give your next idea a few useful labels.</p></div><TagInput defaultValue={['Design','Play']}/></div></>;
}