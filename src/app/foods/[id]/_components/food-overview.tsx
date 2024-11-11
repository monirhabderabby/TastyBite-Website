import ModalImageSlider from "@/components/common/cards/food-card/modal-image-slider";
import QuickViewModalDesc from "@/components/common/cards/food-card/quick-view-modal-desc";
import { TFood } from "@/types";

const FoodOverview = ({ food }: { food: TFood }) => {
    return (
        <section className=" grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-7">
            <div className="flex-initial w-full">
                <ModalImageSlider
                    selectedImageContainer="h-[250px] md:h-[300px] lg:h-[400px]"
                    carouselItemClassName="basis-1/4 md:basis-1/6"
                    images={food.images}
                />
            </div>
            <div className="flex-auto flex flex-col px-3 py-4 md:py-0">
                <QuickViewModalDesc food={food} />
                <div className="text-gray-400 mt-6 space-y-2">
                    <p>Vendor: TastyBite</p>
                    <p>Categories: Deserts, Our special menu</p>
                    <p>Availability: Out Of Stock</p>
                </div>
            </div>
        </section>
    );
};

export default FoodOverview;
