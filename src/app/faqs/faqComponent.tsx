"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/common/sectionHeader/sectionHeader";

const faqItems = [
  {
    question: "Are your menu prices the same as those at the restaurant?",
    answer:
      "Yes, our menu prices are the same as those at the restaurant. There are no hidden charges, and the prices you see are what you pay.",
  },
  {
    question: "Can I order from different branches of the restaurant at the same time?",
    answer:
      "Yes, you can order from multiple branches in a single order. However, each branch's items will be prepared and delivered separately to ensure freshness and quality.",
  },
  {
    question: "Do you support online table reservations?",
    answer:
      "Yes, we offer online table reservations. You can easily book your table through our website or app by selecting the date, time, and number of guests.",
  },
  {
    question: "How long does delivery usually take?",
    answer:
      "Delivery times vary depending on your location and current demand. On average, orders are delivered within 30-45 minutes. You will receive an estimated delivery time when placing your order.",
  },
  {
    question: "Do you offer vegetarian and vegan options on the menu?",
    answer:
      "Yes, we have a wide selection of vegetarian and vegan options available. You can filter the menu to view only vegetarian or vegan dishes while browsing.",
  },
  {
    question: "What should I do if there's an issue with my order?",
    answer:
      "If there's any issue with your order, please contact our customer support team immediately. We are here to assist and will resolve any problems promptly. Reach us through our app, website, or support hotline.",
  },
];

export default function FaqComponent() {
  const [openItem, setOpenItem] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 bg-white">
      <SectionHeader
        heading=" Frequently Asked Questions"
        title="Got Questions? We&#39;ve Got Answers!"
        headingTextColor="text-black"
      />

      <motion.div
        className="space-y-4 mt-6"
        initial="closed"
        animate="open"
        variants={{
          open: {
            transition: { staggerChildren: 0.1, delayChildren: 0.3 },
          },
          closed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
          },
        }}
      >
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            className="border-b border-gray-200"
            variants={{
              open: {
                opacity: 1,
                y: 0,
                transition: {
                  y: { stiffness: 1000, velocity: -100 },
                },
              },
              closed: {
                opacity: 0,
                y: 50,
                transition: {
                  y: { stiffness: 1000 },
                },
              },
            }}
          >
            <button
              className="flex justify-between items-center w-full py-5 text-left text-gray-900 focus:outline-none"
              onClick={() => setOpenItem(openItem === index ? null : index)}
            >
              <span className="text-xl font-semibold">{item.question}</span>
              <motion.div
                animate={{ rotate: openItem === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-gray-500" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openItem === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="pb-5 text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
