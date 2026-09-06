"use client";
import {
  SignInForm,
  SignInFormIntro,
  SignInFormEmailField,
  SignInFormPasswordField,
  SignInFormSubmit,
  SignInFormStatus,
} from "../../registry/blocks/sign-in-form";

export default function Example() {
  return (
    <SignInForm>
      <SignInFormIntro />
      <SignInFormEmailField />
      <SignInFormPasswordField />
      <SignInFormSubmit />
      <SignInFormStatus />
    </SignInForm>
  );
}
