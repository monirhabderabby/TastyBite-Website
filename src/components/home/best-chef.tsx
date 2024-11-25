import { TStaff } from "@/types";
import ChefCard from "../common/cards/chef-card";
import SectionHeader from "../common/sectionHeader/sectionHeader";
import BlackRubBG from "../ui/black-rub-bg";

const BestChef = async () => {
  let chefData = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/staff?limit=4`,
      { cache: "no-cache" }
    );
    const chefDataRes = await res.json();
    chefData = chefDataRes.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <BlackRubBG>
        <SectionHeader
          title="Meet our experts"
          heading="Our Best Chef"
          headingTextColor="text-white"
        />

        <div className="mt-[50px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
          {chefData.map((chef: TStaff) => (
            <ChefCard key={chef._id} chef={chef} />
          ))}
        </div>
      </BlackRubBG>
    </div>
  );
};

export default BestChef;
