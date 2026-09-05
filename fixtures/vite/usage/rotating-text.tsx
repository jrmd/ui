"use client";
import {RotatingText} from '@/components/jez-ui/ui/rotating-text';

export default function Example(){

return <><div className="w-full rounded-xl bg-muted p-8 md:p-14"><div className="font-display text-5xl font-medium leading-tight tracking-tight md:text-6xl">A place for<br/><RotatingText words={['bold ideas.','small details.','your next thing.']} className="text-primary"/></div><p className="mt-9 text-sm text-muted-foreground">Keep making room.</p></div></>;
}