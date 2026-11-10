import { Josefin_Sans } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";


import Footer from "@/components/Shared/footer";
import { Navbar } from "@/components/Shared/navbar";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", josefinSans.variable)}
    >
      <body className={josefinSans.className}>

        <ThemeProvider>
          <Navbar/>
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}