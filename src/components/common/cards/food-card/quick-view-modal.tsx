import ModalImageSlider from "@/components/common/cards/food-card/modal-image-slider";
import QuickViewModalDesc from "@/components/common/cards/food-card/quick-view-modal-desc";
import Modal from "@/components/ui/modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TFood } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  food: TFood;
}

const QuickViewModal = ({ open, setOpen, food }: Props) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <ScrollArea className="h-[730px] ">
        <section className=" grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-7 pb-16 ">
          <div className="flex-1 ">
            <ModalImageSlider images={food.images} />
          </div>
          <div className="flex-1 px-3 py-2 md:py-4">
            <QuickViewModalDesc food={food} />
          </div>
        </section>
      </ScrollArea>
    </Modal>
  );
};

export default QuickViewModal;
