"use client";
import {
  SignUpForm,
  SignUpFormIntro,
  SignUpFormNameField,
  SignUpFormEmailField,
  SignUpFormPasswordField,
  SignUpFormSubmit,
  SignUpFormStatus,
} from "../../registry/blocks/sign-up-form";

export default function Example() {
  return (
    <SignUpForm>
      <SignUpFormIntro />
      <SignUpFormNameField />
      <SignUpFormEmailField />
      <SignUpFormPasswordField />
      <SignUpFormSubmit />
      <SignUpFormStatus />
    </SignUpForm>
  );
}
