'use client'
import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { useTranslations } from 'next-intl';

interface Movie {
    id: number
    title: string
    description: string
    path: string
    rating: number
    ageLimit: string
    genre: string
    year: number
    duration: number
    director: string
    language: string
}

export default function MovieDetailsClient({ movie }: { movie: Movie }) {
    const t = useTranslations('Movie');
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<any>(null);

    useEffect(() => {
        if (!playerRef.current && videoRef.current) {
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                responsive: true,
                fluid: true,
                preload: 'auto',
                sources: [{ src: movie.path, type: 'video/mp4' }],
            });
        }
        if (playerRef.current) {
            playerRef.current.src({ src: movie.path, type: 'video/mp4' });
        }

        return () => {
        };
    }, [movie.path]);

    return (
        <div className="bg-white rounded-tr-xl rounded-tl-xl w-full mt-18 pb-14">
            <div className="container mx-auto px-4">
                <div className="py-2">
                    <div data-vjs-player className="w-full max-w-[1200px] mx-auto">
                        <video ref={videoRef} className="video-js w-full mt-6 rounded-lg" />
                    </div>

                    <div className="flex flex-col lg:flex-row pt-4 space-y-3 lg:space-x-3 lg:justify-between">
                        <div className="space-y-2">
                            <h2 className="text-md font-bold mb-4 lg:text-lg xl:text-xl">{movie.title}</h2>
                            <div className="flex items-center space-x-2">
                                <div className="text-md main-color rounded-xl w-fit px-3 py-1 text-white">{movie.rating}</div>
                                <div className="border-2 rounded-full w-10 h-10 flex items-center justify-center">{movie.ageLimit}</div>
                            </div>
                            <div>{movie.genre}</div>
                            <div className="flex space-x-2">
                                <div>
                                    <div className="text-gray-500 text-md">{t('year')}</div>
                                    <div className="text-gray-500 text-md">{t('duration')}</div>
                                    <div className="text-gray-500 text-md">{t('director')}</div>
                                    <div className="text-gray-500 text-md">{t('lang')}</div>
                                    <div className="text-gray-500 text-md">{t('genre-page')}</div>
                                </div>
                                <div>
                                    <div className="text-md">{movie.year}</div>
                                    <div className="text-md">{movie.duration}</div>
                                    <div className="text-md">{movie.director}</div>
                                    <div className="text-md">{movie.language}</div>
                                    <div className="text-md">{movie.genre}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-500 text-md">{t('description')}</div>
                            <p className="pt-1 font-semibold text-md">{movie.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
