import SectionHeader from "../common/sectionHeader/sectionHeader";
import BlackRubBG from "../ui/black-rub-bg";
import MenusContaner from "./menus-container";

const OurSpecialMenus = () => {
  return (
    <BlackRubBG placeholderImg={false}>
      <SectionHeader
        heading="Fresh from pizzon"
        title="Our Special Menu"
        headingTextColor="text-white"
      />
      <MenusContaner />
    </BlackRubBG>
  );
};

export default OurSpecialMenus;
