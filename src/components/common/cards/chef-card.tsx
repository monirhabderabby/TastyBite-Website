import { TStaff } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface ChefProps {
  chef: TStaff;
}

const ChefCard = ({ chef }: ChefProps) => {
  return (
    <div className="w-[80%] md:w-full mx-auto">
      <div className="h-[350px] md:h-[320px]">
        <Image
          className="h-[350px] md:h-[320px] w-full object-cover"
          src={chef.image}
          alt={chef.name}
          width={500}
          height={350}
        />
      </div>

      <div className="bg-white text-center py-6">
        <Link href={`/chefs/${chef._id}`}>
          {" "}
          <h2 className="text-xl text-primary-black uppercase font-semibold hover:text-primary-orange duration-300">
            {chef.name}
          </h2>{" "}
        </Link>
        <p className="text-sm text-primary-gray">{chef.designation}</p>
      </div>
    </div>
  );
};

export default ChefCard;
