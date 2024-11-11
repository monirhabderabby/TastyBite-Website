"use client";
// Local imports
import QuantityControl from "@/components/ui/quantity-control";
import { TFood } from "@/types";
import { useState } from "react";
import ProductInfo from "./product-info";
import QuickViewAction from "./quick-view";

const QuickViewModalDesc = ({ food }: { food: TFood }) => {
    const [quantity, setQuantity] = useState(1);

    const handleMinus = () => {
        // handle minimum decrease

        // set
        setQuantity((prev) => prev - 1);
    };

    const handlePlus = () => {
        // handle maximum increase

        // set state
        setQuantity((prev) => prev + 1);
    };
    return (
        <div className="flex flex-col gap-y-3 justify-between h-full">
            <ProductInfo
                title={food.name}
                description={food.description}
                price={food.price}
            />
            <div className="space-y-[30px]">
                <QuantityControl
                    quantity={quantity}
                    onMinus={handleMinus}
                    onPlus={handlePlus}
                />
                <QuickViewAction />
            </div>
        </div>
    );
};

export default QuickViewModalDesc;
