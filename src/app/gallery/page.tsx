import { TFood } from "@/types";
import { Gallery } from "./_components/galleryComponent";

export type GalleryData = {
  _id: string;
  image: string;
  category: string;
  name: string;
};

const Page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch images. Please try again later.");
  }

  const responseData = await res.json();
  const data = responseData?.data as TFood[];

  const transformedData = data.flatMap((item: TFood) =>
    item.images.map((image: string) => ({
      _id: crypto.randomUUID(),
      image: image,
      category: item.menuId.name,
      name: item.name,
    }))
  );

  return (
    <div>
      <Gallery data={transformedData} />
    </div>
  );
};

export default Page;
