import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from '@/components/Providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const eliaFont = localFont({
  src: "../../public/fonts/NewA-Regular.ttf",
  variable: "--font-elia",
  display: "block",
});

export const metadata: Metadata = {
  title: "ELIA TypeMaster",
  description: "Learn to type the ELIA Frames™ alphabet with interactive lessons and practice exercises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${eliaFont.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
