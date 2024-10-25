import Image from "next/image";
// shadcnUI
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type Props={
    img: string,
    title: string,
    activelink: string
}

const AllPageBanner = ({img, title,activelink}: Props) => {
    return (
        <div className="overflow-hidden relative mt-[60px]">
            <Image
                src={img}
                alt="About-Img"
                width={500}
                height={500}
                className="h-[289px] md:h-[270px] bg-cover bg-no-repeat bg-gray-100"
                sizes="(min-height: 808px) 50vw, 100vw"
                style={{
                    width: "100%",
                }}
            />
            {/* overlap bg color */}
            <div className="absolute top-0 inset-0 bg-black opacity-75"></div>
            {/* title or breadcrumb */}
            <div className="lg:text-5xl md:text-4xl text-2xl text-white font-bold absolute top-1/2 -translate-x-1/2  -translate-y-1/2  left-1/2">
                <div className="flex justify-center items-center flex-col">
                    <h2 className="text-white">{title}</h2>
                    <Breadcrumb className="pt-6">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink className="text-white hover:text-white  text-xl" href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem >
                                <BreadcrumbPage className="text-white text-xl">{activelink}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
        </div>
    );
};

export default AllPageBanner;