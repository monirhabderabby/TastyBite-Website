"use client";

// Packages
import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { useCallback } from "react";

// Local imports
import { useGetAllMenusQuery } from "@/redux/features/menu/menuApi";
import { TMenu } from "@/types";
import Link from "next/link";
import SpecialCategoryCard from "../common/cards/special-category-card";
import SectionHeader from "../common/sectionHeader/sectionHeader";
import {
    NextButton,
    PrevButton,
    usePrevNextButtons,
} from "../ui/EmblaCarouselArrowButton";
import { Skeleton } from "../ui/skeleton";

const Speciality = () => {
    const { data: menuData, isLoading } = useGetAllMenusQuery({ limit: 3 });

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

    let content;
    if (isLoading) {
        content = (
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center gap-4"
                        >
                            <Skeleton className="w-[300px] h-[300px] rounded-full" />
                            <Skeleton className="h-6 w-32" />
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (menuData?.data?.length > 0) {
        content = (
            <div className="container mx-auto my-6 md:my-8 lg:my-10">
                <div className="hidden md:grid grid-cols-3 gap-8">
                    {menuData?.data.map((menu: TMenu) => (
                        <motion.div
                            key={menu._id}
                            custom={menu._id}
                            initial="hidden"
                            whileInView="visible"
                            variants={stagger}
                            viewport={{ once: false }}
                        >
                            <SpecialCategoryCard menu={menu} />
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
                                {menuData.data.map((menu: TMenu) => (
                                    <div
                                        className="embla__slide"
                                        key={menu._id}
                                    >
                                        <SpecialCategoryCard menu={menu} />
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
        );
    }

    return (
        <div className="my-40">
            <SectionHeader
                title="Fresh From TastyBite"
                heading="OUR SPECIALITY"
            />

            {content}

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
