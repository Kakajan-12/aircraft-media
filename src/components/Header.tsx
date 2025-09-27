'use client';

import {usePathname} from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { RiMovie2Line } from "react-icons/ri";
import { PiMusicNotesBold } from "react-icons/pi";
import { IoBookSharp, IoLocationOutline  } from "react-icons/io5";
import {useTranslations} from 'next-intl';
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
    const t = useTranslations('Header');
    const pathname = usePathname();

    const [ , locale ] = pathname.split('/');
    const hideMenu = ['en','ru','tk'].includes(locale) && pathname.split('/').length === 2;

    const navItems = [
        { href: '/movie', label: t('movie'), icon: <RiMovie2Line/> },
        { href: '/music', label: t('music'), icon: <PiMusicNotesBold/> },
        { href: '/books', label: t('books'), icon: <IoBookSharp/> },
        { href: '/navigation', label: t('navigation'), icon: <IoLocationOutline/> },
    ];

    const isActive = (link: string) => pathname.startsWith(`/${locale}${link}`);

    return (
        <div className="main-color fixed w-full top-0 z-30">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-2">
                    <Link href="/">
                        <Image
                            src="/Turkmenistan_Airlines_logo.svg"
                            alt="Turkmenistan_Airlines_logo.svg"
                            width={180}
                            height={38}
                        />
                    </Link>

                    {!hideMenu && (
                        <div className="hidden lg:flex space-x-5 items-center rounded-full bg-white py-2 px-4">
                            {navItems.map(item => {
                                const active = isActive(item.href);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center space-x-1 py-1 px-2 rounded-full 
                                            ${active
                                            ? 'main-color text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {active && (
                                            <span className="text-white">
                                                {item.icon}
                                            </span>
                                        )}
                                        <div>{item.label}</div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}

                    <LanguageSwitcher/>
                </div>
            </div>
        </div>
    );
};

export default Header;
