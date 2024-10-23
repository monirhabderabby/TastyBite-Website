import Image, { StaticImageData } from "next/image";

interface CategoryProps {
  item: {
    id: string;
    name: string;
    image: StaticImageData;
  };
}

const SpecialCategoryCard = ({ item }: CategoryProps) => {
  return (
    <div key={item.id}>
      <div className="rounded-full overflow-hidden">
        <Image
          src={item.image}
          alt="Burgers"
          width={500}
          height={500}
          layout="responsive"
          objectFit="cover"
          className="hover:scale-125 transition-all duration-700 ease-in-out"
        />
      </div>
      <p className="md:text-xl lg:text-2xl font-bold text-center mt-6 uppercase text-primary-black hover:text-primary-orange duration-300 cursor-pointer">
        {item.name}
      </p>
    </div>
  );
};

export default SpecialCategoryCard;
