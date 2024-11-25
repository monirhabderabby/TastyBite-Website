"use client";

import { motion } from "framer-motion";
import { Flower, Salad, Smile, Truck } from "lucide-react";
import SectionHeader from "../common/sectionHeader/sectionHeader";

const WhyBest = () => {
    const bestInfo = [
        {
            id: "1",
            title: "All kinds of Foods",
            text: "Embark on a culinary journey with our diverse menu offering all kinds of foods.",
            icon: Salad,
        },
        {
            id: "2",
            title: "Fresh Foods",
            text: "Savor the essence of freshness in every bite with tantalizing array of fresh foods.",
            icon: Flower,
        },
        {
            id: "3",
            title: "Best Taste",
            text: "Indulge your senses in the epitome of culinary pleasure with our offerings.",
            icon: Smile,
        },
        {
            id: "4",
            title: "On Time Delivery",
            text: "Experience the convenience of seamless service with our on-time delivery.",
            icon: Truck,
        },
    ];

    const stagger = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 1 },
        }),
    };

    return (
        <div className="py-[50px] md:py-[100px]">
            <div className="mb-[50px]">
                <SectionHeader
                    heading="Why We Are The Best?"
                    title="Our Strength"
                />
            </div>
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
                {bestInfo.map((info) => (
                    <motion.div
                        key={info.id}
                        custom={info.id}
                        initial="hidden"
                        whileInView="visible"
                        variants={stagger}
                        viewport={{ once: false }}
                        className="flex flex-col justify-center items-center"
                    >
                        <info.icon className="w-16 h-16 text-primary-orange mb-4" />
                        <h3 className="text-primary-black text-2xl mb-1">
                            {info.title}
                        </h3>
                        <p className="text-lg text-primary-black/50 text-center">
                            {info.text}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default WhyBest;
