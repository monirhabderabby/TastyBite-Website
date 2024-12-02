import { currentUser } from "@clerk/nextjs/server";
import DeliveryContainer from "./_components/delivery-container";

const Page = async () => {
  const auth = await currentUser();

  return (
    <div className="text-primary-black">
      <div className="border-b">
        <h1 className="text-[22px] font-narrow font-semibold text-primary-black">
          Assigned Deliveries
        </h1>
        <p className="text-primary-black/50">
          View all the deliveries assigned to you and manage them efficiently.
        </p>
      </div>
      <div className="mt-5">
        <DeliveryContainer userId={auth?.id as string} />
      </div>
    </div>
  );
};

export default Page;
