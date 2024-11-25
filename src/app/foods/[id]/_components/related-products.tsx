import FoodCart from "@/components/common/cards/food-card/food-card";
import FoodCardLoader from "@/components/common/skeleton-loader/food-card-loader";
import { useGetFoodByMenuQuery } from "@/redux/features/food/foodApi";
import { TFood } from "@/types";

const RelatedProducts = ({ food }: { food: TFood }) => {
    const { data: foodByMenu, isLoading } = useGetFoodByMenuQuery(
        food.menuId._id
    );
    const relatedFoods = foodByMenu?.data?.filter(
        (singleFood: TFood) => singleFood._id !== food._id
    );

    let content;
    if (isLoading) {
        content = (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 gap-y-12 mt-10">
                {[1, 2, 3, 4].map((n) => (
                    <FoodCardLoader key={n} />
                ))}
            </div>
        );
    } else if (relatedFoods?.length === 0) {
        content = (
            <div className="text-center py-40 text-primary-gray">
                <p className="text-lg font-semibold">
                    No related foods available.
                </p>
            </div>
        );
    } else if (relatedFoods.length > 0) {
        content = (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-10">
                {relatedFoods.map((food: TFood) => (
                    <FoodCart key={food._id} theme="light" food={food} />
                ))}
            </div>
        );
    }

    return (
        <div>
            <h1 className="uppercase text-primary-black text-[30px] font-bold md:text-[50px] text-center mt-10">
                Related products
            </h1>

            {content}
        </div>
    );
};

export default RelatedProducts;
