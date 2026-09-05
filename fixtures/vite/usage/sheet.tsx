"use client";
import {useState} from 'react';
import {Sheet} from '@/components/jez-ui/ui/sheet';
import {Button} from '@/components/jez-ui/ui/button';
import {FormField} from '@/components/jez-ui/ui/form-field';
import {Input} from '@/components/jez-ui/ui/input';
import {Select} from '@/components/jez-ui/ui/select';
import {Textarea} from '@/components/jez-ui/ui/textarea';

export default function Example(){
const [notice,setNotice]=useState('');
return <><Sheet trigger={<Button variant="outline">Open details</Button>} title="Project details" description="Website refresh · PRJ-102"><div className="grid gap-6"><FormField label="Project name"><Input defaultValue="Website refresh"/></FormField><FormField label="Status"><Select label="Status" defaultValue="progress" options={[{label:"In progress",value:"progress"},{label:"In review",value:"review"},{label:"Complete",value:"complete"}]}/></FormField><FormField label="Notes"><Textarea defaultValue="Explore a clearer homepage direction and bring the component previews up to date."/></FormField><Button onClick={()=>setNotice("Project details saved.")}>Save changes</Button></div></Sheet><p role="status">{notice}</p></>;
}