"use client";
import {Select} from '@/components/jez-ui/ui/select';
import {SelectTrigger} from '@/components/jez-ui/ui/select';
import {SelectValue} from '@/components/jez-ui/ui/select';
import {SelectContent} from '@/components/jez-ui/ui/select';
import {SelectItem} from '@/components/jez-ui/ui/select';

export default function Example(){

return <><Select><SelectTrigger aria-label="Choose a discipline"><SelectValue placeholder="Choose a discipline"/></SelectTrigger><SelectContent><SelectItem value="design">Design</SelectItem><SelectItem value="engineering">Engineering</SelectItem><SelectItem value="both">Everything in between</SelectItem></SelectContent></Select></>;
}