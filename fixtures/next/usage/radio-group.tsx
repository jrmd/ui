"use client";
import {RadioGroup} from '@/components/jez-ui/ui/radio-group';

export default function Example(){

return <><RadioGroup defaultValue="balanced" aria-label="Density" options={[{label:'Comfortable',value:'comfortable'},{label:'Balanced',value:'balanced'},{label:'Compact',value:'compact'}]}/></>;
}