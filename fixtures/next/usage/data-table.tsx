"use client";
import {DataTable} from '@/components/jez-ui/ui/data-table';
import {Badge} from '@/components/jez-ui/ui/badge';

export default function Example(){

return <><div className="w-full max-w-2xl"><div className="mb-7"><h3 className="text-2xl tracking-tight">Work in motion.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Three projects, from first thoughts to finished details.</p></div><DataTable selectable data={[{name:'Field notes',status:'Active',tasks:12},{name:'New perspective',status:'In review',tasks:8},{name:'Little things',status:'Done',tasks:24}]} columns={[{accessorKey:'name',header:'Project'},{accessorKey:'status',header:'Status',cell:c=><Badge tone={c.getValue()==='Done'?'positive':c.getValue()==='Active'?'accent':'neutral'}>{String(c.getValue())}</Badge>},{accessorKey:'tasks',header:'Tasks'}]}/></div></>;
}