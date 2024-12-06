"use client";

import { Input } from "@/components/ui/input";
import getPlaces from "@/hooks/getPlaces";
import { ChangeEvent, useState } from "react";
import { TAddress } from "./address-input";

interface Suggestion {
    place_name: string;
    center: [number, number];
    context: Array<{ id: string; text: string }>;
}

interface AutoCompleteInputProps {
    handleManualInputChange: (
        event: ChangeEvent<HTMLInputElement>,
        stateProperty: keyof TAddress
    ) => void;
    setAddress: (address: TAddress) => void;
    streetAndNumber: string;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
    handleManualInputChange,
    setAddress,
    streetAndNumber,
}) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleManualInputChange(event, "streetAndNumber");
        handleInputChange(event.target.value);
    };

    const handleInputChange = async (query: string) => {
        const suggestions = await getPlaces(query);
        setSuggestions(suggestions);
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        const streetAndNumber = suggestion.place_name.split(",")[0];
        const latitude = suggestion.center[1];
        const longitude = suggestion.center[0];

        const address: TAddress = {
            streetAndNumber,
            place: "",
            region: "",
            postcode: "",
            country: "",
            latitude,
            longitude,
        };

        suggestion.context.forEach((element) => {
            const identifier = element.id.split(".")[0];

            if (identifier in address) {
                address[identifier as keyof TAddress] = element.text as never;
            }
        });

        setAddress(address);
        setSuggestions([]);
    };

    return (
        <div>
            <div className="relative">
                <Input
                    id="address"
                    type="text"
                    placeholder="Address"
                    value={streetAndNumber}
                    onChange={handleChange}
                    // className="w-full p-2 border rounded"
                />
                <ul className="absolute top-7 bg-white border border-black rounded overflow-hidden z-50 w-full p-0">
                    {suggestions?.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="list-none p-2 hover:bg-blue-800 hover:text-white cursor-pointer"
                        >
                            {suggestion.place_name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AutoCompleteInput;
