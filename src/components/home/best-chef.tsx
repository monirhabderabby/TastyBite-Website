import Image from "next/image";
import chef from "../../../public/images/chef-1.webp";
import ChefCard from "../common/cards/chef-card";
import SectionHeader from "../common/sectionHeader/sectionHeader";

const BestChef = () => {
    const chefData = [
        {
            id: "1",
            name: "Chef John",
            designation: "Sous Chef",
            image: chef,
        },
        {
            id: "2",
            name: "Julia Child",
            designation: "Sous Chef",
            image: chef,
        },
        {
            id: "3",
            name: "Abdullah Kafi",
            designation: "Sous Chef",
            image: chef,
        },
        {
            id: "4",
            name: "Sahabuddin",
            designation: "Sous Chef",
            image: chef,
        },
    ];
    return (
        <div>
            <div
                style={{ backgroundImage: `url(/images/banner-bg.webp)` }}
                className="bg-primary-black w-full relative overflow-hidden"
            >
                <div className="w-full absolute h-[102px] md:h-[186px] lg:h-[400px] -top-20 md:-top-36 lg:-top-72">
                    <Image
                        src="/images/chef-top-bg.png"
                        fill
                        alt="orange-top"
                    />
                </div>
                <div className="container py-20 lg:py-40">
                    <SectionHeader
                        title="Meet our experts"
                        heading="Our Best Chef"
                        headingTextColor="text-white"
                    />

                    <div className="mt-[50px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
                        {chefData.map((chef) => (
                            <ChefCard key={chef.id} chef={chef} />
                        ))}
                    </div>
                </div>
                <div className="w-full absolute h-[35px] md:h-[63px] lg:h-[136px] -bottom-3 md:-bottom-6 lg:-bottom-14">
                    <Image
                        src="/images/chef-bottom-bg.webp"
                        fill
                        alt="orange-top"
                    />
                </div>
            </div>
        </div>
    );
};

export default BestChef;
