import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SoundProvider } from "@/components/SoundProvider";
import Navbar from "@/components/Navbar";
import MouseFollower from "@/components/MouseFollower";
import { LiquidEther } from "@/components/react-bits/LiquidEther";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XhuuLL Portfolio",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col pb-24 bg-transparent">
        <LiquidEther />
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          <SoundProvider>
            <MouseFollower />
            <Navbar />
            <main className="flex-1 flex flex-col relative z-0">{children}</main>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
