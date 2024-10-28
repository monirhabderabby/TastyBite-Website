import ModalImageSlider from "@/components/common/cards/food-card/modal-image-slider";
import QuickViewModalDesc from "@/components/common/cards/food-card/quick-view-modal-desc";

const FoodOverview = () => {
  return (
    <section className=" grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-7">
      <div className="flex-initial w-fit ">
        <ModalImageSlider
          selectedImageContainer="h-[250px] md:h-[300px] lg:h-[400px]"
          carouselItemClassName="basis-1/4 md:basis-1/6"
        />
      </div>
      <div className="flex-auto flex flex-col px-3 py-4 md:py-0">
        <QuickViewModalDesc />
        <div className="text-gray-400 mt-6 space-y-2">
          <p>Vendo: TastyBite</p>
          <p>Categories: Deserts, Our special menu</p>
          <p>Availability: Out Of Stock</p>
        </div>
      </div>
    </section>
  );
};

export default FoodOverview;
