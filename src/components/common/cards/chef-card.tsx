import Image, { StaticImageData } from "next/image";

interface ChefProps {
  chef: {
    id: string;
    name: string;
    designation: string;
    image: StaticImageData;
  };
}

const ChefCard = ({ chef }: ChefProps) => {
  return (
    <div>
      <Image
        src={chef.image}
        alt={chef.name}
        width={277}
        height={263}
        layout="responsive"
        objectFit="cover"
      />
      <div className="bg-white text-center py-6">
        <h2 className="text-xl text-primary-black uppercase font-semibold hover:text-primary-orange duration-300">
          {chef.name}
        </h2>
        <p className="text-sm text-primary-gray">{chef.designation}</p>
      </div>
    </div>
  );
};

export default ChefCard;
