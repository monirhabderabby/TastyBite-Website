"use client";

import {
    useCreateLocationMutation,
    useUpdateLocationMutation,
} from "@/redux/features/user/userApi";
import { TAddress } from "@/types";
import { useUser } from "@clerk/nextjs";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddressForm from "./address-form";
import Map from "./map";

export function AddressInput({
    editingAddress,
    setEditingAddress,
    setIsAddingNew,
}: {
    editingAddress: TAddress | null;
    setEditingAddress: (editingAddress: TAddress | null) => void;
    setIsAddingNew: (isAddingNew: boolean) => void;
}) {
    const [name, setName] = useState<string>(editingAddress?.name || "");
    const [address, setAddress] = useState<TAddress>({
        streetAndNumber: "",
        place: "",
        region: "",
        postcode: "",
        country: "",
        latitude: 0,
        longitude: 0,
    });

    const { user } = useUser();

    const [createLocation, { isLoading, isSuccess }] =
        useCreateLocationMutation();
    const [
        updateLocation,
        { isLoading: updateLoading, isSuccess: updateSuccess },
    ] = useUpdateLocationMutation();

    const handleFormSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        const updatePayload = {
            name: name,
            user: user?.id,
            streetAndNumber: address.streetAndNumber,
            place: address.place,
            region: address.region,
            postcode: address.postcode,
            country: address.country,
            latitude: address.latitude,
            longitude: address.longitude,
        };

        if (!name) {
            toast.error("Please, provide name of address.");
            return;
        }
        if (address.streetAndNumber) {
            if (editingAddress) {
                updateLocation({
                    id: editingAddress._id,
                    body: updatePayload,
                });
            } else {
                createLocation({
                    name,
                    ...address,
                    user: user?.id,
                });
            }
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

    useEffect(() => {
        if (isSuccess) {
            toast.success("Address created successfully.");
            setName("");
            setAddress({
                streetAndNumber: "",
                place: "",
                region: "",
                postcode: "",
                country: "",
                latitude: 0,
                longitude: 0,
            });
            setIsAddingNew(false);
        }
    }, [isSuccess, setIsAddingNew]);

    useEffect(() => {
        if (updateSuccess) {
            toast.success("Address updated successfully.");
            setName("");
            setAddress({
                streetAndNumber: "",
                place: "",
                region: "",
                postcode: "",
                country: "",
                latitude: 0,
                longitude: 0,
            });
            setEditingAddress(null);
        }
    }, [updateSuccess, setEditingAddress]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:gap-x-10">
            <AddressForm
                onSubmit={handleFormSubmit}
                address={address}
                setAddress={setAddress}
                name={name}
                setName={setName}
                isLoading={isLoading}
                updateLoading={updateLoading}
                editingAddressName={editingAddress?.name}
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
