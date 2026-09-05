"use client";
import {SidebarProvider} from '@/components/jez-ui/ui/sidebar';
import {Sidebar} from '@/components/jez-ui/ui/sidebar';
import {SidebarHeader} from '@/components/jez-ui/ui/sidebar';
import {SidebarContent} from '@/components/jez-ui/ui/sidebar';
import {SidebarGroup} from '@/components/jez-ui/ui/sidebar';
import {SidebarGroupLabel} from '@/components/jez-ui/ui/sidebar';
import {SidebarMenu} from '@/components/jez-ui/ui/sidebar';
import {SidebarMenuItem} from '@/components/jez-ui/ui/sidebar';
import {SidebarMenuButton} from '@/components/jez-ui/ui/sidebar';
import {Folder} from 'lucide-react';
import {FileCode2} from 'lucide-react';
import {SidebarMenuSub} from '@/components/jez-ui/ui/sidebar';
import {SidebarMenuSubItem} from '@/components/jez-ui/ui/sidebar';
import {SidebarMenuSubButton} from '@/components/jez-ui/ui/sidebar';
import {SidebarFooter} from '@/components/jez-ui/ui/sidebar';
import {SidebarInset} from '@/components/jez-ui/ui/sidebar';
import {SidebarTrigger} from '@/components/jez-ui/ui/sidebar';

export default function Example(){

return <><SidebarProvider className="overflow-hidden rounded-xl border border-border"><Sidebar><SidebarHeader><span className="block truncate px-3 py-2 font-semibold">North Studio</span></SidebarHeader><SidebarContent><SidebarGroup><SidebarGroupLabel>Workspace</SidebarGroupLabel><SidebarMenu><SidebarMenuItem><SidebarMenuButton asChild isActive><a href="#overview"><Folder/><span>Overview</span></a></SidebarMenuButton></SidebarMenuItem><SidebarMenuItem><SidebarMenuButton asChild><a href="#projects"><FileCode2/><span>Projects</span></a></SidebarMenuButton><SidebarMenuSub>{["Website refresh","Design system","Mobile app"].map(name=><SidebarMenuSubItem key={name}><SidebarMenuSubButton asChild><a href={"#"+name.toLowerCase().replaceAll(" ","-")}><span>{name}</span></a></SidebarMenuSubButton></SidebarMenuSubItem>)}</SidebarMenuSub></SidebarMenuItem></SidebarMenu></SidebarGroup><SidebarGroup><SidebarGroupLabel>Resources</SidebarGroupLabel><SidebarMenu>{["Documentation","Team","Settings"].map(name=><SidebarMenuItem key={name}><SidebarMenuButton asChild><a href={"#"+name.toLowerCase()}><Folder/><span>{name}</span></a></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroup></SidebarContent><SidebarFooter><span className="block truncate px-3 text-xs">alex@north.example</span></SidebarFooter></Sidebar><SidebarInset><header className="flex items-center gap-3 border-b border-border p-4"><SidebarTrigger/><span className="text-sm">Workspace</span></header><div className="p-6"><h1 className="text-2xl">Built from your own pieces.</h1><p className="mt-3 text-sm text-muted-foreground">Add groups, nested links, custom headers, and account controls using children.</p></div></SidebarInset></SidebarProvider></>;
}