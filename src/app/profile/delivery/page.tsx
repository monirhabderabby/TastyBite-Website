import { currentUser } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import AssignedOrderStats from "./_components/assigned-order-stats";
const DeliveryContainer = dynamic(
  () => import("./_components/delivery-container")
);
const AssignedOrderTable = dynamic(
  () => import("./_components/assigned-order-table")
);

const Page = async () => {
  const auth = await currentUser();

  return (
    <>
      <div className="mb-5">
        <AssignedOrderStats userId={auth?.id as string} />
      </div>
      <div>
        <div className="border-b">
          <h1 className="text-[22px] font-narrow font-semibold text-primary-black">
            Assigned Deliveries
          </h1>
          <p className="text-primary-black/50">
            View all the deliveries assigned to you and manage them efficiently.
          </p>
        </div>
        <div className="my-5">
          <DeliveryContainer userId={auth?.id as string} />
        </div>
      </div>
      <div className="my-10">
        <div className="border-b">
          <h1 className="text-[22px] font-narrow font-semibold text-primary-black">
            Completed Deliveries
          </h1>
          <p className="text-primary-black/50">
            View all the delivered orders of your
          </p>
        </div>
        <AssignedOrderTable userId={auth?.id as string} />
      </div>
    </>
  );
};

export default Page;
