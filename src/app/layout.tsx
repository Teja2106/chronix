import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  weight: ["400", "500", "600", "700"],
  display: "swap"
})

export const metadata: Metadata = {
  title: "Chronix",
  description: "A glorified To-Do Application, access it either on the website or self-host it.",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ plusJakarta.variable } antialiased`}>
        <ThemeProvider attribute={`class`} defaultTheme="dark" enableSystem={ false }>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
