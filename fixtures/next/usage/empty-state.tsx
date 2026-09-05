"use client";
import {useState} from 'react';
import {EmptyState} from '@/components/jez-ui/ui/empty-state';
import {Button} from '@/components/jez-ui/ui/button';

export default function Example(){
const [notice,setNotice]=useState('');
return <><EmptyState action={<Button onClick={()=>setNotice('Your first idea starts here.')}>Create an idea</Button>}/><p role="status">{notice}</p></>;
}