import { setMenu } from "@/redux/features/filter/filterSlice";
import { TMenu } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

interface CategoryProps {
    menu: TMenu;
}

const SpecialCategoryCard = ({ menu }: CategoryProps) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleMenuChange = (_id: string) => {
        dispatch(setMenu(_id));
        router.push(`/foods`);
    };

    return (
        <div>
            <div className="rounded-full overflow-hidden">
                <Image
                    src={menu.image}
                    alt="Burgers"
                    width={390}
                    height={390}
                    className="hover:scale-125 transition-all duration-700 ease-in-out bg-primary-black"
                />
            </div>
            <p
                className="md:text-xl lg:text-2xl font-bold text-center mt-6 uppercase text-primary-black hover:text-primary-orange duration-300 cursor-pointer"
                onClick={() => handleMenuChange(menu._id)}
            >
                {menu.name}
            </p>
        </div>
    );
};

export default SpecialCategoryCard;
