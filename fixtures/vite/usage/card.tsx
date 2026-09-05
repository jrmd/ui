"use client";
import {useState} from 'react';
import {Card} from '@/components/jez-ui/ui/card';
import {CardHeader} from '@/components/jez-ui/ui/card';
import {CardTitle} from '@/components/jez-ui/ui/card';
import {CardDescription} from '@/components/jez-ui/ui/card';
import {CardAction} from '@/components/jez-ui/ui/card';
import {Badge} from '@/components/jez-ui/ui/badge';
import {CardContent} from '@/components/jez-ui/ui/card';
import {FormField} from '@/components/jez-ui/ui/form-field';
import {Input} from '@/components/jez-ui/ui/input';
import {CardFooter} from '@/components/jez-ui/ui/card';
import {Button} from '@/components/jez-ui/ui/button';

export default function Example(){
const [notice,setNotice]=useState('');
return <><Card><CardHeader><CardTitle>A little room to think.</CardTitle><CardDescription>A considered surface for whatever comes next.</CardDescription><CardAction><Badge>Draft</Badge></CardAction></CardHeader><CardContent><FormField label="Project name"><Input placeholder="Field notes"/></FormField></CardContent><CardFooter><Button onClick={()=>setNotice("Project created.")}>Create project</Button><Button variant="outline">Cancel</Button></CardFooter></Card><p role="status">{notice}</p></>;
}