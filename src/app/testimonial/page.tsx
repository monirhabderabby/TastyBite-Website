/* eslint-disable @typescript-eslint/no-explicit-any */
import SectionHeader from "@/components/common/sectionHeader/sectionHeader";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export const dynamic = "force-dynamic"; // Explicitly allowing dynamic fetching

export default async function testimonial() {
  let testimonials = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food-feedback`,
      { cache: "no-store" }
    );
    const data = await response.json();
    testimonials = data?.data?.map((item: any) => ({
      quote: item?.review || "No review",
      name: item?.user?.name || "Anonymous",
      designation:
        `${
          item?.user?.role.charAt(0).toUpperCase() + item?.user?.role.slice(1)
        } ` || "Anonymous",
      src: item?.user?.image,
    }));
  } catch (error) {
    console.log(error);
  }
  if (!testimonials.length) {
    testimonials = [
      {
        quote: "No review",
        name: "Anonymous",
        designation: "Anonymous",
        src: "",
      },
    ];
  }

  return (
    <div className="pt-16 h-screen bg-[#121619] ">
      <div>
        <div className="bg-primary-black w-full relative overflow-hidden">
      
          <div className="container py-[50px] lg:pt-[100px]">
            <SectionHeader
              title="What Our Clients Say"
              heading="CUSTOMER REVIEWS"
              headingTextColor="text-white"
            />
          </div>

          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>
    </div>
  );
}
