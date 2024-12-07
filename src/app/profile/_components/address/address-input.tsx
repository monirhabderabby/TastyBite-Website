"use client";

import { TAddress } from "@/types";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddressForm from "./address-form";
import Map from "./map";

export function AddressInput({
    editingAddress,
}: {
    editingAddress: TAddress | null;
}) {
    const [name, setName] = useState<string>("");
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

        if (!name) {
            toast.error("Please, provide name of address.");
            return;
        }
        if (address.streetAndNumber) {
            console.log("Selected address:", { name, ...address });
        }
    };

    const updateCoordinates = (latitude: number, longitude: number) => {
        setAddress({ ...address, latitude, longitude });
    };

    useEffect(() => {
        if (editingAddress) {
            setAddress(editingAddress);
        }
    }, [editingAddress]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:gap-x-10">
            <AddressForm
                onSubmit={handleFormSubmit}
                address={address}
                setAddress={setAddress}
                name={name}
                setName={setName}
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
