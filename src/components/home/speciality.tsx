"use client";

import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import img from "../../../public/images/Burger.webp";
import ButtonPrimary from "../common/button/buttonPrimary";
import SpecialCategoryCard from "../common/cards/special-category-card";
import SectionHeader from "../common/sectionHeader/sectionHeader";
import {
    NextButton,
    PrevButton,
    usePrevNextButtons,
} from "../ui/EmblaCarouselArrowButton";

const Speciality = () => {
    const category = [
        {
            id: "1",
            name: "Burgers",
            image: img,
        },
        {
            id: "2",
            name: "Deserts",
            image: img,
        },
        {
            id: "3",
            name: "Double Cheese Pizza",
            image: img,
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

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi, onNavButtonClick);

    return (
        <div className="my-40">
            <SectionHeader
                title="Fresh From TastyBite"
                heading="OUR SPECIALITY"
            />

            <div className="container mx-auto my-6 md:my-8 lg:my-10">
                <div className="hidden md:grid grid-cols-3 gap-8">
                    {category.map((item) => (
                        <SpecialCategoryCard key={item.id} item={item} />
                    ))}
                </div>
                <div className="embla md:hidden">
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                            {category.map((item) => (
                                <div className="embla__slide" key={item.id}>
                                    <SpecialCategoryCard item={item} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center ml-4">
                        <div className="embla__controls">
                            <div className="embla__buttons text-primary-black">
                                <PrevButton
                                    onClick={onPrevButtonClick}
                                    disabled={prevBtnDisabled}
                                />
                                <NextButton
                                    onClick={onNextButtonClick}
                                    disabled={nextBtnDisabled}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <ButtonPrimary text="View More" />
            </div>
        </div>
    );
};

export default Speciality;
