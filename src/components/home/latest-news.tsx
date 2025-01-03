"use client";

import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { useCallback } from "react";

import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import { TBlog } from "@/types";
import Link from "next/link";
import ButtonPrimary from "../common/button/buttonPrimary";
import NewsPromoCard from "../common/cards/news-promo-card";
import SectionHeader from "../common/sectionHeader/sectionHeader";
import {
    NextButton,
    PrevButton,
    usePrevNextButtons,
} from "../ui/EmblaCarouselArrowButton";

const LatestNews = () => {
    const { data, isLoading } = useGetAllBlogsQuery("?limit=3");
    const blogs = data?.data || [];

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

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="my-40 container">
            <div className="mb-[50px]">
                <SectionHeader heading="Latest News" title="Recent Events" />
            </div>

            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-5 md:gap-y-5 lg:gap-x-[30px]">
                {blogs.map((blog: TBlog, i: number) => (
                    <motion.div
                        key={blog._id}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        variants={stagger}
                        viewport={{ once: false }}
                    >
                        <NewsPromoCard blog={blog} />
                    </motion.div>
                ))}
            </div>

            <div className="embla md:hidden">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {blogs.map((blog: TBlog) => (
                            <div className="embla__slide" key={blog._id}>
                                <NewsPromoCard key={blog._id} blog={blog} />
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

            <div className="flex justify-center items-center mt-[50px]">
                <Link href={"/blog"}>
                    <ButtonPrimary text="View More" />
                </Link>
            </div>
        </div>
    );
};

export default LatestNews;
