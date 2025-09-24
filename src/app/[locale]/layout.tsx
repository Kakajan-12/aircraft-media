import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/Footer";

const geistSans = Geist({variable: "--font-geist-sans", subsets: ["latin"]});
const geistMono = Geist_Mono({variable: "--font-geist-mono", subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Turkmenistan Airlines",
    description: "Turkmenistan airlines media system",
    icons: {icon: [{url: "/logo.png", type: "image/png"}]},
};

export default async function RootLayout({
                                             children,
                                             params,
                                         }: Readonly<{
    params: Promise<{ locale: string }>;
    children: React.ReactNode;
}>) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased main-color`}>
        <NextIntlClientProvider>
            <Header/>
            {children}
            <Footer/>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
