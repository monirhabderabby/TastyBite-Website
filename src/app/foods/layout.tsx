import React from "react";
import FoodsBanner from "./_components/foods-banner";

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
