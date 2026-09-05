"use client";
import {Accordion} from '@/components/jez-ui/ui/accordion';

export default function Example(){

return <><Accordion type="single" collapsible items={[{value:'one',title:'What makes a good component?',content:'A clear purpose, thoughtful defaults, and room to make it yours.'},{value:'two',title:'Can I change it?',content:'The source is yours to adapt under your distribution licence.'}]}/></>;
}