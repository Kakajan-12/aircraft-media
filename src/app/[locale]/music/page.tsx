'use client'

import {useTranslations} from "next-intl";
import {Swiper, SwiperSlide} from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import 'swiper/css';
import 'swiper/css/pagination';


const Music = () => {
    const t = useTranslations('Music')
    return (
        <div className="bg-white rounded-tr-xl rounded-tl-xl w-full mt-18 pb-14">
            <div className="container mx-auto px-4">
                <div className="py-2">
                    <div className="flex items-center justify-between space-x-2">
                        <div className="hidden sm:block text-lg lg:text-2xl font-semibold">{t('popular-artist')}</div>
                        <input
                            type="text"
                            placeholder={t('music-input')}
                            className="w-full md:w-1/2 outline-none main-border px-2 py-1"
                        />
                    </div>
                    <div className="pt-4">
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={2}
                            pagination={{clickable: true}}
                            breakpoints={{
                                400: {slidesPerView: 3, spaceBetween: 30},
                                576: {slidesPerView: 4, spaceBetween: 30},
                                768: {slidesPerView: 5, spaceBetween: 30},
                                1560: {slidesPerView: 7, spaceBetween: 30},
                            }}
                        >
                            {artistItems.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <ArtistCard {...item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>)
}
const artistItems = [
    {title: "DZ-ED", image: "/artist/dz-ed.webp"},
    {title: "Lvbel C5", image: "/artist/lvbelc5.webp"},
    {title: "Hemra Rejepow", image: "/artist/hemra.webp"},
    {title: "Akdo", image: "/artist/akdo.webp"},
    {title: "Dali Dade", image: "/artist/dalidade.webp"},
    {title: "Serdar Agali", image: "/artist/serdar.webp"},
    {title: "Amalia", image: "/artist/amalia.webp"},
];

function ArtistCard({title, image}: { title: string; image: string }) {
    return (
        <div className="flex justify-center">
            <Link href="#" className="flex flex-col items-center bg-[#F0F0F0] pt-4 pb-5 px-4 w-fit rounded-md ">
                <div
                    className="flex flex-col items-center justify-center">
                    <Image src={image} alt={image} width={200} height={200} className="w-20 h-20 md:w-24 md:h-24 rounded-full" />
                </div>
                <div className="text-sm md:text-lg text-center">
                    {title}
                </div>
            </Link>
        </div>

    );
}
export default Music