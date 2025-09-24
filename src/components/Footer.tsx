'use client';

import Link from "next/link";
import {RiMovie2Line} from "react-icons/ri";
import {PiMusicNotesBold} from "react-icons/pi";
import {IoBookSharp, IoLocationOutline} from "react-icons/io5";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";

const Footer = () => {
    const t = useTranslations('Header');
    const pathname = usePathname();

    const firstSegment = pathname.split('/')[1];
    const hideMenu = ['en', 'ru', 'tk'].includes(firstSegment) && pathname.split('/').length === 2;

    const navItems = [
        {href: '/movie', label: t('movie'), icon: <RiMovie2Line/>},
        {href: '/music', label: t('music'), icon: <PiMusicNotesBold/>},
        {href: '/books', label: t('books'), icon: <IoBookSharp/>},
        {href: '/navigation', label: t('navigation'), icon: <IoLocationOutline/>},
    ];

    const isActive = (link: string) => pathname.endsWith(link);

    return (
        <div className="fixed w-full bottom-0 z-10">
            {!hideMenu && (
                <div className="flex justify-between lg:hidden space-x-5 items-center bg-white py-2 px-6">
                    {navItems.map(item => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center px-3 py-1 rounded-full space-x-2 m-0
                                        ${active ? 'text-white main-color' : 'text-gray-700'}`}
                            >
                                <span className="text-xl mb-0">{item.icon}</span>
                                {active && <div className="text-sm font-medium">{item.label}</div>}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Footer;
