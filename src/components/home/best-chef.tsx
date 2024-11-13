/* eslint-disable @typescript-eslint/no-explicit-any */

import ChefCard from "../common/cards/chef-card";
import SectionHeader from "../common/sectionHeader/sectionHeader";
import BlackRubBG from "../ui/black-rub-bg";

const BestChef = async() => {
let chefData = [];
try{
  const chefRes =await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/staff?designation=chef`);
   chefData = await chefRes.json().then((data) => data.data);
  
       
}catch(err){
  console.log(err);
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
          {chefData.map((chef:any) => (
            <ChefCard key={chef._id} chef={chef} />
          ))}
        </div>
      </BlackRubBG>
    </div>
  );
};

export default BestChef;
