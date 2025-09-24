'use client';

import {useRouter, usePathname} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import {useLocale} from 'next-intl';
import {routing} from '@/i18n/routing';
import Image from 'next/image';

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = pathname.split('/')[1];
    const locale = useLocale();
    const langRef = useRef<HTMLDivElement>(null);
    const [isLangOpen, setIsLangOpen] = useState(false);

    const switchLanguage = (newLocale: string) => {
        const normalized = newLocale;
        const newPath = pathname.replace(`/${currentLocale}`, `/${normalized}`);
        router.push(newPath);
    };

    const filteredLanguages = routing.locales
        .filter((lang) => lang !== locale)
        .map((lang) => (lang));

    const flagMap: Record<string, string> = {
        en: '/lang/en.png',
        ru: '/lang/ru.png',
        tk: '/lang/tk.png',
    };

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (langRef.current && !langRef.current.contains(e.target as Node)) {
                setIsLangOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div
            ref={langRef}
            onClick={() => setIsLangOpen((prev) => !prev)}
            className="relative cursor-pointer select-none"
        >
            <div className="rounded-full border-2 border-white p-1">
                <Image
                    src={flagMap[currentLocale]}
                    alt={currentLocale}
                    width={180}
                    height={38}
                    className="w-6 h-6 rounded-full object-cover"
                />
            </div>

            {isLangOpen && (
                <div className="absolute top-full mt-1 shadow-lg z-50 w-12 z-60" style={{
                    right: "-6px"
                }}>
                    {filteredLanguages.map((lang) => (
                        <div
                            key={lang}
                            onClick={() => {
                                switchLanguage(lang);
                                setIsLangOpen(false);
                            }}
                            className="p-2 cursor-pointer bg-white flex justify-center"
                        >
                            <Image
                                src={flagMap[lang]}
                                alt={lang}
                                width={180}
                                height={38}
                                className="w-7 h-7 rounded-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
