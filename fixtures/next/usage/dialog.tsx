"use client";
import {Dialog} from '@/components/jez-ui/ui/dialog';
import {Button} from '@/components/jez-ui/ui/button';
import {Input} from '@/components/jez-ui/ui/input';

export default function Example(){

return <><Dialog trigger={<Button>Open dialog</Button>} title="Make it yours." description="Give your project a name before you begin."><Input aria-label="Project name" placeholder="Field notes"/></Dialog></>;
}