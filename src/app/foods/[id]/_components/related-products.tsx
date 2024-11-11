import FoodCart from "@/components/common/cards/food-card/food-card";
import { TFood } from "@/types";

const RelatedProducts = ({ foods }: { foods: TFood[] }) => {
    console.log(foods);
    return (
        <div>
            <h1 className="uppercase text-primary-black text-[30px] font-bold md:text-[50px] text-center">
                Related products
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-10">
                {foods.slice(0, 4).map((food) => (
                    <FoodCart key={food._id} theme="light" food={food} />
                ))}
                {/* <FoodCart theme="light" />
                <FoodCart theme="light" />
                <FoodCart theme="light" />
                <FoodCart theme="light" /> */}
            </div>
        </div>
    );
};

export default RelatedProducts;
