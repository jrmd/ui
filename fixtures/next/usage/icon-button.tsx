"use client";
import {useState} from 'react';
import {IconButton} from '@/components/jez-ui/ui/icon-button';
import {Plus} from 'lucide-react';

export default function Example(){
const [notice,setNotice]=useState('');
return <><div className="flex items-center gap-5"><IconButton label="Add item" onClick={()=>setNotice('Item added')}><Plus size={18}/></IconButton><div><p className="font-medium">One small action.</p><p className="mt-1 text-sm text-muted-foreground">A new idea starts here.</p></div></div><p role="status">{notice}</p></>;
}