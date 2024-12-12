import Image from "next/image";

type Info = {
    id: string;
    title: string;
    description: string;
    icon: string;
};

// data
const data: Info[] = [
    {
        id: "1",
        title: "order your Food",
        description:
            "Satisfy your cravings with just a few clicks! Order your favorite cuisine from a diverse menu, customized to your taste, and enjoy swift delivery or convenient pickup options. Indulge in a delightful dining experience, right at your fingertips.",
        icon: "/icon/dishIcon.png",
    },
    {
        id: "2",
        title: "delivery or pick up",
        description:
            "Choose your preferred way to enjoy your meal! Opt for hassle-free delivery to your doorstep or quick and convenient pick-up, ensuring your culinary cravings are satisfied just the way you like.",
        icon: "/icon/truckIcon.png",
    },
    {
        id: "3",
        title: "delicious recipe",
        description:
            "Discover a world of flavors with our delicious recipes! From gourmet delights to quick and easy meals, explore a diverse range of culinary creations that will tantalize your taste buds and inspire your inner chef.",
        icon: "/icon/pizzaIcon.png",
    },
];

const BannerInfo = () => {
    return (
        <div className="bg-primary-orange">
            <div className="w-full h-[50px] md:h-[150px] relative -top-[50px] md:-top-[90px]">
                <Image src="/images/orange-top.png" fill alt="orange-top" />
            </div>
            <div className="container grid grid-cols-1 md:grid-cols-3 gap-y-[40px] gap-x-5">
                {data.map((item) => (
                    <BannerInfoCard key={item.id} info={item} />
                ))}
            </div>
            <div className="w-full h-[50px] md:h-[150px] relative top-[50px] md:top-[90px]">
                <Image src="/images/orange-bottom.png" fill alt="orange-top" />
            </div>
        </div>
    );
};

export default BannerInfo;

const BannerInfoCard = ({ info }: { info: Info }) => {
    return (
        <div className="mx-auto flex flex-col justify-start items-center max-w-[300px]">
            <Image src={info.icon} height={100} width={100} alt="icon" />
            <h1 className="text-[#121619] font-narrow uppercase font-bold text-[30px] md:text-[20px] lg:text-[30px] text-center">
                {info.title}
            </h1>
            <p className="text-[#121619] font-narrow text-center text-[14px]">
                {info.description}
            </p>
        </div>
    );
};
