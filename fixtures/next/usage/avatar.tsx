"use client";
import {Avatar} from '@/components/jez-ui/ui/avatar';

export default function Example(){

return <><div className="grid justify-items-center gap-6"><div className="flex -space-x-3">{['AM','JL','SK','RT'].map((person,i)=><Avatar key={person} alt={['Alex Morgan','Jamie Lee','Sam Kim','Rory Tate'][i]} fallback={person} className="size-14 border-4 border-background bg-muted text-base"/>)}</div><div className="text-center"><h3 className="text-2xl">Better, together.</h3><p className="mt-2 text-sm text-muted-foreground">Four people. One shared idea.</p></div></div></>;
}