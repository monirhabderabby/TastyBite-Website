import chef from "../../../public/images/chef-1.webp";
import ChefCard from "../common/cards/chef-card";
import SectionHeader from "../common/sectionHeader/sectionHeader";
import BlackRubBG from "../ui/black-rub-bg";

const BestChef = () => {
  const chefData = [
    {
      id: "1",
      name: "Chef John",
      designation: "Sous Chef",
      image: chef,
    },
    {
      id: "2",
      name: "Julia Child",
      designation: "Sous Chef",
      image: chef,
    },
    {
      id: "3",
      name: "Abdullah Kafi",
      designation: "Sous Chef",
      image: chef,
    },
    {
      id: "4",
      name: "Sahabuddin",
      designation: "Sous Chef",
      image: chef,
    },
  ];
  return (
    <div>
      <BlackRubBG>
        <SectionHeader
          title="Meet our experts"
          heading="Our Best Chef"
          headingTextColor="text-white"
        />

        <div className="mt-[50px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
          {chefData.map((chef) => (
            <ChefCard key={chef.id} chef={chef} />
          ))}
        </div>
      </BlackRubBG>
    </div>
  );
};

export default BestChef;
