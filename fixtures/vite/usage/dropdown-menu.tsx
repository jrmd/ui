"use client";
import {useState} from 'react';
import {DropdownMenu} from '@/components/jez-ui/ui/dropdown-menu';
import {DropdownMenuTrigger} from '@/components/jez-ui/ui/dropdown-menu';
import {Button} from '@/components/jez-ui/ui/button';
import {DropdownMenuContent} from '@/components/jez-ui/ui/dropdown-menu';
import {DropdownMenuLabel} from '@/components/jez-ui/ui/dropdown-menu';
import {DropdownMenuItem} from '@/components/jez-ui/ui/dropdown-menu';
import {DropdownMenuSeparator} from '@/components/jez-ui/ui/dropdown-menu';
import {DropdownMenuCheckboxItem} from '@/components/jez-ui/ui/dropdown-menu';
import {DropdownMenuSub} from '@/components/jez-ui/ui/dropdown-menu';
import {DropdownMenuSubTrigger} from '@/components/jez-ui/ui/dropdown-menu';
import {DropdownMenuSubContent} from '@/components/jez-ui/ui/dropdown-menu';

export default function Example(){
const [showArchived,setShowArchived]=useState<boolean|"indeterminate">(true);
const [notice,setNotice]=useState('');
const actions=[{label:'Duplicate',onSelect:()=>setNotice('A copy is ready.')},{label:'Archive',onSelect:()=>setNotice('Moved to archive.')}];
return <><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Project actions ↓</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>Project</DropdownMenuLabel>{actions.map(action=><DropdownMenuItem key={action.label} onSelect={action.onSelect}>{action.label}</DropdownMenuItem>)}<DropdownMenuSeparator/><DropdownMenuCheckboxItem checked={showArchived} onCheckedChange={setShowArchived}>Show archived</DropdownMenuCheckboxItem><DropdownMenuSub><DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger><DropdownMenuSubContent><DropdownMenuItem onSelect={()=>setNotice("Moved to Personal.")}>Personal</DropdownMenuItem><DropdownMenuItem onSelect={()=>setNotice("Moved to Team.")}>Team</DropdownMenuItem></DropdownMenuSubContent></DropdownMenuSub></DropdownMenuContent></DropdownMenu><p role="status">{notice}</p></>;
}