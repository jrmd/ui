"use client";
import {Skeleton} from '@/components/jez-ui/ui/skeleton';

export default function Example(){

return <><div className="grid w-full max-w-sm gap-5"><Skeleton className="h-40 rounded-xl"/><div className="flex items-center gap-4"><Skeleton className="size-11 rounded-full"/><div className="grid flex-1 gap-3"><Skeleton className="w-3/4"/><Skeleton className="w-1/2"/></div></div><p className="text-xs text-muted-foreground">Making room for the next good thing.</p></div></>;
}