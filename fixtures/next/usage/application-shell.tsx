"use client";
import {ApplicationShell} from '@/components/jez-ui/blocks/application-shell';
import {TaskList} from '@/components/jez-ui/blocks/task-list';
import {ActivityFeed} from '@/components/jez-ui/blocks/activity-feed';

export default function Example(){

return <><ApplicationShell brand="Acme" currentPath="#overview"><div className="mb-7"><p className="mb-2 text-xs text-muted-foreground">Tuesday, 8 September</p><h2 className="font-display text-2xl">Good morning, Alex.</h2><p className="mt-2 text-sm text-muted-foreground">Here’s what needs your attention.</p></div><div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]"><div><h3 className="mb-4 text-sm font-semibold">Your tasks</h3><TaskList/></div><ActivityFeed/></div></ApplicationShell></>;
}