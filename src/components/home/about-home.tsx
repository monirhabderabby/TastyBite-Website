"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import aboutImg from "../../../public/images/about-us.png";
import ButtonPrimary from "../common/button/buttonPrimary";
import SectionHeader from "../common/sectionHeader/sectionHeader";
import Link from "next/link";

const AboutHome = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <div className="my-6 md:my-20 container" ref={ref}>
      <div className="flex flex-col md:flex-row items-center justify-between xl:justify-center gap-6 xl:gap-80">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="mb-5">
            <SectionHeader
              heading="ABOUT TASTYBITE"
              title="Delicious Restaurant"
              textPosition="left"
            />
          </div>
          <p className="text-sm mb-6 text-primary-black max-w-[480px] text-center md:text-left">
            Founded on a passion for delivering not just foods, but memorable
            moments, TastyBite is more than a food place—it&apos;s a culinary
            journey. Join us in savoring the artistry of flavors, where every
            bite tells a story of quality, creativity, and devotion. Come,
            indulge in the pizza experience you deserve. Welcome to the home of
            extraordinary foods, where every slice is an invitation to culinary
            delight.
          </p>
        <Link href={'/about'}><div className="flex justify-center md:justify-start items-center">
            <ButtonPrimary text="View More" />
          </div></Link>  
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        >
          <Image src={aboutImg} alt="About image" width={300} height={578} />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutHome;
