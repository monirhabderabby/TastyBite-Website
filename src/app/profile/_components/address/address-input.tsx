"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import AddressForm from "./address-form";
import Map from "./map";

export type TAddress = {
    streetAndNumber: string;
    place: string;
    region: string;
    postcode: string;
    country: string;
    latitude: number;
    longitude: number;
};

export function AddressInput() {
    const [address, setAddress] = useState<TAddress>({
        streetAndNumber: "",
        place: "",
        region: "",
        postcode: "",
        country: "",
        latitude: 0,
        longitude: 0,
    });

    const handleFormSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        if (address.streetAndNumber) {
            console.log("Selected address:", address);
        }
    };

    const updateCoordinates = (latitude: number, longitude: number) => {
        setAddress({ ...address, latitude, longitude });
    };

    return (
        <div className="grid grid-cols-2 gap-x-10">
            <AddressForm
                onSubmit={handleFormSubmit}
                address={address}
                setAddress={setAddress}
            />
            {address.longitude && address.latitude && (
                <Map
                    longitude={address.longitude}
                    latitude={address.latitude}
                    updateCoordinates={updateCoordinates}
                />
            )}
        </div>
    );
}
