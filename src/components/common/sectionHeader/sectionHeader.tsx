"use client";

import { motion } from "framer-motion";

interface Props {
  heading: string;
  title: string;
  headingTextColor?: string;
  textPosition?: "left" | "center" | "right";
}

const SectionHeader = ({
  heading,
  title,
  headingTextColor,
  textPosition,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <p
        className={`text-primary-orange text-center md:text-${
          textPosition ? textPosition : "center"
        } text-[20px] md:text-[24px] lg:text-[28px] font-pacifico mb-2 md:mb-3 lg:mb-5`}
      >
        {title}
      </p>
      <h2
        className={`${
          headingTextColor ? headingTextColor : "text-primary-black"
        } text-center md:text-${
          textPosition ? textPosition : "center"
        } text-3xl sm:text-4xl md:text-5xl uppercase font-bold tracking-wide`}
      >
        {heading}
      </h2>
    </motion.div>
  );
};

export default SectionHeader;
