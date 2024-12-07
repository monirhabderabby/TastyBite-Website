import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

import { TAddress } from "@/types";
import { Loader } from "lucide-react";
import AutoCompleteInput from "./auto-complete-input";

interface AddressFormProps {
    address: TAddress;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    setAddress: (address: TAddress) => void;
    name: string;
    setName: (name: string) => void;
    isLoading: boolean;
    updateLoading: boolean;
    editingAddressName: string | undefined;
}

export default function AddressForm({
    address,
    onSubmit,
    setAddress,
    name,
    setName,
    isLoading,
    updateLoading,
    editingAddressName,
}: AddressFormProps) {
    const handleManualInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        stateProperty: keyof TAddress
    ) => {
        const newAddress = { ...address };
        newAddress[stateProperty] = event.target.value as never;

        setAddress(newAddress);
    };

    return (
        <form
            className="space-y-2 md:space-y-1 lg:space-y-2"
            onSubmit={onSubmit}
        >
            <div className="space-y-1">
                <label htmlFor="name" className="text-sm">
                    Location Name
                </label>
                <Input
                    type="text"
                    id="name"
                    placeholder="Ex: Home or, Office"
                    defaultValue={editingAddressName || name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="address" className="text-sm">
                    Address
                </label>
                <AutoCompleteInput
                    setAddress={setAddress}
                    handleManualInputChange={handleManualInputChange}
                    streetAndNumber={address.streetAndNumber}
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="city" className="text-sm">
                    City
                </label>
                <Input
                    type="text"
                    id="city"
                    placeholder="City"
                    value={address.place}
                    onChange={(event) =>
                        handleManualInputChange(event, "place")
                    }
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="state" className="text-sm">
                    State/Province/Region
                </label>
                <Input
                    type="text"
                    id="state"
                    placeholder="State/Province/Region"
                    value={address.region}
                    onChange={(event) =>
                        handleManualInputChange(event, "region")
                    }
                />
            </div>
            <div className="grid md:grid-cols-2 gap-x-2">
                <div className="space-y-1">
                    <label htmlFor="postcode" className="text-sm">
                        Postcode
                    </label>
                    <Input
                        type="text"
                        id="postcode"
                        placeholder="Postcode"
                        value={address.postcode}
                        onChange={(event) =>
                            handleManualInputChange(event, "postcode")
                        }
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="country" className="text-sm">
                        Country
                    </label>
                    <Input
                        type="text"
                        id="country"
                        placeholder="Country"
                        value={address.country}
                        onChange={(event) =>
                            handleManualInputChange(event, "country")
                        }
                    />
                </div>
            </div>

            <div className="flex items-center gap-x-2 pt-2">
                <Button
                    type="submit"
                    className="confirm-button"
                    disabled={isLoading || updateLoading}
                >
                    Confirm
                    {(isLoading || updateLoading) && (
                        <Loader className="w-4 h-4 animate-spin" />
                    )}
                </Button>
                <Button
                    type="reset"
                    className="px-5"
                    variant="outline"
                    onClick={() =>
                        setAddress({
                            streetAndNumber: "",
                            place: "",
                            region: "",
                            postcode: "",
                            country: "",
                            latitude: 0,
                            longitude: 0,
                        })
                    }
                >
                    Reset
                </Button>
            </div>
        </form>
    );
}
