import "./globals.css";

import type { Metadata } from "next";
import NextThemeProvider from "@/providers/NextThemeProvider";

export const metadata: Metadata = {
  title: "TextZ",
  description: "The best chat app on the internet.",
};

interface props {
  children: React.ReactNode;
}

const RootLayout: React.FC<props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <NextThemeProvider>
          {children}
        </NextThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;