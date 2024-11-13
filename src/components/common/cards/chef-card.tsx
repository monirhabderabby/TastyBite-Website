import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ChefProps {
  chef: {
    _id: string;
    name: string;
    designation: string;
    image: StaticImageData;
  };
}

const ChefCard = ({ chef }: ChefProps) => {
  return (
    <div>
      <div className="md:h-[300px] overflow-hidden h-[450px] ">
       <Image
        src={chef.image}
        alt={chef.name}
        width={400}
        height={500}
        
        // objectFit="cover"
        className="h-[450px] hover:scale-110 transition-all duration-500 ease-in-out w-full md:h-[300px] "

      />  
      </div>
     
      <div className="bg-white text-center py-6">
      <Link href={`/chefs/${chef._id}`}>
      <h2 className="text-xl text-primary-black uppercase font-semibold hover:text-primary-orange duration-300">
          {chef.name}
        </h2>
      </Link>  
        <p className="text-sm text-primary-gray">{chef.designation}</p>
      </div>
    </div>
  );
};

export default ChefCard;
