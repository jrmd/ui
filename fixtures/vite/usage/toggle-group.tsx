"use client";
import {ToggleGroup} from '@/components/jez-ui/ui/toggle-group';

export default function Example(){

return <><ToggleGroup type="single" defaultValue="week" aria-label="Period" options={[{label:'Day',value:'day'},{label:'Week',value:'week'},{label:'Month',value:'month'}]}/></>;
}