import dynamic from "next/dynamic";
import CompletedOrder from "./_components/completed-order";
import OrderStatsContainer from "./_components/order-stats-container";
const RunningOrders = dynamic(() => import("./_components/running-orders"));

const Page = () => {
  return (
    <div className="space-y-5">
      <OrderStatsContainer />
      <RunningOrders />
      <CompletedOrder />
    </div>
  );
};

export default Page;
