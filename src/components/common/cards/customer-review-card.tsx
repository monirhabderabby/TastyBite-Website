import { TFoodFeedback } from "@/types";
import Image, { StaticImageData } from "next/image";

const CustomerReviewCard = ({
  review,
  image,
}: {
  review: TFoodFeedback;
  image: StaticImageData;
}) => {
  return (
    <div>
      <p className="text-lg italic text-primary-gray text-center mb-[30px]">
        {review?.review || "I love the food and the service was great"}
      </p>
      <div className="flex justify-center">
        <Image
          src={review?.user?.image || image}
          alt="reviewer image"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <div className="text-center mt-5">
        <h4 className="text-xl text-primary-orange uppercase font-semibold">
          {review?.user?.name || "user"}
        </h4>
        <p className="text-base text-primary-gray">
          {review?.user?.role || "customer"}
        </p>
      </div>
    </div>
  );
};

export default CustomerReviewCard;
