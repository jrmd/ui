"use client";
import {NavigationMenu} from '@/components/jez-ui/ui/navigation-menu';

export default function Example(){

return <><NavigationMenu items={[{label:'Components',href:'/components'},{label:'Blocks',href:'/blocks'},{label:'Templates',href:'/templates'}]}/></>;
}