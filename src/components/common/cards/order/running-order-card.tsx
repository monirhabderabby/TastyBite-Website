// Packages
import moment from "moment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Local imports
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUpdateOrderStatusMutation } from "@/redux/features/order/orderApi";
import { TOrder, TUser } from "@/types";

interface Props {
  data: TOrder;
}

const status = ["Order Placed", "Order Confirmed"];

const RunningOrderCard = ({ data }: Props) => {
  const [updateStatus, { isLoading }] = useUpdateOrderStatusMutation();

  const router = useRouter();

  const { totalPrice, createdAt, orderStatus, invoiceId, deliveryMan } =
    data || {};

  const isCanceledActive = status?.includes(orderStatus);

  const handleCancel = async () => {
    const response = await updateStatus({
      body: {
        status: "Cancelled",
      },
      id: data._id,
    });

    if (response?.data?.success) {
      toast.success("You order has been cancelled!");
      router.refresh();
    } else if (!response?.data?.success) {
      toast.error("Failed to cancel order!");
    }
  };

  return (
    <section className="relative flex h-auto w-full  overflow-hidden rounded-lg border bg-background ">
      <BorderBeam size={250} duration={12} delay={9} />
      <div className="w-full p-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-5">
            <h3 className="text-primary-black font-medium">{invoiceId}</h3>
            <Badge variant="secondary">{orderStatus}</Badge>
            <p className="text-[13px] text-primary-black/70">
              {moment(createdAt).format("llll")}
            </p>
          </div>
          {isCanceledActive && (
            <Button
              size="sm"
              variant="outline"
              className="text-primary-black"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
        </div>

        <div
          className={cn(
            "mt-5 w-full flex  items-end",
            orderStatus === "Out For Delivery"
              ? "justify-between"
              : "justify-end"
          )}
        >
          {deliveryMan && <DeliveryInformation data={deliveryMan} />}
          <div>
            <Badge
              variant="default"
              className="bg-primary-orange hover:bg-primary-orange"
            >
              ${totalPrice}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RunningOrderCard;

interface DeliveryInformationProps {
  data: TUser;
}

const DeliveryInformation = ({ data }: DeliveryInformationProps) => {
  return (
    <div className="w-full  space-y-1">
      <h3 className="font-semibold text-primary-orange text-[17px]">
        Delivery Information
      </h3>

      <Information title="Delivery Man:" desc={data.name!} />
      <Information title="Delivery Phone:" desc={data.phone!} />
      <Information title="Delivery Email:" desc={data.email!} />
    </div>
  );
};

interface InformationProps {
  title: string;
  desc: string;
}

const Information = ({ title, desc }: InformationProps) => {
  return (
    <p className="text-primary-black">
      <span className="font-semibold">{title}</span> {desc}
    </p>
  );
};
