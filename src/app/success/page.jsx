"use client";

// Packages
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/Step";
import { TextEffect } from "@/components/ui/text-effect";

const SuccessPage = () => {
  return (
    <div className="">
      <div className="container mt-[80px] min-h-[calc(100vh-180px)] flex flex-col-reverse md:flex-row items-center justify-center md:justify-around max-w-[1000px]">
        <div>
          <div className="flex items-center gap-x-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.2,
                  delay: 0.2,
                  type: "spring",
                  ease: "easeIn",
                },
              }}
            >
              <CheckIcon
                delay={0.2}
                className="h-7 w-7 bg-tourHub-green-dark rounded-full text-white p-1"
              />
            </motion.div>
            <motion.h1
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.2,
                  delay: 0.2,
                  type: "spring",
                  ease: "easeIn",
                },
              }}
              className="font-inter text-27px font-semibold"
            >
              Payment successful
            </motion.h1>
          </div>
          <div className="max-w-[500px] text-14px text-tourHub-gray mt-4">
            <TextEffect per="word" preset="fade">
              Your tour package booking was successful! Get ready for an amazing
              journey. You will receive a confirmation email with your trip
              details shortly. Thank you for choosing us for your travel
              adventure!
            </TextEffect>
          </div>
          <Link href="/">
            <Button className="bg-tourHub-green-dark mt-6 hover:bg-tourHub-green-hover">
              Back to Home
            </Button>
          </Link>
        </div>
        <motion.div
          initial={{
            scale: 0.9,
          }}
          animate={{
            scale: 1,
            transition: {
              duration: 0.5,
              type: "tween",
              ease: "easeOut",
            },
          }}
        >
          <Image
            src="/celebration.png"
            alt="celebration"
            width={400}
            height={400}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessPage;
