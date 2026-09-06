import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  icons: {icon:"/icon.svg"},
  title: { default: "Jez UI — Make something good.", template: "%s — Jez UI" },
  description:
    "91 components. 92 blocks. 9 complete templates. Clean foundations, expressive motion, and source you can make your own.",
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
