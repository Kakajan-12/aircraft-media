import MovieDetailsClient from '@/components/Movie/MovieDetailsClient';
import { Metadata } from 'next';

interface Params {
    id: string;
    locale: string;
}

export default async function MoviePage({ params }: { params: Promise<Params> }) {
    const { id, locale } = await params;

    const res = await fetch("http://localhost:3000/data/movie.json", { cache: "no-store" });
    const movies = await res.json();
    const movie = movies.find((m: any) => m.id === Number(id));

    if (!movie) return <div className="p-10">Фильм не найден</div>;

    return <MovieDetailsClient movie={movie} />;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { id, locale } = await params;

    return {
        title: `Movie ${id}`,
    };
}