"use client";

import { useGetAllFoodFeedbacksQuery } from "@/redux/features/foodFeedback/foodFeedbackApi";
import { TFoodFeedback } from "@/types";
import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback } from "react";
import reviewer from "../../../public/images/reviewer.jpg";
import CustomerReviewCard from "../common/cards/customer-review-card";
import SectionHeader from "../common/sectionHeader/sectionHeader";
import { DotButton, useDotButton } from "../ui/EmblaCarouselDotButton";

const CustomerReviews = () => {
    const { data } = useGetAllFoodFeedbacksQuery(undefined);
    const reviews = data?.data || [];

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

    const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;

        const resetOrStop =
            autoplay.options.stopOnInteraction === false
                ? autoplay.reset
                : autoplay.stop;

        resetOrStop();
    }, []);

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
        emblaApi,
        onNavButtonClick
    );

    return (
        <div className="overflow-hidden">
            <div className="bg-primary-black w-full relative">
                <div className="w-full absolute h-[32px] md:h-[66px] lg:h-[136px] -top-4 md:-top-8 lg:-top-16">
                    <Image
                        src="/images/customer-top-bg.webp"
                        fill
                        alt="customer-top"
                    />
                </div>
                <div className="container py-[50px] lg:py-[100px]">
                    <SectionHeader
                        title="What Our Clients Say"
                        heading="CUSTOMER REVIEWS"
                        headingTextColor="text-white"
                    />

                    {/* reviews carousel */}
                    <div className="mt-5 md:mt-[50px]">
                        <div className="embla">
                            <div className="embla__viewport" ref={emblaRef}>
                                <div className="embla__container">
                                    {reviews
                                        ?.slice(0, 4)
                                        ?.map((review: TFoodFeedback) => (
                                            <div
                                                className="embla__slide"
                                                key={review._id}
                                            >
                                                <CustomerReviewCard
                                                    image={reviewer}
                                                    review={review}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div className="embla__controls__review">
                                <div className="embla__dots">
                                    {scrollSnaps.map((_, index) => (
                                        <DotButton
                                            key={index}
                                            onClick={() =>
                                                onDotButtonClick(index)
                                            }
                                            className={"embla__dot".concat(
                                                index === selectedIndex
                                                    ? " embla__dot--selected"
                                                    : ""
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full absolute h-[18px] md:h-[37px] lg:h-[77px] bottom-0 lg:bottom-0">
                    <Image
                        src="/images/customer-bottom-bg.png"
                        fill
                        alt="customer-bottom"
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomerReviews;
