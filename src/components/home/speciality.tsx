"use client";

// Packages
import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { useCallback } from "react";

// Local imports
import Link from "next/link";
import img from "../../../public/images/Burger.webp";
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

    const stagger = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 1 },
        }),
    };

    return (
        <div className="my-40">
            <SectionHeader
                title="Fresh From TastyBite"
                heading="OUR SPECIALITY"
            />

            <div className="container mx-auto my-6 md:my-8 lg:my-10">
                <div className="hidden md:grid grid-cols-3 gap-8">
                    {category.map((item) => (
                        <motion.div
                            key={item.id}
                            custom={item.id}
                            initial="hidden"
                            whileInView="visible"
                            variants={stagger}
                            viewport={{ once: false }}
                        >
                            <SpecialCategoryCard key={item.id} item={item} />
                        </motion.div>
                    ))}
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                >
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
                </motion.div>
            </div>

            <div className="flex justify-center items-center">
                <Link
                    className="uppercase text-white hover:text-primary-orange bg-primary-orange hover:bg-transparent rounded-[50px] text-base px-[41px] py-[14px] h-[50px] tracking-wide border-[1px] border-primary-orange font-semibold duration-300"
                    href="/foods"
                >
                    View More
                </Link>
            </div>
        </div>
    );
};

export default Speciality;
