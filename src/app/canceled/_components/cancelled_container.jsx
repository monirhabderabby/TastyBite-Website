"use client";

// Packages
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";
import { CloseIcon } from "@/components/ui/Step";
import { TextEffect } from "@/components/ui/text-effect";

const CancelledContainer = ({ packageId }) => {
    return (
        <div className="container mt-[80px] min-h-[calc(100vh-180px)] flex flex-col-reverse md:flex-row items-center justify-center md:justify-around md:max-w-[1000px]">
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
                        <CloseIcon className="h-8 w-8 bg-red-600" />
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
                        className="font-inter text-27px font-semibold text-red-600"
                    >
                        Payment rejected!
                    </motion.h1>
                </div>
                <div className="max-w-[500px] text-14px text-tourHub-gray mt-4">
                    <TextEffect per="word" preset="fade">
                        Your payment has been cancelled. We couldn&apos;t
                        process your payment. Please try again
                    </TextEffect>
                </div>
                <Link href={`/packages/${packageId}`}>
                    <Button className="bg-tourHub-green-dark mt-6 hover:bg-tourHub-green-hover">
                        Try Again
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
                        type: "spring",
                        ease: "easeOut",
                    },
                }}
            >
                <Image
                    src="/failed.jpg"
                    alt="celebration"
                    width={400}
                    height={400}
                    className="bg-gray-100"
                />
            </motion.div>
        </div>
    );
};

export default CancelledContainer;
