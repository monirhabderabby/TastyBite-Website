import { Gallery } from "./_components/galleryComponent";

const Page = async () => {
  let allImages = [];
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food?fields=images`,
      { cache: "no-cache" }
    );
    const foodData = await data.json();

    allImages = foodData?.data?.flatMap((item: any) => item.images);
  } catch (err) {
    console.log(err);
  }

  return (
    <div>
      <Gallery images={allImages} />
    </div>
  );
};

export default Page;
