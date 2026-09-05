"use client";
import {PasswordInput} from '@/components/jez-ui/ui/password-input';

export default function Example(){

return <><div className="w-full max-w-sm"><div className="mb-7"><h3 className="text-2xl tracking-tight">Keep it between us.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">A strong password is a good place to start.</p></div><PasswordInput placeholder="Your password"/></div></>;
}