import "./globals.css";

import AuthContext from "@/context/AuthContext";
import type { Metadata } from "next";
import NextThemeProvider from "@/providers/NextThemeProvider";
import { Toaster } from "@/components/ui/toaster";

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
        <AuthContext>
          <NextThemeProvider>
            <Toaster />
            {children}
          </NextThemeProvider>
        </AuthContext>
      </body>
    </html>
  );
};

export default RootLayout;