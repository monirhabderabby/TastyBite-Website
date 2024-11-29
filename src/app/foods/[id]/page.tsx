import { TFood } from "@/types";
import SingleFoodContainer from "./_components/single-food-container";

export async function generateStaticParams() {
  const posts = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food`).then(
    (res) => res.json()
  );
  const ids = posts?.data?.map((item: TFood) => ({ id: item._id }));

  return ids;
}

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <section className="container mt-[100px] space-y-[100px] pb-[150px]">
      <SingleFoodContainer foodId={params.id} />
    </section>
  );
};

export default Page;
