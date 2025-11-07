'use client';
import { useEffect, useRef } from 'react';
import PDFObject from 'pdfobject';

interface PdfViewerProps {
    fileUrl: string;
}

export default function PdfViewer({ fileUrl }: PdfViewerProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            PDFObject.embed(fileUrl, ref.current, {
                pdfOpenParams: {
                    view: 'FitH',
                    scrollbar: 0,
                    toolbar: 0,
                    statusbar: 0,
                    messages: 0,
                    navpanes: 0,
                },
            });
        }
    }, [fileUrl]);

    return (
        <div className="w-full h-[calc(100vh-8rem)] bg-white overflow-hidden relative">
            <div
                ref={ref}
                className="absolute inset-0 w-full h-full overflow-hidden pdf-container"

            />
        </div>
    );
}
