"use client";
// Packages
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// Local imports
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetFoodReviewByFoodQuery } from "@/redux/features/food/foodApi";
import { TFoodFeedback } from "@/types";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import ReviewForm from "./review-form";

const ReviewsContainer = ({ foodId }: { foodId: string }) => {
    const [open, setOpen] = useState<boolean>(false);

    const { data: reviews, isLoading } = useGetFoodReviewByFoodQuery(foodId);

    let content;

    if (isLoading) {
        content = (
            <p className="animate-pulse text-xl text-center text-primary-black my-20">
                Loading...
            </p>
        );
    } else if (reviews?.data?.length === 0) {
        content = (
            <div className="text-center py-20 text-primary-gray">
                <p className="text-lg font-semibold">
                    No reviews available for this food.
                </p>
            </div>
        );
    } else if (reviews?.data?.length > 0) {
        content = (
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
                {reviews?.data?.map((review: TFoodFeedback) => (
                    <Card className="p-6" key={review._id}>
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <Image
                                    src={review?.user?.image}
                                    alt="reviewer profile"
                                    width={84}
                                    height={84}
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="font-semibold text-lg uppercase">
                                            {review?.user?.name}
                                        </h3>
                                        <h4 className="text-base font-medium mt-1">
                                            {review.title}
                                        </h4>
                                    </div>

                                    <Rating
                                        style={{ maxWidth: 100 }}
                                        value={review.rating}
                                        readOnly
                                        halfFillMode="svg"
                                    />
                                </div>
                                <p className="mt-4 text-muted-foreground">
                                    {review.review}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        );
    }
    return (
        <div>
            <h1 className="text-primary-black text-[22px] font-semibold uppercase tracking-[3px] text-center">
                Customer reviews
            </h1>
            <div>
                <div className="mt-5 flex justify-center items-center gap-x-20">
                    <div>
                        <Rating
                            style={{ maxWidth: 180 }}
                            value={4.5}
                            readOnly
                            halfFillMode="svg"
                        />
                        <p className="text-gray-400 mt-1 ml-1">
                            Be the first to write a review
                        </p>
                    </div>
                    <div className="h-[50px] w-[2px] bg-gray-500/20" />
                    <div>
                        <Button
                            className="bg-primary-orange shadow-none rounded-none hover:bg-primary-orange/80"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? "Cancel review" : "Write a review"}
                        </Button>
                    </div>
                </div>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{
                                height: open ? "auto" : 0,
                                transition: {
                                    duration: 0.5,
                                    ease: "easeInOut",
                                },
                            }}
                            exit={{
                                height: 0,
                                transition: {
                                    duration: 0.5,
                                    ease: "easeInOut",
                                },
                            }}
                            className="w-full  mt-10"
                        >
                            <ReviewForm {...{ foodId, setOpen }} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Reviews */}
            {content}
        </div>
    );
};

export default ReviewsContainer;
