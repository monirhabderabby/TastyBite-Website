import ModalImageSlider from "@/components/common/cards/food-card/modal-image-slider";
import QuickViewModalDesc from "@/components/common/cards/food-card/quick-view-modal-desc";
import Modal from "@/components/ui/modal";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  
}

const QuickViewModal = ({ open, setOpen }: Props) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <section className=" grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-7">
        <div className="flex-1 ">
          <ModalImageSlider  />
        </div>
        <div className="flex-1 px-3 py-4">
          <QuickViewModalDesc  />
        </div>
      </section>
    </Modal>
  );
};

export default QuickViewModal;
