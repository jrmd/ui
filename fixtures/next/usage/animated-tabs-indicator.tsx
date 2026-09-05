"use client";
import {AnimatedTabsIndicator} from '@/components/jez-ui/ui/animated-tabs-indicator';

export default function Example(){
const tabs=[{value:'design',label:'Design',content:'Make it feel like something.'},{value:'build',label:'Build',content:'Give a good idea a useful shape.'},{value:'share',label:'Share',content:'Put it into the world.'}];
return <><AnimatedTabsIndicator items={tabs}/></>;
}