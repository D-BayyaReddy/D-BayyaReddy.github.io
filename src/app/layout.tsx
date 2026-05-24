import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
import GlowCursor from "@/components/GlowCursor";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Bayya Reddy Danduri | Full-Stack Software Engineer & SaaS Builder",
  description: "Developer portfolio of Bayya Reddy Danduri. Software Engineer and Full-Stack Developer specializing in Python, React, Next.js, and Fitness Tech platforms.",
  keywords: ["Bayya Reddy Danduri", "baserd", "Software Engineer", "Full Stack Developer", "Fitness Tech", "Next.js Portfolio", "React Three Fiber", "Web Developer Portfolio"],
  authors: [{ name: "Bayya Reddy Danduri" }],
  creator: "Bayya Reddy Danduri",
  metadataBase: new URL("https://d-bayyareddy.github.io"),
  openGraph: {
    title: "Bayya Reddy Danduri | Software Engineer Portfolio",
    description: "Detail-oriented Software Engineer and Full-Stack Developer passionate about SaaS, fitness-tech, and building beautiful, scalable digital experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bayya Reddy Danduri | Software Engineer Portfolio",
    description: "Explore the modern interactive developer portfolio of Bayya Reddy Danduri.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" style={{ scrollBehavior: "smooth" }}>
      <body className={`${outfit.variable} ${jetbrainsMono.variable} min-h-screen antialiased selection:bg-primary/20`}>
        <ThemeProvider>
          {/* Custom Lag-based cursor spotlight */}
          <GlowCursor />
          {children}
        </ThemeProvider>
        {/* EmailJS Browser SDK Integration */}
        <Script
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
