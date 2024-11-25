import React from "react";
// import FoodsBanner from "./_components/foods-banner";
import dynamic from "next/dynamic";

const FoodsBanner = dynamic(() => import("./_components/foods-banner"), {
  ssr: false,
});

export default function FoodsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <FoodsBanner />
      {children}
    </div>
  );
}
