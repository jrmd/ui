"use client";
import { Faq, FaqTitle, FaqQuestions } from "../../registry/blocks/faq";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../registry/ui/accordion";
export default function Example() {
  return (
    <Faq>
      <FaqTitle>Your questions, answered.</FaqTitle>
      <FaqQuestions>
        <AccordionItem value="custom">
          <AccordionTrigger>Can I choose my own content?</AccordionTrigger>
          <AccordionContent>
            Yes. The sections keep their behavior when you supply your own
            content.
          </AccordionContent>
        </AccordionItem>
      </FaqQuestions>
    </Faq>
  );
}
