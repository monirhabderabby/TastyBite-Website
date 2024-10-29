"use client";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
// @ts-expect-error
import ReactStars from "react-rating-stars-component";
import ReviewForm from "./review-form";

const ReviewsContainer = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <h1 className="text-primary-black text-[22px] font-semibold uppercase tracking-[3px] text-center">
        Customer reviews
      </h1>
      <div>
        <div className="mt-5 flex justify-center items-center gap-x-20">
          <div>
            <ReactStars count={5} size={20} edit={false} />
            <p className="text-gray-400">Be the first to write a review</p>
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
              <ReviewForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReviewsContainer;
