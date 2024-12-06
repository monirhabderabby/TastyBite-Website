import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { TAddress } from "./address-input";
import AutoCompleteInput from "./auto-complete-input";

interface AddressFormProps {
    address: TAddress;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    setAddress: (address: TAddress) => void;
}

export default function AddressForm({
    address,
    onSubmit,
    setAddress,
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
        <form className="space-y-2" onSubmit={onSubmit}>
            <div className="space-y-1">
                <label htmlFor="address">Address</label>
                <AutoCompleteInput
                    setAddress={setAddress}
                    handleManualInputChange={handleManualInputChange}
                    streetAndNumber={address.streetAndNumber}
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="city">City</label>
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
                <label htmlFor="state">State/Province/Region</label>
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

            <div className="space-y-1">
                <label htmlFor="postcode">Postcode</label>
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
                <label htmlFor="country">Country</label>
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

            <div className="flex items-center gap-x-2">
                <Button type="submit" className="confirm-button">
                    Confirm
                </Button>
                <Button
                    type="reset"
                    className="reset-button"
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
