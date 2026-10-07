import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://lapmart-v1.epixerp.com"),
  title: "LapMart 2030 | Sri Lanka's Futuristic Laptop & Tech Store",
  description: "Experience the next dimension of laptop shopping in Sri Lanka with LapMart 2030. Brand new & premium used laptops, 7 islandwide branches, and live telemetry.",
  icons: {
    icon: [
      { url: "/favicon-icon.png", type: "image/png" }
    ],
    shortcut: "/favicon-icon.png",
    apple: "/favicon-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" href="/favicon-icon.png" />
        <link rel="shortcut icon" href="/favicon-icon.png" />
        <link rel="apple-touch-icon" href="/favicon-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('lapmart_theme');
                  // Light theme is default; if saved is explicitly 'dark', activate dark mode
                  if (saved === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
