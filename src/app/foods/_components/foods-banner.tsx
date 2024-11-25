"use client";
import AllPageBanner from "@/components/common/AllPageBanner/AllPageBanner";
import { useSearchParams } from "next/navigation";

const FoodsBanner = () => {
  const searchParams = useSearchParams();
  const param = searchParams.get("category");

  let title;

  if (!param) {
    title = "Foods";
  } else {
    title = param.charAt(0).toUpperCase() + param.slice(1);
  }

  return (
    <AllPageBanner
      img="https://utfs.io/f/ENJYMqft5qDjoiy7MJ00DmqlfCg17NkArjiutn63vWY8Hwec"
      activelink={title}
      title={title}
    />
  );
};

export default FoodsBanner;
