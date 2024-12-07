"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useGetLocationByUserQuery } from "@/redux/features/user/userApi";
import { TAddress } from "@/types";
import { useUser } from "@clerk/nextjs";

interface Props {
    deliveryLocation: string | undefined;
    setDeliveryLocation: (deliveryLocation: string | undefined) => void;
}

const LocationSelector = ({ deliveryLocation, setDeliveryLocation }: Props) => {
    const { user } = useUser();

    const { data, isLoading, isSuccess, isError } = useGetLocationByUserQuery(
        user?.id
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-2 mb-6">
            {!isLoading &&
                !isError &&
                isSuccess &&
                data?.data.map((address: TAddress) => (
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
