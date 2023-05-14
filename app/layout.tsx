import { ReactNode } from "react";
import Header from "./header";
import "./globals.css";

export const metadata = {
  title: "vincenteof.eth",
  description: "vincenteof's portfolio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased max-w-2xl mb-40 flex flex-col mt-4 mx-auto">
        <Header />
        {children}
      </body>
    </html>
  );
}
