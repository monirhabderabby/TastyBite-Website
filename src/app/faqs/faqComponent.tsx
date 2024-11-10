"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FaqComponent() {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqItems = [
    {
      question: "ARE YOUR MENU PRICES THE SAME AS THOSE AT THE RESTAURANT?",
      answer:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    },
    {
      question: "CAN I ORDER FROM DIFFERENT RESTAURANT AT THE SAME TIME?",
      answer: "Content for this question goes here.",
    },
    {
      question: "DOES HUB SUPPORT BOTH ELEMENTOR AND WP BAKERY PAGE BUILDER?",
      answer: "Content for this question goes here.",
    },
    {
      question: "CAN I ORDER FROM DIFFERENT RESTAURANT AT THE SAME TIME?",
      answer: "Content for this question goes here.",
    },
    {
      question: "DOES HUB SUPPORT BOTH ELEMENTOR AND WP BAKERY PAGE BUILDER?",
      answer: "Content for this question goes here.",
    },
    {
      question: "ARE YOUR MENU PRICES THE SAME AS THOSE AT THE RESTAURANT?",
      answer: "Content for this question goes here.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 bg-white">
      <h2 className="text-center text-red-600 font-bold text-sm mb-2">
        FREQUENTLY ASK QUESTION
      </h2>
      <h1 className="text-center text-4xl font-black text-black mb-12">
        FREQUENTLY ASK QUESTION
      </h1>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              className="flex justify-between items-center w-full py-5 text-left text-black"
              onClick={() => setOpenItem(openItem === index ? null : index)}
            >
              <span className="text-xl font-bold">{item.question}</span>
              {openItem === index ? (
                <ChevronUp className="w-6 h-6 text-gray-500" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-500" />
              )}
            </button>
            {openItem === index && (
              <div className="pb-5 text-gray-600">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
