"use client";
import {
  SSOLogin,
  SSOLoginIntro,
  SSOLoginFields,
} from "../../registry/blocks/sso-login";

export default function Example() {
  return (
    <SSOLogin>
      <SSOLoginIntro />
      <SSOLoginFields />
    </SSOLogin>
  );
}
