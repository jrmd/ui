"use client";
import {
  SplitLogin,
  SplitLoginBrandPanel,
  SplitLoginFormPanel,
} from "../../registry/blocks/split-login";

export default function Example() {
  return (
    <SplitLogin>
      <SplitLoginBrandPanel />
      <SplitLoginFormPanel />
    </SplitLogin>
  );
}
