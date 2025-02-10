import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import { QuestionProvider } from "@/store/QuestionStore";

const font = Open_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Assignment PDF Generator",
  description: "Generate PDFs from assignments code quickly and easily.",
  icons: "./favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${font.className} antialiased`}
      >
        <QuestionProvider>
          {children}
        </QuestionProvider>
      </body>
    </html>
  );
}
