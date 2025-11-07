'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PdfViewer from '@/components/Books/PdfViewer';
import {useLocale} from "next-intl";

interface Book {
    id: number;
    title_tk: string;
    title_en: string;
    title_ru: string;
    poster: string;
    path: string;
}

export default function BookPage() {
    const { id } = useParams();
    const locale = useLocale();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        fetch('/data/books.json')
            .then((res) => res.json())
            .then((data: Book[]) => {
                const found = data.find((b) => b.id === Number(id));
                setBook(found || null);
            });
    }, [id]);

    const getTitle = (book: Book) => {
        switch (locale) {
            case 'ru':
                return book.title_ru || book.title_tk;
            case 'en':
                return book.title_en || book.title_tk;
            default:
                return book.title_tk;
        }
    };

    if (!book) return <div className="p-10 text-center">Загрузка...</div>;

    return (
        <div className="pt-20 bg-gray-50 min-h-screen flex flex-col">
            <div className="container mx-auto px-4 flex-1 flex flex-col">
                <h1 className="text-2xl font-semibold mb-4">{getTitle(book)}</h1>
                <div className="flex-1">
                    <PdfViewer fileUrl={book.path}/>
                </div>
            </div>
        </div>

    );
}
