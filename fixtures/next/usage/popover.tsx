"use client";
import {Popover} from '@/components/jez-ui/ui/popover';
import {PopoverTrigger} from '@/components/jez-ui/ui/popover';
import {Button} from '@/components/jez-ui/ui/button';
import {PopoverContent} from '@/components/jez-ui/ui/popover';
import {PopoverHeader} from '@/components/jez-ui/ui/popover';
import {PopoverTitle} from '@/components/jez-ui/ui/popover';
import {PopoverDescription} from '@/components/jez-ui/ui/popover';

export default function Example(){

return <><Popover><PopoverTrigger asChild><Button variant="outline">Project notes</Button></PopoverTrigger><PopoverContent><PopoverHeader><PopoverTitle>A small reminder</PopoverTitle><PopoverDescription>Leave room for the unexpected.</PopoverDescription></PopoverHeader></PopoverContent></Popover></>;
}