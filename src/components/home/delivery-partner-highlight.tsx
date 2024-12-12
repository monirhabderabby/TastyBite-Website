import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Clock, DollarSign, Route, Shield, Zap } from "lucide-react";

export default function DeliveryPartnerHighlights() {
  return (
    <section className="w-full bg-[#1a1a1a] py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Why Deliver with <span className="text-[#ff8833]">TastyBite</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join our team of delivery partners and enjoy these exclusive
            benefits
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-black/40 border-none text-white">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <div className="rounded-full bg-[#ff8833]/10 p-3">
                <DollarSign className="h-6 w-6 text-[#ff8833]" />
              </div>
              <h3 className="text-xl font-bold">Competitive Pay</h3>
              <p className="text-center text-sm text-gray-400">
                Earn competitive base rates plus tips. Get paid weekly with our
                3-day payment clearing system.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-none text-white">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <div className="rounded-full bg-[#ff8833]/10 p-3">
                <Clock className="h-6 w-6 text-[#ff8833]" />
              </div>
              <h3 className="text-xl font-bold">Flexible Hours</h3>
              <p className="text-center text-sm text-gray-400">
                Set your own schedule. Work when you want, as much or as little
                as you like.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-none text-white">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <div className="rounded-full bg-[#ff8833]/10 p-3">
                <Shield className="h-6 w-6 text-[#ff8833]" />
              </div>
              <h3 className="text-xl font-bold">Insurance Coverage</h3>
              <p className="text-center text-sm text-gray-400">
                Enjoy peace of mind with our accident insurance coverage for all
                active delivery partners.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-none text-white">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <div className="rounded-full bg-[#ff8833]/10 p-3">
                <Route className="h-6 w-6 text-[#ff8833]" />
              </div>
              <h3 className="text-xl font-bold">Choose Your Area</h3>
              <p className="text-center text-sm text-gray-400">
                Select delivery zones that work best for you. Maximize your
                earnings by choosing busy areas.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-none text-white">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <div className="rounded-full bg-[#ff8833]/10 p-3">
                <Zap className="h-6 w-6 text-[#ff8833]" />
              </div>
              <h3 className="text-xl font-bold">Weekly Incentives</h3>
              <p className="text-center text-sm text-gray-400">
                Earn bonus rewards for completing delivery goals and during peak
                hours.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-none text-white">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <div className="rounded-full bg-[#ff8833]/10 p-3">
                <Award className="h-6 w-6 text-[#ff8833]" />
              </div>
              <h3 className="text-xl font-bold">Partner Perks</h3>
              <p className="text-center text-sm text-gray-400">
                Enjoy exclusive discounts on food, services, and more as a
                TastyBite delivery partner.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center mt-8">
          <Button className="bg-[#ff8833] text-white hover:bg-[#ff8833]/90 px-8 py-3 text-lg">
            Become a Delivery Partner
          </Button>
        </div>
      </div>
    </section>
  );
}
