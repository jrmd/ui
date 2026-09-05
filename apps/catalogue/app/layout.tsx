import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: { default: "Jez UI — Make something good.", template: "%s — Jez UI" },
  description:
    "90 components. 67 blocks. 8 complete templates. Clean foundations, expressive motion, and source you can make your own.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
