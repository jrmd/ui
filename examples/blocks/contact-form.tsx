"use client";
import {
  ContactForm,
  ContactFormIntro,
  ContactFormContactFields,
  ContactFormProjectField,
  ContactFormSubmit,
  ContactFormStatus,
} from "../../registry/blocks/contact-form";

export default function Example() {
  return (
    <ContactForm>
      <ContactFormIntro />
      <ContactFormContactFields />
      <ContactFormProjectField />
      <ContactFormSubmit />
      <ContactFormStatus />
    </ContactForm>
  );
}
