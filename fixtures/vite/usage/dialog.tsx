"use client";
import {Dialog} from '@/components/jez-ui/ui/dialog';
import {DialogTrigger} from '@/components/jez-ui/ui/dialog';
import {Button} from '@/components/jez-ui/ui/button';
import {DialogContent} from '@/components/jez-ui/ui/dialog';
import {DialogHeader} from '@/components/jez-ui/ui/dialog';
import {DialogTitle} from '@/components/jez-ui/ui/dialog';
import {DialogDescription} from '@/components/jez-ui/ui/dialog';
import {FormField} from '@/components/jez-ui/ui/form-field';
import {Input} from '@/components/jez-ui/ui/input';
import {DialogFooter} from '@/components/jez-ui/ui/dialog';
import {DialogClose} from '@/components/jez-ui/ui/dialog';

export default function Example(){

return <><Dialog><DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger><DialogContent showClose={false}><DialogHeader><DialogTitle>Make it yours.</DialogTitle><DialogDescription>Give your project a name before you begin.</DialogDescription></DialogHeader><FormField label="Project name"><Input placeholder="Field notes"/></FormField><DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></DialogFooter></DialogContent></Dialog></>;
}