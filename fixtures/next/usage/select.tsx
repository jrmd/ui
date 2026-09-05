"use client";
import {FormField} from '@/components/jez-ui/ui/form-field';
import {Select} from '@/components/jez-ui/ui/select';

export default function Example(){

return <><div className="grid w-full max-w-sm gap-6"><h3 className="text-2xl">Find your people.</h3><FormField label="Your discipline"><Select label="Choose a discipline" options={[{label:'Design',value:'design'},{label:'Engineering',value:'engineering'},{label:'Everything in between',value:'both'}]}/></FormField><p className="text-sm text-muted-foreground">Different perspectives make better work.</p></div></>;
}