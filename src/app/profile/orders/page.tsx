import { currentUser } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import CompletedOrder from "./_components/completed-order";
import OrderStatsContainer from "./_components/order-stats-container";
const RunningOrders = dynamic(() => import("./_components/running-orders"));

const Page = async () => {
  const user = await currentUser();
  return (
    <div className="space-y-5 mb-10">
      <OrderStatsContainer userId={user?.id as string} />
      <RunningOrders />
      <CompletedOrder />
    </div>
  );
};

export default Page;
