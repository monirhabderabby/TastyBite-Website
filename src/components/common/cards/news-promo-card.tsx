import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";

interface NewsProps {
    news: {
        id: string;
        title: string;
        creator: string;
        image: StaticImageData;
    };
}

const NewsPromoCard = ({ news }: NewsProps) => {
    return (
        <div className="group">
            <div className="overflow-hidden">
                <Image
                    src={news.image}
                    alt={news.title}
                    width={500}
                    height={500}
                    layout="responsive"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-all duration-500 ease-in-out"
                />
            </div>
            <p className="text-sm text-primary-black mt-[30px] mb-[10px]">
                By {news.creator} On
            </p>
            <h2 className="text-primary-black text-lg font-semibold uppercase hover:text-primary-orange duration-300 cursor-pointer line-clamp-1 tracking-widest">
                {news.title}
            </h2>
            <Button
                variant={"link"}
                className="text-base uppercase underline text-primary-orange hover:text-primary-black duration-300 p-0"
            >
                Read More
            </Button>
        </div>
    );
};

export default NewsPromoCard;
