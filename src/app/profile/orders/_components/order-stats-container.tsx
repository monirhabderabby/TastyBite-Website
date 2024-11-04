import { Card, CardContent } from "@/components/ui/card";

const OrderStatsContainer = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      <StatCard title="Total Orders" value={21} />
      <StatCard title="Running Orders" value={2} />
      <StatCard title="Returns Orders" value={0} />
      <StatCard title="Fulfilled Orders" value={19} />
    </div>
  );
};

export default OrderStatsContainer;

interface StatCardProps {
  title: string;
  value: number;
}

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <Card className="shadow-none font-roboto rounded-[6px]">
      <CardContent className="pt-4">
        <h1 className="text-[16px] md:text-[18px] text-primary-black/70">
          {title}
        </h1>
        <p className="text-[22px] font-medium">{value} —</p>
      </CardContent>
    </Card>
  );
};
