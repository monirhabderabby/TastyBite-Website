/* eslint-disable @typescript-eslint/no-explicit-any */
import SectionHeader from "@/components/common/sectionHeader/sectionHeader";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default async function testimonial() {
    let testimonials = [];
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/food-feedback`,
            { cache: "no-store" }
        );
        const data = await response.json();
        testimonials = data?.data.map((item: any) => ({
            quote: item?.review,
            name: item?.user?.name,
            designation: `${
                item?.user?.role.charAt(0).toUpperCase() +
                item?.user?.role.slice(1)
            } from ${item.user?.location.join(", ")}`,
            src: item?.user?.image,
        }));
    } catch (error) {
        console.log(error);
    }

    return (
        <div className="pt-16 h-screen bg-[#121619] ">
            <div>
                <div className="bg-primary-black w-full relative overflow-hidden">
                    <div className="w-full absolute h-[32px] md:h-[66px] lg:h-[136px] -top-4 md:-top-8 lg:-top-16"></div>
                    <div className="container py-[50px] lg:py-[100px]">
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
