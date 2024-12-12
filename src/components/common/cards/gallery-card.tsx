"use client";

import { GalleryData } from "@/app/gallery/page";
import { motion } from "framer-motion";
import Image from "next/image";
import { memo, useState } from "react";

interface Props {
  item: GalleryData;
}

const GalleryCard = ({ item }: Props) => {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <motion.div
      key={item._id}
      className="relative group rounded-xl overflow-hidden border cursor-default"
      onHoverStart={() => setHovered(item._id)}
      onHoverEnd={() => setHovered(null)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="aspect-square relative">
        <Image
          src={item.image}
          alt={item.name}
          width={400}
          height={400}
          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {hovered == item._id && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-white"
          >
            <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
            <span className="text-orange-300">{item.category}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default memo(GalleryCard);
