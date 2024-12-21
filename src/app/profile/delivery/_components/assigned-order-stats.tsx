"use client";
import { Card, CardContent } from "@/components/ui/card";
import ErrorState from "@/components/ui/error-state";
import { MagicCard } from "@/components/ui/magic-card";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { useGetAssignedOrderStatsQuery } from "@/redux/features/order/orderApi";
import { useTheme } from "next-themes";

interface Props {
  userId: string;
}

const AssignedOrderStats = ({ userId }: Props) => {
  const { isLoading, data, isError } = useGetAssignedOrderStatsQuery(userId);

  let content;

  if (isLoading) {
    content = (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((n) => (
          <SkeletonWrapper fullWidth isLoading={isLoading} key={n}>
            <StatCard title="Total Orders" value={1} />
          </SkeletonWrapper>
        ))}
      </div>
    );
  } else if (isError || !data?.success) {
    const msg = data?.message || "Something went wrong";
    content = <ErrorState message={msg} />;
  } else if (data.success) {
    content = (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <StatCard title="Total Orders" value={data?.data?.totalOrders} />
        <StatCard title="Running Orders" value={data?.data?.runningOrders} />
        <StatCard title="Returns Orders" value={data?.data?.cancelledOrders} />
        <StatCard
          title="Fulfilled Orders"
          value={data?.data?.completedOrders}
        />
      </div>
    );
  }

  return content;
};

export default AssignedOrderStats;

interface StatCardProps {
  title: string;
  value: number;
}

const StatCard = ({ title, value }: StatCardProps) => {
  const { theme } = useTheme();
  return (
    <MagicCard
      gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      className="bg-white"
    >
      <Card className="shadow-none font-roboto border-none rounded-[6px] w-full bg-transparent">
        <CardContent className="pt-4">
          <h1 className="text-[16px] md:text-[18px] text-primary-black/70">
            {title}
          </h1>
          <p className="text-[22px] font-medium">{value} —</p>
        </CardContent>
      </Card>
    </MagicCard>
  );
};
