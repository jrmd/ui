"use client";
import {Breadcrumb} from '@/components/jez-ui/ui/breadcrumb';

export default function Example(){

return <><Breadcrumb items={[{label:'Library',href:'/components'},{label:'Foundations',href:'/components?category=foundations'},{label:'Breadcrumb'}]}/></>;
}