"use client";
import {Combobox} from '@/components/jez-ui/ui/combobox';

export default function Example(){

return <><div className="w-full max-w-sm"><div className="mb-7"><h3 className="text-2xl tracking-tight">Choose your starting point.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">The right tools for the way you work.</p></div><Combobox options={[{label:'React',value:'react',description:'Build interactive interfaces'},{label:'Next.js',value:'next',description:'React with server rendering'},{label:'Vite',value:'vite',description:'A fast development toolchain'},{label:'Astro',value:'astro',description:'Content-driven websites'},{label:'Remix',value:'remix',description:'Full-stack web applications'}]} label="Choose framework"/></div></>;
}