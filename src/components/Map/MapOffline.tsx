'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

export default function MapOffline() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const MapWithNoSSR = dynamic(
        async () => {
            const { MapContainer, TileLayer } = await import('react-leaflet');
            const L = await import('leaflet');

            const position: [number, number] = [38.9697, 59.5563]; // Ашхабад

            const MapComponent = () => (
                <MapContainer
                    center={position}
                    zoom={6}
                    style={{ width: '100%', height: '100%' }}
                    zoomControl={false}
                    attributionControl={false}
                >
                    <TileLayer
                        url="/maps/turkmenistan/{z}/{x}/{y}.png"
                        minZoom={5}
                        maxZoom={10}
                        noWrap={true}
                        tileSize={256}
                    />
                </MapContainer>
            );
            return MapComponent;
        },
        { ssr: false }
    );

    if (!isClient) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-500">
                Загрузка карты...
            </div>
        );
    }

    return (
        <div className="w-full h-screen">
            <MapWithNoSSR />
        </div>
    );
}
