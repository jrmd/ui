"use client";
import {FormField} from '@/components/jez-ui/ui/form-field';
import {Input} from '@/components/jez-ui/ui/input';

export default function Example(){

return <><div className="w-full max-w-sm"><div className="mb-7"><h3 className="text-2xl tracking-tight">Start something new.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Give your workspace a name you will remember.</p></div><FormField label="Project name" hint="Something you’ll recognise later."><Input placeholder="Field notes"/></FormField></div></>;
}