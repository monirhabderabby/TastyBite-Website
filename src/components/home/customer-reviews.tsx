"use client";

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
    const reviews = [
        {
            id: "1",
            name: "Md Salah",
            designation: "Striker",
            image: reviewer,
            reviewText:
                "Our pizza experience was exceptional! The crust was thin and crispy, just how we like it, and the array of fresh, high-quality toppings was impressive. The online ordering process was effortless, and the delivery was prompt, ensuring our pizza arrived piping hot. A true gourmet delight – we'll be ordering again soon!",
        },
        {
            id: "2",
            name: "Sadio Mane",
            designation: "Striker",
            image: reviewer,
            reviewText:
                "This pizza site exceeded my expectations! The pizza arrived well-packaged and piping hot. The flavors were well-balanced, and the cheese was perfectly melted. I appreciate the attention to detail in every bite. The website is user-friendly, making the ordering process quick and easy. Overall, a top-notch pizza delivery service that I would recommend to everyone!",
        },
        {
            id: "3",
            name: "Mr. Zalatan",
            designation: "Striker",
            image: reviewer,
            reviewText:
                "What a fantastic pizza experience! The variety of pizzas on the menu is impressive, and I love how you can customize your own. The online ordering process was seamless, and the staff was friendly and accommodating. The pizza tasted amazing - it's evident they use high-quality ingredients. I'll definitely be ordering from here again!",
        },
    ];

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
        <div>
            <div className="bg-primary-black w-full relative overflow-hidden">
                <div className="w-full absolute h-[32px] md:h-[66px] lg:h-[136px] -top-4 md:-top-8 lg:-top-16">
                    <Image
                        src="/images/customer-top-bg.webp"
                        fill
                        alt="customer-top"
                    />
                </div>
                <div className="container py-20 lg:py-40">
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
                                    {reviews.map((review) => (
                                        <div
                                            className="embla__slide"
                                            key={review.id}
                                        >
                                            <CustomerReviewCard
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
