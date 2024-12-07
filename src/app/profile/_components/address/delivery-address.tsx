"use client";

import { Pencil, Plus, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { AddressInput } from "./address-input";

interface Address {
    id: string;
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
}

const DeliveryAddress = () => {
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Example addresses - in a real app, these would come from an API or database
    const addresses: Address[] = [
        {
            id: "1",
            name: "Home",
            street: "123 Main Street",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "United States",
            phone: "01956306002",
        },
        {
            id: "2",
            name: "Office",
            street: "456 Business Ave",
            city: "New York",
            state: "NY",
            zipCode: "10002",
            country: "United States",
            phone: "01956306003",
        },
    ];

    return (
        <div className="w-full mt-12">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Delivery Address
                    </h2>
                    <p className="text-sm text-gray-500">
                        Manage your delivery addresses here.
                    </p>
                </div>
                {!isAddingNew && (
                    <Button
                        className="gap-2"
                        onClick={() => setIsAddingNew(true)}
                    >
                        <Plus className="h-4 w-4" />
                        Add New Address
                    </Button>
                )}
            </div>

            {(isAddingNew || editingId) && (
                <Card className="p-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">
                            {editingId ? "Edit Address" : "Add New Address"}
                        </h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                setIsAddingNew(false);
                                setEditingId(null);
                            }}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <AddressInput />
                </Card>
            )}

            <div className="grid gap-4 mb-6">
                {addresses.map((address) => (
                    <Card key={address.id} className="relative">
                        <CardContent className="p-6">
                            <div className="absolute right-4 top-4 flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => setEditingId(address.id)}
                                >
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">
                                        Edit address
                                    </span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">
                                        Delete address
                                    </span>
                                </Button>
                            </div>
                            <div className="grid gap-1">
                                <div className="font-medium">
                                    {address.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {address.street}
                                    <br />
                                    {address.city}, {address.state}{" "}
                                    {address.zipCode}, <br /> {address.country}
                                </div>
                                <div className="text-sm text-gray-500 mt-2">
                                    Phone: {address.phone}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DeliveryAddress;
