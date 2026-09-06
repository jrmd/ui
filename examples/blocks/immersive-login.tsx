"use client";
import {
  ImmersiveLogin,
  ImmersiveLoginArtwork,
  ImmersiveLoginFormPanel,
} from "../../registry/blocks/immersive-login";

export default function Example() {
  return (
    <ImmersiveLogin>
      <ImmersiveLoginArtwork />
      <ImmersiveLoginFormPanel />
    </ImmersiveLogin>
  );
}
