"use client";
// Packages
import Link from "next/link";

// Local imports
import DeliveryCard from "@/components/common/cards/order/delivery-card";
import EmptyState from "@/components/ui/empty-state";
import ErrorState from "@/components/ui/error-state";
import LoaderState from "@/components/ui/loader-state";
import { useGetOrderForDeliverymanQuery } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types";

interface Props {
  userId: string;
}
const DeliveryContainer = ({ userId }: Props) => {
  const { isLoading, data, isError } = useGetOrderForDeliverymanQuery({
    userId,
  });

  let content;

  if (isLoading) {
    content = (
      <div className="mt-10">
        <LoaderState message="Retrieving your assigned deliveries, please wait..." />
      </div>
    );
  } else if (isError || !data?.success) {
    content = (
      <div className="mt-10">
        <ErrorState
          message={
            <>
              Something went wrong. Please try again later or{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">
                contact support
              </Link>
              .
            </>
          }
        />
      </div>
    );
  } else if (data?.data?.length == 0) {
    content = (
      <div className="mt-10">
        <EmptyState message="No deliveries assigned. Please check back later for new assignments!" />
      </div>
    );
  } else if (data?.data?.length > 0) {
    content = (
      <div className="flex flex-col gap-y-5">
        {data?.data?.map((order: TOrder) => (
          <DeliveryCard key={order?._id} order={order} />
        ))}
      </div>
    );
  }
  return content;
};

export default DeliveryContainer;
