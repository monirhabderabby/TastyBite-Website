import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { TAddress } from "@/types";

interface Props {
    deliveryLocation: string | undefined;
    setDeliveryLocation: (deliveryLocation: string | undefined) => void;
}

const LocationSelector = ({ deliveryLocation, setDeliveryLocation }: Props) => {
    const addresses: TAddress[] = [
        {
            _id: "1",
            country: "Australia",
            latitude: -37.671811500000004,
            longitude: 144.846079,
            name: "Home",
            place: "Melbourne",
            postcode: "3045",
            region: "Victoria",
            streetAndNumber: "Melbourne Airport (MEL)",
        },
        {
            _id: "2",
            country: "United Kingdom",
            latitude: 53.335612,
            longitude: -2.852171,
            name: "Office",
            place: "Liverpool",
            postcode: "L24 1YD",
            region: "England",
            streetAndNumber: "Liverpool John Lennon Airport (LPL)",
        },
        {
            _id: "3",
            country: "United Kingdom",
            latitude: 53.335612,
            longitude: -2.852171,
            name: "Hostel",
            place: "Liverpool",
            postcode: "L24 1YD",
            region: "England",
            streetAndNumber: "Liverpool John Lennon Airport (LPL)",
        },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-2 mb-6">
            {addresses.map((address: TAddress) => (
                <Card
                    key={address._id}
                    className={cn(
                        "relative transition-colors duration-200",
                        deliveryLocation === address._id && "border-primary"
                    )}
                >
                    <CardContent className="p-6">
                        <div className="absolute right-4 top-4">
                            <Checkbox
                                id={`address-${address._id}`}
                                checked={deliveryLocation === address._id}
                                onCheckedChange={() =>
                                    setDeliveryLocation(address._id)
                                }
                                className="transition-transform duration-200 data-[state=checked]:scale-110"
                            />
                        </div>
                        <label
                            htmlFor={`address-${address._id}`}
                            className="grid gap-1 cursor-pointer"
                        >
                            <div className="text-lg font-medium">
                                {address.name}
                            </div>
                            <div className="text-base text-muted-foreground">
                                {address.streetAndNumber}
                                <br />
                                {address.place}, {address.region}{" "}
                                {address.postcode}, <br /> {address.country}
                            </div>
                        </label>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default LocationSelector;
