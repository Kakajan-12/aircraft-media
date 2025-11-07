'use client';

import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import clsx from "clsx";

interface MusicItem {
    id: number;
    title: string;
    artist: string;
    photo: string;
    path: string;
}

interface Props {
    music: MusicItem[];
}

export default function MobileMusicPlayer({ music }: Props) {
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);

    const playTrack = (index: number) => {
        setCurrentIndex(index);
        setIsPlayerOpen(true);
    };

    const playNext = () => {
        setCurrentIndex((i) => (i + 1) % music.length);
    };

    const playPrev = () => {
        setCurrentIndex((i) => (i - 1 + music.length) % music.length);
    };

    const currentTrack = currentIndex >= 0 ? music[currentIndex] : null;

    return (
        <div className="relative">
            {/* ======== Список треков ======== */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {music.map((track, i) => (
                    <button
                        key={track.id}
                        onClick={() => playTrack(i)}
                        className="p-3 border rounded shadow-sm text-left hover:bg-gray-100"
                    >
                        <img
                            src={track.photo}
                            alt={track.title}
                            className="w-full h-32 object-cover rounded mb-2"
                        />
                        <div className="font-medium truncate">{track.title}</div>
                        <div className="text-sm text-gray-600 truncate">{track.artist}</div>
                    </button>
                ))}
            </div>

            {/* ======== Мобильный плеер ======== */}
            {currentTrack && (
                <div
                    className={clsx(
                        "fixed bottom-0 left-0 w-full h-[70vh] bg-white z-50 shadow-2xl transition-transform duration-300 md:hidden",
                        isPlayerOpen ? "translate-y-0" : "translate-y-full"
                    )}
                >
                    {/* Шапка */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <div className="font-semibold">{currentTrack.artist}</div>
                        <button
                            onClick={() => setIsPlayerOpen(false)}
                            className="text-xl font-bold"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Обложка */}
                    <div className="flex justify-center mt-6">
                        <img
                            src={currentTrack.photo}
                            alt={currentTrack.title}
                            className="w-48 h-48 rounded-lg object-cover shadow-md"
                        />
                    </div>

                    {/* Название трека */}
                    <div className="text-center mt-4 px-4">
                        <div className="text-lg font-semibold truncate">{currentTrack.title}</div>
                        <div className="text-sm text-gray-600 truncate">{currentTrack.artist}</div>
                    </div>

                    {/* Сам плеер */}
                    <div className="absolute bottom-0 left-0 w-full">
                        <AudioPlayer
                            src={currentTrack.path}
                            autoPlay
                            showSkipControls
                            showJumpControls={false}
                            onClickNext={playNext}
                            onClickPrevious={playPrev}
                            onEnded={playNext}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
