import SingleFoodContainer from "./_components/single-food-container";

const Page = ({ params }: { params: { id: string } }) => {
    return (
        <section className="container mt-[100px] space-y-[100px] pb-[150px]">
            <SingleFoodContainer foodId={params.id} />
        </section>
    );
};

export default Page;
