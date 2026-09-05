"use client";
import {Pagination} from '@/components/jez-ui/ui/pagination';

export default function Example(){

return <><div className="w-full max-w-sm"><div className="mb-7"><h3 className="text-2xl tracking-tight">There is more to explore.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Browse the whole collection, at your own pace.</p></div><Pagination totalPages={8}/></div></>;
}