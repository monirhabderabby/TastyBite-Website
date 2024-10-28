"use client";
// Local imports
import QuantityControl from "@/components/ui/quantity-control";
import { useState } from "react";
import ProductInfo from "./product-info";
import QuickViewAction from "./quick-view";

const QuickViewModalDesc = () => {
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
        title="Premium Pizza"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti iusto,
        ea eaque maxime voluptatum ratione eos ipsum et id. Libero"
        price="40.33"
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
