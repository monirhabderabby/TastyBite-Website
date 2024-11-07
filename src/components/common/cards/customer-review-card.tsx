import Image, { StaticImageData } from "next/image";

interface ReviewProps {
  review: {
    id: string;
    name: string;
    designation: string;
    image: StaticImageData;
    reviewText: string;
  };
}

const CustomerReviewCard = ({ review }: ReviewProps) => {
  return (
    <div>
      <p className="text-lg italic text-primary-gray text-center mb-[30px]">
        {review.reviewText}
      </p>
      <div className="flex justify-center">
        <Image
          src={review.image}
          alt="reviewer image"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <div className="text-center mt-5">
        <h4 className="text-xl text-primary-orange uppercase font-semibold">
          {review.name}
        </h4>
        <p className="text-base text-primary-gray">{review.designation}</p>
      </div>
    </div>
  );
};

export default CustomerReviewCard;
