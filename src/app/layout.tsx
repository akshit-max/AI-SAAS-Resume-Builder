import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const inter=Inter({
  subsets: ["latin"],
});

// type RootLayoutProp={
//   children:React.ReactNode;
// }
interface RootLayoutProp{
  children:React.ReactNode;
  
}

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title:{
    template: "%s - AI Resume Builder",
   absolute:"AI Resume Builder"
  },
  description:
    "AI Resume Builder is the easiest way to create a professional resume that will help you land your dream job.",
};

// export default function RootLayout({ children}: Readonly<{children: React.ReactNode;}>) {
export default function RootLayout({ children}: Readonly<RootLayoutProp>) {
  return (
    <ClerkProvider>
    <html lang="en"  suppressHydrationWarning>
      <body
        className={inter.className}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

        {children}
        <Toaster/>
    </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
