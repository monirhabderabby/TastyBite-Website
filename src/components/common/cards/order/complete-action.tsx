"use client";
// Packages
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Local imports
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useCompleteOrderMutation } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types";

interface Props {
  data: TOrder;
}

const CompleteAction = ({ data }: Props) => {
  const [open, setOpen] = useState<true | false>(false);
  const [value, setValue] = useState("");

  // Destructuring the RTK Query mutation hook
  const [completeOrder, { isLoading }] = useCompleteOrderMutation();

  // Effect to reset the form state when the component unmounts
  useEffect(() => {
    return () => {
      setValue("");
      setOpen(false);
    };
  }, []);

  // Function to handle order delivery completion
  const handleDeliveryCompletion = async () => {
    if (value.length < 6) {
      toast.warning("Please enter a valid 6-digit delivery pin.");
      return;
    }

    // prepare body
    const body = {
      orderId: data?._id,
      deliveryCode: value,
    };

    // send completion request to server with RTQ Query
    try {
      const result = await completeOrder(body);
      if (result?.error) {
        toast.error(
          // @ts-expect-error: TypeScript might not recognize `data.message` as valid, but it's expected from the server response.
          result?.error?.data?.message ||
            "Failed to complete the order. Please try again later."
        );
        return;
      }
      if (!result?.data?.success) {
        toast.error(
          result?.data?.message ||
            "Failed to complete the order. Please try again later."
        );
        return;
      }

      if (result?.data?.success) {
        setOpen(false);
        setValue("");
      }
    } catch (error: unknown) {
      // Check if the error is an instance of Error to safely access the message property
      if (error instanceof Error) {
        toast.error(
          error.message || "An unexpected error occurred. Please try again."
        );
      } else {
        // Handle cases where the error might not be an instance of Error
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={(value) => setOpen(value)}>
      {data?.orderStatus === "Delivered" ? (
        <Badge className="bg-green-600">{data?.orderStatus}</Badge>
      ) : (
        <AlertDialogTrigger>
          <Button size="sm" variant="outline" className="text-primary-black">
            Complete
          </Button>
        </AlertDialogTrigger>
      )}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary-black">
            Enter Delivery Confirmation Code
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-2">
              <InputOTP
                maxLength={6}
                value={value}
                onChange={(value) => setValue(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <div className="text-start text-sm">
                Please enter the 6-digit PIN code provided by the customer to
                complete the delivery process.
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-primary-black">
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={value.length < 6 || isLoading}
            onClick={handleDeliveryCompletion}
          >
            Continue{" "}
            {isLoading && <Loader2 className="animate-spin opacity-70" />}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CompleteAction;
