"use client";
import {
  PasswordResetForm,
  PasswordResetFormIntro,
  PasswordResetFormEmailField,
  PasswordResetFormSubmit,
  PasswordResetFormStatus,
} from "../../registry/blocks/password-reset-form";

export default function Example() {
  return (
    <PasswordResetForm>
      <PasswordResetFormIntro />
      <PasswordResetFormEmailField />
      <PasswordResetFormSubmit />
      <PasswordResetFormStatus />
    </PasswordResetForm>
  );
}
