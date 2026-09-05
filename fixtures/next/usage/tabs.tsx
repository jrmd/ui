"use client";
import {Tabs} from '@/components/jez-ui/ui/tabs';
import {TabsList} from '@/components/jez-ui/ui/tabs';
import {TabsTrigger} from '@/components/jez-ui/ui/tabs';
import {TabsContent} from '@/components/jez-ui/ui/tabs';

export default function Example(){
const tabs=[{value:'design',label:'Design',content:'Make it feel like something.'},{value:'build',label:'Build',content:'Give a good idea a useful shape.'},{value:'share',label:'Share',content:'Put it into the world.'}];
return <><Tabs defaultValue="design"><TabsList aria-label="Workflow">{tabs.map(t=><TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>)}</TabsList>{tabs.map(t=><TabsContent key={t.value} value={t.value}>{t.content}</TabsContent>)}</Tabs></>;
}