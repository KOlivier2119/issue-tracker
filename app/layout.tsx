import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import { Theme } from "@radix-ui/themes";

const inconsolata = Inconsolata({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inconsolata'
});



export const metadata: Metadata = {
  title: "Issue-Trace",
  description: "Find and fix issues easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inconsolata.variable} antialiased`}
      >
        <Theme accentColor="iris">        
          <Navbar />
          <main className="p-5    ">
            {children}
          </main>           
        </Theme>
      </body>
    </html>
  );
}
