"use client";
// Packages
import Image from "next/image";
import { useState } from "react";

// Local imports
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// const images = [
//     "https://utfs.io/f/ENJYMqft5qDjx4RSpzoJA0DGqsUeoEx5zi6vcP48RSlQBdrj",
//     "https://utfs.io/f/ENJYMqft5qDj27aE4dUsmxKwWUZz3NpX49OEtFV5gkanDPre",
//     "https://utfs.io/f/ENJYMqft5qDjmWO44FxQB2YrEvwgWTsI0jSGMAcHkfhmo5i9",
// ];

interface Props {
    carouselItemClassName?: string;
    selectedImageContainer?: string;
    images: string[];
}
const ModalImageSlider = ({
    carouselItemClassName,
    selectedImageContainer,
    images,
}: Props) => {
    const [selectedImg, setSelectedImg] = useState(images[0]);

    return (
        <section className="w-full">
            <div
                className={cn(
                    selectedImageContainer,
                    "w-full bg-orange-300 h-[250px] md:h-[300px] relative md:rounded-[5px]"
                )}
            >
                <Image
                    src={selectedImg}
                    fill
                    alt="product"
                    className="md:rounded-[5px] h-[250px] md:h-[300px]"
                />
            </div>
            <div className="mt-5 md:mt-10 px-4">
                <Carousel className="w-full">
                    <CarouselContent>
                        {images.map((img) => (
                            <CarouselItem
                                key={img} // please use a unike key
                                className={cn(
                                    "basis-1/4",
                                    carouselItemClassName
                                )}
                                onClick={() => setSelectedImg(img)}
                            >
                                <Image
                                    src={img}
                                    width={50}
                                    height={50}
                                    className={cn(
                                        "border-[1px] border-inputs cursor-pointer",
                                        selectedImg === img &&
                                            "border-[2px] border-primary-orange transition-colors duration-300"
                                    )}
                                    alt="image"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <p
                    title="swipe for more food"
                    className="text-gray-400 text-center mt-3"
                >
                    {"<--->"}
                </p>
            </div>
        </section>
    );
};

export default ModalImageSlider;
