import type { Metadata } from "next";
import { Bitcount_Single, Darker_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const bitcountSingle = Bitcount_Single({
  variable: "--font-bitcount-single",
  subsets: ["latin"],
  weight: '300',
});

const darkerGrotesque = Darker_Grotesque({
  variable: "--font-darker-grotesque",
  subsets: ["latin"],
  weight: ['600', '700']
});

export const metadata: Metadata = {
  title: "Chronix",
  description: "Track development progress, manage features and subtasks, analyze productivity, and build a searchable timeline of your software projects with Chronix.",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", darkerGrotesque.variable, bitcountSingle.variable, "font-sans", inter.variable)} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute={'class'} defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
