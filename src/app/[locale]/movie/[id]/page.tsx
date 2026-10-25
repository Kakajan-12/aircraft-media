import MovieDetailsClient from '@/components/Movie/MovieDetailsClient';
import { Metadata } from 'next';
import { readFile } from 'fs/promises';
import path from 'path';

interface Params {
    id: string;
    locale: string;
}

async function getMovies() {
    const file = await readFile(path.join(process.cwd(), 'public/data/movie.json'), 'utf-8');
    return JSON.parse(file);
}

export default async function MoviePage({ params }: { params: Promise<Params> }) {
    const { id } = await params;

    const movies = await getMovies();
    const movie = movies.find((m: any) => m.id === Number(id));

    if (!movie) return <div className="p-10">Фильм не найден</div>;

    return <MovieDetailsClient movie={movie} />;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { id } = await params;

    return {
        title: `Movie ${id}`,
    };
}
