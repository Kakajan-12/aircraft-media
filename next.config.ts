
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const isDev = process.env.NODE_ENV === 'development';

// Всё (видео, музыка, PDF, тайлы карты, шрифты) отдаётся с того же сервера,
// поэтому внешние источники не разрешены.
// 'unsafe-inline' нужен для инлайн-скриптов Next.js и инлайн-стилей Leaflet/Swiper.
const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "media-src 'self' blob:",
    "font-src 'self' data:",
    `connect-src 'self'${isDev ? ' ws: wss:' : ''}`,
    // PDF книг встраивается через PDFObject (iframe/embed с того же origin)
    "frame-src 'self'",
    "object-src 'self'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
].join('; ');

const securityHeaders = [
    { key: 'Content-Security-Policy', value: csp },
    // SAMEORIGIN, а не DENY: иначе PDF не откроется во встроенном просмотрщике
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

const nextConfig: NextConfig = {
    allowedDevOrigins: ['localhost', '127.0.0.1', '192.168.1.*'],
    poweredByHeader: false,
    // Офлайн-система с локальными картинками: оптимизатор не нужен,
    // а у /_next/image были DoS-уязвимости (дисковый кэш, SVG).
    images: {
        unoptimized: true,
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
