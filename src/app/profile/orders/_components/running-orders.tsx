"use client";
// Packages
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// Local imports
import RunningOrderCard from "@/components/common/cards/order/running-order-card";
import { useGetRunningOrderQuery } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types";

const RunningOrders = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded) return;
  if (!isSignedIn) redirect("/login");

  const { data } = useGetRunningOrderQuery({ userId: user?.id });

  if (data?.data?.length === 0) return;

  return (
    <div className="space-y-3">
      {data?.data?.map((data: TOrder) => (
        <RunningOrderCard key={data?._id} data={data} />
      ))}
    </div>
  );
};

export default RunningOrders;
