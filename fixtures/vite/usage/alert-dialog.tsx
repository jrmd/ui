"use client";
import {AlertDialog} from '@/components/jez-ui/ui/alert-dialog';
import {Button} from '@/components/jez-ui/ui/button';

export default function Example(){

return <><AlertDialog trigger={<Button variant="danger">Delete draft</Button>} title="Delete this draft?" description="This example asks for confirmation. No real data is deleted."/></>;
}