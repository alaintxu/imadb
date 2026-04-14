import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import Providers from "@/components/Providers";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laboratorio de IMA - Marvel Champions",
  description: "Inspirado el los Laboratorios de IMA de La Mano de Thanos",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const languageCookie = cookieStore.get("language");
  const initialLanguage = languageCookie?.value === "en" || languageCookie?.value === "es" 
    ? languageCookie.value 
    : "es";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers initialLanguage={initialLanguage}>
          <Navigation />
          <main className="w-full px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
