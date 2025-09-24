'use client'

import Link from "next/link";
import {Swiper, SwiperSlide} from "swiper/react";
import {FaRegFaceLaughSquint} from "react-icons/fa6";
import {LuDrama} from "react-icons/lu";
import {TbHeartBroken} from "react-icons/tb";
import {ImMagicWand} from "react-icons/im";
import {PiDetectiveFill, PiMedalMilitaryFill} from "react-icons/pi";
import {MdOutlineChildCare} from "react-icons/md";
import {useTranslations} from "next-intl";
import 'swiper/css';
import Image from "next/image";
import {RiMovie2Line} from "react-icons/ri";


const Movie = () => {
    const t = useTranslations('Movie');

    return (
        <div className="bg-white rounded-tr-xl rounded-tl-xl w-full mt-18 pb-14">
            <div className="container mx-auto px-4">
                <div className="py-2">
                    <div className="flex items-center justify-between space-x-2">
                        <div className="hidden sm:block text-lg lg:text-2xl font-semibold">{t('genre')}</div>
                        <input
                            type="text"
                            placeholder={t('movie-input')}
                            className="w-full md:w-1/2 outline-none main-border px-2 py-1"
                        />
                    </div>

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
                            1024: {slidesPerView: 6, spaceBetween: 30},
                        }}
                    >
                        {movieItems.map((item, i) => (
                            <SwiperSlide key={i}>
                                <MovieCard {...item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 pt-5">
                    <div>
                        <div className="relative">
                            <Image src="/poster.webp" alt="poster"
                                   width={300}
                                   height={500}
                                   className="aspect-2/3 w-full object-cover rounded-lg"/>
                            <div
                                className="absolute top-3 left-3 text-sm main-color rounded-xl w-fit px-3 py-1 text-white">6.3
                            </div>
                        </div>
                        <div className="text-lg text-center">Тест Драйв</div>
                    </div>
                    <div>
                        <div className="relative">
                            <Image src="/poster.webp" alt="poster"
                                   width={300}
                                   height={500}
                                   className="aspect-2/3 w-full object-cover rounded-lg"/>
                            <div
                                className="absolute top-3 left-3 text-sm main-color rounded-xl w-fit px-3 py-1 text-white">6.3
                            </div>
                        </div>
                        <div className="text-lg text-center">Тест Драйв</div>
                    </div>
                    <div>
                        <div className="relative">
                            <Image src="/poster.webp" alt="poster"
                                   width={300}
                                   height={500}
                                   className="aspect-2/3 w-full object-cover rounded-lg"/>
                            <div
                                className="absolute top-3 left-3 text-sm main-color rounded-xl w-fit px-3 py-1 text-white">6.3
                            </div>
                        </div>
                        <div className="text-lg text-center">Тест Драйв</div>
                    </div>
                    <div>
                        <div className="relative">
                            <Image src="/poster.webp" alt="poster"
                                   width={300}
                                   height={500}
                                   className="aspect-2/3 w-full object-cover rounded-lg"/>
                            <div
                                className="absolute top-3 left-3 text-sm main-color rounded-xl w-fit px-3 py-1 text-white">6.3
                            </div>
                        </div>
                        <div className="text-lg text-center">Тест Драйв</div>
                    </div>
                    <div>
                        <div className="relative">
                            <Image src="/poster.webp" alt="poster"
                                   width={300}
                                   height={500}
                                   className="aspect-2/3 w-full object-cover rounded-lg"/>
                            <div
                                className="absolute top-3 left-3 text-sm main-color rounded-xl w-fit px-3 py-1 text-white">6.3
                            </div>
                        </div>
                        <div className="text-lg text-center">Тест Драйв</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const movieItems = [
    {title: "All movie", icon: RiMovie2Line},
    {title: "Комедия", icon: FaRegFaceLaughSquint},
    {title: "Драма", icon: LuDrama},
    {title: "Мелодрама", icon: TbHeartBroken},
    {title: "Фантастика", icon: ImMagicWand},
    {title: "Детективы", icon: PiDetectiveFill},
    {title: "Военные", icon: PiMedalMilitaryFill},
    {title: "Для детей", icon: MdOutlineChildCare},
];

function MovieCard({title, icon: Icon}: { title: string; icon: React.ElementType }) {
    return (
        <Link href="#" className="flex flex-col items-center">
        <div
                className="w-20 h-20 md:w-24 md:h-24 flex flex-col items-center justify-center main-color rounded-full">
                <Icon className="text-5xl md:text-6xl text-white"/>
            </div>
            <div className="text-md md:text-lg text-center font-semibold">
                {title}
            </div>
        </Link>
    );
}


export default Movie;
