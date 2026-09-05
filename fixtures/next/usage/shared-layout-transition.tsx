"use client";
import {SharedLayoutTransition} from '@/components/jez-ui/ui/shared-layout-transition';

export default function Example(){

return <><SharedLayoutTransition items={[{id:'one',title:'Explore the idea',description:'Open a little space for the unexpected. This panel expands while its neighbours move naturally.'},{id:'two',title:'Find the next step',description:'A small, clear action is often all you need.'}]}/></>;
}