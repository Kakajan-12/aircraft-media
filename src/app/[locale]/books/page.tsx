import Image from "next/image";

const Books = () => {
    return (
        <div className="bg-white rounded-tr-xl rounded-tl-xl w-full mt-18 pb-14">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4">
                    <div>
                        <div className="w-full aspect-2/3">
                            <Image src="/books/journal.jpg" alt="photo"
                                   width={400}
                                   height={600}
                                   className="w-full aspect-2/3 object-contain"/>
                        </div>
                        <div className="text-md leading-5 font-seemibold pt-3">«LAÇYN» - «TÜRKMENISTAN»
                            AWIAKOMPANIÝASYNYŇ BORT BUKLETI № 1
                        </div>
                    </div>
                    <div>
                        <div className="w-full aspect-2/3">
                            <Image src="/books/journal.jpg" alt="photo"
                                   width={500}
                                   height={500}
                                   className="w-full aspect-2/3 object-contain"/>
                        </div>
                        <div className="text-md leading-5 font-seemibold pt-3">«LAÇYN» - «TÜRKMENISTAN»
                            AWIAKOMPANIÝASYNYŇ BORT BUKLETI № 1
                        </div>
                    </div>
                    <div>
                        <div className="w-full aspect-2/3">
                            <Image src="/books/journal.jpg" alt="photo"
                                   width={500}
                                   height={500}
                                   className="w-full aspect-2/3 object-contain"/>
                        </div>
                        <div className="text-md leading-5 font-seemibold pt-3">«LAÇYN» - «TÜRKMENISTAN»
                            AWIAKOMPANIÝASYNYŇ BORT BUKLETI № 1
                        </div>
                    </div>
                    <div>
                        <div className="w-full aspect-2/3">
                            <Image src="/books/journal.jpg" alt="photo"
                                   width={500}
                                   height={500}
                                   className="w-full aspect-2/3 object-contain"/>
                        </div>
                        <div className="text-md leading-5 font-seemibold pt-3">«LAÇYN» - «TÜRKMENISTAN»
                            AWIAKOMPANIÝASYNYŇ BORT BUKLETI № 1
                        </div>
                    </div>
                    <div>
                        <div className="w-full aspect-2/3">
                            <Image src="/books/journal.jpg" alt="photo"
                                   width={500}
                                   height={500}
                                   className="w-full aspect-2/3 object-contain"/>
                        </div>
                        <div className="text-md leading-5 font-seemibold pt-3">«LAÇYN» - «TÜRKMENISTAN»
                            AWIAKOMPANIÝASYNYŇ BORT BUKLETI № 1
                        </div>
                    </div>
                    <div>
                        <div className="w-full aspect-2/3">
                            <Image src="/books/journal.jpg" alt="photo"
                                   width={500}
                                   height={500}
                                   className="w-full aspect-2/3 object-contain"/>
                        </div>
                        <div className="text-md leading-5 font-seemibold pt-3">«LAÇYN» - «TÜRKMENISTAN»
                            AWIAKOMPANIÝASYNYŇ BORT BUKLETI № 1
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Books;