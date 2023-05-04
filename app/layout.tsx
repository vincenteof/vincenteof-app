import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "vincenteof",
  description: "vincenteof.app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
