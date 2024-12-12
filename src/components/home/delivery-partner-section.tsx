"use client";

import {
  BadgeCheck,
  Calendar,
  Clock,
  DollarSign,
  Route,
  Shield,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DeliveryPartnerSection() {
  return (
    <section className="w-full bg-[#1a1a1a] py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Join Our Delivery <span className="text-[#ff8833]">Team</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed">
            Become a part of TastyBite&apos;s delivery network and enjoy
            flexible hours, competitive earnings, and great benefits.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          <Card className="bg-black/40 border-none text-white">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <div className="rounded-full bg-[#ff8833]/10 p-3">
                <DollarSign className="h-6 w-6 text-[#ff8833]" />
              </div>
              <h3 className="text-xl font-bold">Competitive Earnings</h3>
              <p className="text-center text-sm text-gray-400">
                Get paid weekly with competitive base rates plus tips. Earn
                extra during peak hours and special events.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-none text-white">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <div className="rounded-full bg-[#ff8833]/10 p-3">
                <Clock className="h-6 w-6 text-[#ff8833]" />
              </div>
              <h3 className="text-xl font-bold">Flexible Schedule</h3>
              <p className="text-center text-sm text-gray-400">
                Work when you want. Set your own hours and be your own boss with
                our flexible scheduling system.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-none text-white">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <div className="rounded-full bg-[#ff8833]/10 p-3">
                <Shield className="h-6 w-6 text-[#ff8833]" />
              </div>
              <h3 className="text-xl font-bold">Great Benefits</h3>
              <p className="text-center text-sm text-gray-400">
                Enjoy accident insurance coverage, special discounts, and other
                exclusive partner benefits.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start space-x-4">
              <BadgeCheck className="h-6 w-6 text-[#ff8833]" />
              <div>
                <h4 className="text-lg font-bold text-white">
                  3-Day Payment Clearing
                </h4>
                <p className="text-sm text-gray-400">
                  Quick and reliable payment processing every 3 days
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Route className="h-6 w-6 text-[#ff8833]" />
              <div>
                <h4 className="text-lg font-bold text-white">
                  Choose Your Area
                </h4>
                <p className="text-sm text-gray-400">
                  Select delivery zones that work best for you
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Calendar className="h-6 w-6 text-[#ff8833]" />
              <div>
                <h4 className="text-lg font-bold text-white">
                  Weekly Incentives
                </h4>
                <p className="text-sm text-gray-400">
                  Earn bonus rewards for completing delivery goals
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-[#ff8833]" />
              <div>
                <h4 className="text-lg font-bold text-white">
                  Partner Support
                </h4>
                <p className="text-sm text-gray-400">
                  24/7 support team to help you succeed
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <h3 className="text-xl font-bold text-white">Ready to Start?</h3>
            <p className="text-gray-400">
              Join our delivery team and start earning on your own schedule
            </p>
            <Button className="bg-[#ff8833] text-white hover:bg-[#ff8833]/90">
              Apply Now
            </Button>
            <p className="text-xs text-gray-500">
              By applying, you agree to our{" "}
              <Link href="#" className="text-[#ff8833] underline">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
