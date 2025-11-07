'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Book {
    id: number;
    title_tk: string;
    title_en: string;
    title_ru: string;
    poster: string;
    path: string;
}

const Books = () => {
    const t = useTranslations('Books');
    const locale = useLocale();
    const [books, setBooks] = useState<Book[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Определяем, мобильное ли устройство
        const mobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
            navigator.userAgent
        );
        setIsMobile(mobile);

        // Загружаем список книг
        fetch('/data/books.json')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to load books.json');
                return res.json();
            })
            .then(setBooks)
            .catch((err) => console.error(err));
    }, []);

    // функция для выбора правильного перевода
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

    // обработчик клика
    const handleBookClick = (book: Book, e: React.MouseEvent) => {
        if (isMobile) {
            e.preventDefault(); // отменяем переход
            window.open(book.path, '_blank'); // открываем PDF в новой вкладке
        }
    };

    return (
        <div className="bg-white rounded-t-xl w-full mt-18 pb-14">
            <div className="container mx-auto px-4">
                <h2 className="hidden sm:block text-lg lg:text-2xl font-semibold pt-5">
                    {t('title')}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4">
                    {books.length > 0 ? (
                        books.map((book) => (
                            <Link
                                href={`/books/${book.id}`}
                                key={book.id}
                                onClick={(e) => handleBookClick(book, e)}
                            >
                                <div className="w-full aspect-[2/3] relative">
                                    <Image
                                        src={book.poster}
                                        alt={getTitle(book)}
                                        width={400}
                                        height={600}
                                        className="w-full h-full object-contain rounded-lg"
                                    />
                                </div>
                                <div className="text-md leading-5 font-semibold pt-3">
                                    {getTitle(book)}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div>
                            <div className="w-full aspect-[2/3] relative">
                                <Image
                                    src="/books/journal.jpg"
                                    alt="photo"
                                    width={400}
                                    height={600}
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </div>
                            <div className="text-md leading-5 font-semibold pt-3">
                                «LAÇYN» – «TÜRKMENISTAN» AWIAKOMPANIÝASYNYŇ BORT BUKLETI №1
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Books;
