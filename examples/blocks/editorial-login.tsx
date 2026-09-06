"use client";
import {
  EditorialLogin,
  EditorialLoginMasthead,
  EditorialLoginLayout,
} from "../../registry/blocks/editorial-login";

export default function Example() {
  return (
    <EditorialLogin>
      <EditorialLoginMasthead />
      <EditorialLoginLayout />
    </EditorialLogin>
  );
}
