"use client";
import {useState} from 'react';
import {DropdownMenu} from '@/components/jez-ui/ui/dropdown-menu';
import {Button} from '@/components/jez-ui/ui/button';

export default function Example(){
const [notice,setNotice]=useState('');
const actions=[{label:'Duplicate',onSelect:()=>setNotice('A copy is ready.')},{label:'Archive',onSelect:()=>setNotice('Moved to archive.')}];
return <><DropdownMenu trigger={<Button variant="outline">Project actions ↓</Button>} items={actions}/><p role="status">{notice}</p></>;
}