import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DeliveryCard = () => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-5">
            <h3 className="text-primary-black font-medium">Inv-8999</h3>
            <Badge variant="secondary">Order Placed</Badge>
            <p className="text-[13px] text-primary-black/70">
              Thu, Nov 28, 2024 6:54 AM
            </p>
          </div>
          <Button size="sm" variant="outline" className="text-primary-black">
            Complete
          </Button>
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
      </CardContent>
    </Card>
  );
};

export default DeliveryCard;
