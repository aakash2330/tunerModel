import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Dashboard } from "@/components/playground";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider>
          <div className="p-5">
            <Dashboard>{children}</Dashboard>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
