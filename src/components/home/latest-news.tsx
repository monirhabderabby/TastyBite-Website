"use client";

import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import blogImg from "../../../public/images/blog-tasty.webp";
import ButtonPrimary from "../common/button/buttonPrimary";
import NewsPromoCard from "../common/cards/news-promo-card";
import SectionHeader from "../common/sectionHeader/sectionHeader";
import {
    NextButton,
    PrevButton,
    usePrevNextButtons,
} from "../ui/EmblaCarouselArrowButton";

const LatestNews = () => {
    const newsData = [
        {
            id: "1",
            title: "How to keep fear from ruining your art business with confident",
            creator: "Monir Hossain",
            image: blogImg,
        },
        {
            id: "2",
            title: "Peppe's launches healthy pizza for kids",
            creator: "Abdullah",
            image: blogImg,
        },
        {
            id: "3",
            title: "Our Wonderfully Pizza New Tastes",
            creator: "Mobashirul",
            image: blogImg,
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
        <div className="my-40 container">
            <div className="mb-[50px]">
                <SectionHeader heading="Latest News" title="Recent Events" />
            </div>

            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-5 md:gap-y-5 lg:gap-x-[30px]">
                {newsData.map((news) => (
                    <NewsPromoCard key={news.id} news={news} />
                ))}
            </div>

            <div className="embla md:hidden">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {newsData.map((news) => (
                            <div className="embla__slide" key={news.id}>
                                <NewsPromoCard key={news.id} news={news} />
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
                <ButtonPrimary text="View More" />
            </div>
        </div>
    );
};

export default LatestNews;
