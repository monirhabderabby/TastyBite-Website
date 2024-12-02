"use client";
// Packages
import moment from "moment";

// Local Imports
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TOrder } from "@/types";
import CompleteAction from "./complete-action";

interface Props {
  order: TOrder;
}

const DeliveryCard = ({ order }: Props) => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-5">
            <h3 className="text-primary-black font-medium">
              {order?.invoiceId}
            </h3>
            <Badge variant="secondary">{order?.orderStatus}</Badge>
            <p className="text-[13px] text-primary-black/70">
              {moment(order?.createdAt).format("llll")}
            </p>
          </div>
          <CompleteAction />
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <p>
            <span className="font-semibold">Customer Name : </span> Monir
            Hossain
          </p>
          <p>
            <span className="font-semibold">Customer Phone : </span> 01956306002
          </p>
          <p>
            <span className="font-semibold">Delivery Location:</span> House
            #261, Morkun Poschim Para, Tongi
          </p>
        </div>
        <div className="mt-4">
          <h4 className="font-medium mb-2">Order Items:</h4>
          <div className="space-y-2">
            {order.foods.map((food, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>
                  {food.foodId.name} x {food.quantity}
                </span>
                <span>${food.foodId.price * food.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Total Amount</span>
              <span>${order.totalPrice}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryCard;
