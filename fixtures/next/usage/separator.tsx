"use client";
import {Badge} from '@/components/jez-ui/ui/badge';
import {Separator} from '@/components/jez-ui/ui/separator';

export default function Example(){

return <><div className="grid w-full max-w-sm gap-5"><div className="flex justify-between"><h3 className="text-xl">Your workspace</h3><Badge>Personal</Badge></div><Separator/><div className="flex justify-between text-sm"><span>Projects</span><span className="text-muted-foreground">12</span></div><div className="flex justify-between text-sm"><span>Collaborators</span><span className="text-muted-foreground">4</span></div></div></>;
}