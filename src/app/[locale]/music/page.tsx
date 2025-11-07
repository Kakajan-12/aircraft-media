'use client'

import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import clsx from 'clsx';
import { FaPlay } from "react-icons/fa6";

interface MusicItem {
    id: number;
    title: string;
    artist: string;
    photo: string;
    path: string;
}

export default function Music() {
    const t = useTranslations('Music');
    const [music, setMusic] = useState<MusicItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [startY, setStartY] = useState(0);
    const [swipeY, setSwipeY] = useState(0);
    const [searchTerm, setSearchTerm] = useState(''); // 🔍 добавили поиск

    const [isDesktop, setIsDesktop] = useState<boolean>(false);

    useEffect(() => {
        fetch('/data/music.json')
            .then(res => res.json())
            .then((data) => {
                const musicData = Array.isArray(data) ? data : data.music;
                setMusic(musicData || []);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)');
        const handle = (e: MediaQueryListEvent | MediaQueryList) => {
            // @ts-ignore
            setIsDesktop(typeof e.matches === 'boolean' ? e.matches : mq.matches);
        };

        handle(mq);
        if ('addEventListener' in mq) {
            mq.addEventListener('change', handle as EventListener);
        } else {
            // @ts-ignore
            mq.addListener(handle);
        }

        return () => {
            if ('removeEventListener' in mq) {
                mq.removeEventListener('change', handle as EventListener);
            } else {
                // @ts-ignore
                mq.removeListener(handle);
            }
        };
    }, []);

    const playTrack = (i: number) => {
        setCurrentIndex(i);
        setMobileOpen(true);
    };

    const playNext = () => {
        if (!music.length) return;
        setCurrentIndex((prev) => (prev + 1) % music.length);
    };

    const playPrev = () => {
        if (!music.length) return;
        setCurrentIndex((prev) => (prev - 1 + music.length) % music.length);
    };

    const currentTrack = currentIndex >= 0 ? music[currentIndex] : null;

    // 🔍 фильтруем список по названию или исполнителю
    const filteredMusic = music.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-tr-xl rounded-tl-xl w-full mt-18 pb-14 relative">
            <div className="container mx-auto px-4">
                <div className="py-2">
                    <div className="flex items-center justify-between space-x-2">
                        <div className="hidden sm:block text-md lg:text-xl font-semibold text-nowrap">
                            {t('music')}
                        </div>

                        {/* 🔍 Поле поиска */}
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={t('music-input')}
                            className="w-full md:w-1/2 outline-none main-border px-2 py-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Grid */}
                    <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-4">
                        {filteredMusic.length > 0 ? (
                            filteredMusic.map((item, i) => (
                                <MusicCard key={item.id} {...item} onPlay={() => playTrack(i)} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-10">
                                {t('no-results') || 'Ничего не найдено'}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ======= Десктопный плеер ======= */}
            {currentTrack && isDesktop && (
                <div className="mt-6 overflow-hidden fixed bottom-0 w-full main-color">
                    <AudioPlayer
                        className="music-player"
                        src={currentTrack.path}
                        autoPlay
                        showJumpControls={false}
                        showSkipControls={true}
                        onClickNext={playNext}
                        onClickPrevious={playPrev}
                        onEnded={playNext}
                    />
                    <div className="text-center my-2 font-medium text-white">
                        {currentTrack.artist} — {currentTrack.title}
                    </div>
                </div>
            )}

            {/* ======= Мини-панель на мобильных ======= */}
            {currentTrack && (
                <div
                    className="fixed bottom-0 left-0 w-full main-color text-white flex md:hidden
                     items-center p-2 z-40"
                    onClick={() => setMobileOpen(true)}
                >
                    <img src={currentTrack.photo} alt={currentTrack.title}
                         className="w-12 h-12 rounded mr-2" />
                    <div className="flex-1 truncate">
                        <div className="font-medium truncate">{currentTrack.title}</div>
                        <div className="text-xs text-gray-300 truncate">{currentTrack.artist}</div>
                    </div>
                    <button className="p-2 text-white rounded-full border-white border-2 flex justify-center items-center">
                        <FaPlay />
                    </button>
                </div>
            )}

            {/* ======= Полноэкранный мобильный плеер ======= */}
            {currentTrack && !isDesktop && (
                <div
                    className={clsx(
                        "fixed bottom-10 left-0 w-full h-[90vh] bg-neutral-900 text-white z-50 transition-transform duration-300 md:hidden",
                        mobileOpen ? "translate-y-0" : "translate-y-full"
                    )}
                    onTouchStart={(e) => setStartY(e.touches[0].clientY)}
                    onTouchMove={(e) => {
                        const diff = e.touches[0].clientY - startY;
                        if (diff > 0) setSwipeY(diff);
                    }}
                    onTouchEnd={() => {
                        if (swipeY > 100) setMobileOpen(false);
                        setSwipeY(0);
                    }}
                    style={{
                        transform: `translateY(${mobileOpen ? swipeY : 0}px)`,
                        transition: swipeY > 0 ? "none" : "transform 0.3s ease"
                    }}
                >
                    <div className="flex justify-center mt-2">
                        <div className="w-12 h-1.5 bg-white rounded-full mt-2"></div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <img
                            src={currentTrack.photo}
                            alt={currentTrack.title}
                            className="w-64 h-64 rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="text-center mt-4 px-4">
                        <div className="text-lg font-semibold truncate">{currentTrack.title}</div>
                        <div className="text-sm text-gray-400 truncate">{currentTrack.artist}</div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full">
                        <AudioPlayer
                            className="music-player"
                            src={currentTrack.path}
                            autoPlay
                            showJumpControls={false}
                            showSkipControls={true}
                            onClickNext={playNext}
                            onClickPrevious={playPrev}
                            onEnded={playNext}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

function MusicCard({
                       title, artist, photo, onPlay
                   }: MusicItem & { onPlay: () => void }) {
    return (
        <div
            className="flex flex-col items-center shadow rounded-md cursor-pointer hover:scale-105 transition"
            onClick={onPlay}
        >
            <Image
                src={photo}
                alt={title}
                width={200}
                height={200}
                className="w-full rounded-t-md object-cover"
            />
            <div className="w-full px-2 py-1 text-sm text-center truncate">{title}</div>
            <div className="w-full px-2 pb-2 text-xs text-gray-600 text-center truncate">{artist}</div>
        </div>
    )
}
