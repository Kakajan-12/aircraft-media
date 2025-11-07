'use client'
import dynamic from 'next/dynamic';
import Image from "next/image";

const MapOffline = dynamic(() => import('@/components/Map/MapOffline'), {ssr: false});

const Navigation = () => {
    return (
        <div className="bg-white">
            <div className="container pt-18 mx-auto px-4">
                <div className="flex items-center justify-between space-x-2 py-2">
                    <div className="text-gray-500 font-semibold text-lg sm:text-2xl">ASB</div>
                    <div className="relative w-full">
                        <div className="h-1 rounded-full w-full bg-gray-300"></div>
                        <Image src="/air1.svg" alt="airplane"
                               width={70}
                               height={70}
                               className="absolute airplane w-8 sm:w-12"
                        />
                    </div>
                    <div className="text-gray-500 font-semibold text-lg sm:text-2xl">TAZ</div>
                </div>
            </div>
            <MapOffline/>
        </div>


    )
}

export default Navigation;