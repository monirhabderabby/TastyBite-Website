"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMapGl, { Marker, MarkerDragEvent, ViewState } from "react-map-gl";
import PointerIcon from "../../../../../public/icon/pointer.svg";

interface MapProps {
    longitude: number;
    latitude: number;
    updateCoordinates: (latitude: number, longitude: number) => void;
}

const Map: React.FC<MapProps> = ({
    longitude,
    latitude,
    updateCoordinates,
}) => {
    const [viewport, setViewport] = useState<ViewState>({
        latitude,
        longitude,
        zoom: 16,
        bearing: 0,
        pitch: 0,
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
    });

    const [marker, setMarker] = useState({
        latitude,
        longitude,
    });

    useEffect(() => {
        setViewport((oldViewport) => ({
            ...oldViewport,
            latitude,
            longitude,
        }));
    }, [latitude, longitude]);

    const handleMarkerDrag = (event: MarkerDragEvent) => {
        const { lat, lng } = event.lngLat;
        setMarker({ latitude: lat, longitude: lng });
        updateCoordinates(lat, lng);
    };

    return (
        <div className="">
            <ReactMapGl
                {...viewport}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/monirhrabby/cm4ds3u3d01oz01r245wxa9fq"
                onMove={(event) => {
                    setViewport(event.viewState);
                }}
            >
                <Marker
                    latitude={marker.latitude}
                    longitude={marker.longitude}
                    draggable={true}
                    onDragEnd={handleMarkerDrag}
                >
                    <Image
                        className="marker"
                        src={PointerIcon}
                        alt="Marker"
                        width={30}
                        height={30}
                    />
                </Marker>
            </ReactMapGl>
        </div>
    );
};

export default Map;
