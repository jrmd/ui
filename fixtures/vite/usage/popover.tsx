"use client";
import {Popover} from '@/components/jez-ui/ui/popover';
import {Button} from '@/components/jez-ui/ui/button';

export default function Example(){

return <><Popover trigger={<Button variant="outline">Project notes</Button>}><h3 className="font-medium">A small reminder</h3><p className="mt-2 text-sm">Leave room for the unexpected.</p></Popover></>;
}