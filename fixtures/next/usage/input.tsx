"use client";
import {FormField} from '@/components/jez-ui/ui/form-field';
import {Input} from '@/components/jez-ui/ui/input';

export default function Example(){

return <><div className="grid w-full max-w-sm gap-6"><h3 className="text-2xl">Give it a name.</h3><FormField label="Project name" hint="You can change this whenever you like."><Input placeholder="e.g. The next chapter"/></FormField><FormField label="Workspace URL"><div className="flex items-center rounded-lg border border-border px-3"><span className="shrink-0 whitespace-nowrap text-sm text-muted-foreground">studio.app /</span><Input className="border-0 bg-transparent shadow-none focus-visible:ring-0" aria-label="Workspace slug" defaultValue="field-notes"/></div></FormField></div></>;
}