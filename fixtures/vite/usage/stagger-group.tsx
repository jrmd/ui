"use client";
import {StaggerGroup} from '@/components/jez-ui/ui/stagger-group';

export default function Example(){

return <><StaggerGroup className="w-full max-w-md">{['A thought worth keeping.','A shape worth exploring.','Something worth sharing.'].map((t,i)=><div key={t} className="flex items-center gap-5 border-b border-border py-5"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-lg text-foreground">{i+1}</span><p className="text-lg">{t}</p></div>)}</StaggerGroup></>;
}