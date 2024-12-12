"use client";
import SectionHeader from "@/components/common/sectionHeader/sectionHeader";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { GalleryData } from "../page";

// Local imports
const GalleryCard = dynamic(
  () => import("@/components/common/cards/gallery-card")
);

interface Props {
  data: GalleryData[];
}

export function Gallery({ data }: Props) {
  return (
    <div className="container pb-10">
      <div className="mt-24 -mb-20">
        <SectionHeader heading="Image Gallery" title="Enjoy View" />
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
          className="text-gray-600 max-w-2xl mx-auto mt-2 text-center"
        >
          Explore our mouthwatering collection of dishes and beverages, each
          crafted with passion and premium ingredients.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[120px] md:mt-[150px]">
        {data.map((item) => (
          <GalleryCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
