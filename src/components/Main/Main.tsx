import {useTranslations} from "next-intl";
import Link from "next/link";
import Image from "next/image";

const Main = () => {
    const t = useTranslations('Main')
    const h = useTranslations('Header')
    return (
        <div className="relative bg-white rounded-tr-xl rounded-tl-xl w-full min-h-[calc(100vh-70px)]">
            <div className="container mx-auto px-4">
                <div className="mt-[70px] py-4">
                    <div className="flex flex-col lg:flex-row justify-between items-center ">
                        <div className="flex flex-col mb-5">
                            <h1 className="font-semibold text-xl lg:text-4xl leading-6 lg:leading-9"><span
                                className="main-text lg:block">{t('aviacompany')}</span> <span className="lg:text-3xl">{t('main-title')}</span></h1>
                            <p className="hidden lg:block lg:pt-2 text-gray-500 text-sm">{t('main-text')}</p>
                        </div>
                        <div
                            className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row w-full space-x-4 justify-center lg:py-30 lg:px-20 relative xl:w-fit ">
                            <div className="absolute inset-0 hidden lg:block">
                                <Image src="/main/main1.svg" alt="aircraft"
                                width={500}
                                height={400}
                                className="absolute top-10 w-72 -left-10"/>
                            </div>
                            <div className="absolute h-full -right-10 hidden lg:block w-full overflow-hidden">
                                <Image src="/main/main2.svg" alt="aircraft"
                                width={500}
                                height={400}
                                className="absolute w-72 h-72 bottom-70 -right-12 "/>
                            </div>
                            <div className="flex flex-col space-y-4 w-full lg:w-fit lg:pt-10">
                                <Link href="/movie" className="lg:w-fit">
                                    <div className="relative w-full aspect-3/2 lg:w-56 rounded-md">
                                        <div className="absolute inset-0 p-4">
                                            <div
                                                className="font-semibold text-xl z-20 relative text-white">{h('movie')}</div>
                                            <div
                                                className="absolute inset-0 bg-gradient-to-b from-green-700/70 via-green-700/30 to-transparent rounded-md"></div>
                                        </div>
                                        <Image src="/main/movie.png" alt="movie"
                                               width={600}
                                               height={400}
                                               className="aspect-3/2 w-full object-cover"/>
                                    </div>
                                </Link>
                                <Link href="/music" className="lg:w-fit">
                                    <div className="relative w-full aspect-3/2 lg:w-56 rounded-md">
                                        <div className="absolute inset-0 p-4">
                                            <div
                                                className="font-semibold text-xl z-20 relative text-white">{h('music')}</div>
                                        </div>
                                        <div
                                            className="absolute inset-0 bg-gradient-to-b from-green-700/70 via-green-700/30 to-transparent rounded-md"></div>
                                        <Image src="/main/music.jpg" alt="music"
                                               width={600}
                                               height={400}
                                               className="aspect-3/2 w-full object-cover"/>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex flex-col space-y-4 w-full lg:w-fit">
                                <Link href="/books" className="lg:w-fit">
                                    <div className="relative w-full aspect-3/2 lg:w-56 rounded-md">
                                        <div className="absolute inset-0 p-4">
                                            <div
                                                className="font-semibold text-xl z-20 relative text-white">{h('books')}</div>
                                        </div>
                                        <div
                                            className="absolute inset-0 bg-gradient-to-b from-green-700/70 via-green-700/30 to-transparent rounded-md"></div>
                                        <Image src="/main/books.jpg" alt="books"
                                               width={600}
                                               height={400}
                                               className="aspect-3/2 w-full object-cover"/>
                                    </div>
                                </Link>
                                <Link href="/map" className="lg:w-fit">
                                    <div className="relative w-full aspect-3/2 lg:w-56 rounded-md">
                                        <div className="absolute inset-0 p-4">
                                            <div
                                                className="font-semibold text-xl z-20 relative text-white">{h('navigation')}</div>
                                        </div>
                                        <div
                                            className="absolute inset-0 bg-gradient-to-b from-green-700/70 via-green-700/30 to-transparent rounded-md"></div>
                                        <Image src="/main/map.png" alt="navigation"
                                               width={600}
                                               height={400}
                                               className="aspect-3/2 w-full object-cover"/>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Main