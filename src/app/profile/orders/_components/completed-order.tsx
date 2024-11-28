// Packages
import dynamic from "next/dynamic";

// Local imports
import { Separator } from "@/components/ui/separator";
const CompletedOrderTable = dynamic(() => import("./completed-order-table"), {
  ssr: false,
});

const CompletedOrder = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-primary-black text-23px md:text-[30px] font-bold font-inter">
            Completed Orders
          </h2>
          <p className="text-primary-black text-14px pt-1 mb-1">
            Food Orders Placed and Delivered
          </p>
        </div>
      </div>
      <Separator className="mb-4" />
      <CompletedOrderTable />
    </div>
  );
};

export default CompletedOrder;
