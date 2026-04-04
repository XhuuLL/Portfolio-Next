import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SoundProvider } from "@/components/SoundProvider";
import Navbar from "@/components/Navbar";
import MouseFollower from "@/components/MouseFollower";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus Portfolio | Cyber Neon",
  description: "Modern Cyber Neon Interactive Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col pt-20">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SoundProvider>
            <MouseFollower />
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
