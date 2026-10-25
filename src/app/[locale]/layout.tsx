import type {Metadata} from "next";
import {GeistSans} from "geist/font/sans";
import {GeistMono} from "geist/font/mono";
import "./globals.css";
import Header from "@/components/Header";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/Footer";

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
        <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased main-color`}>
        <NextIntlClientProvider>
            <Header/>
            {children}
            <Footer/>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
