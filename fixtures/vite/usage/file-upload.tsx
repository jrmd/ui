"use client";
import {FileUpload} from '@/components/jez-ui/ui/file-upload';

export default function Example(){

return <><div className="w-full max-w-sm"><div className="mb-7"><h3 className="text-2xl tracking-tight">Bring your ideas.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Drop in your reference images, sketches, or brief.</p></div><FileUpload accept="image/*,.pdf" multiple/></div></>;
}