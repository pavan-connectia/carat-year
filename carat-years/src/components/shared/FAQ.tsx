import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import Heading from "../ui/Heading";
import { useFaqs } from "@/hooks/useFaq";
import type { TFaq } from "@/types/api";
import { Button } from "@/components/ui/button"; // Assuming you have a button component
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const { data, isLoading } = useFaqs();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const INITIAL_COUNT = 6; 
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = data?.data || [];
  const isExpanded = visibleCount >= faqs.length;

  const handleShowMore = () => {
    if (isExpanded) {
      setVisibleCount(INITIAL_COUNT);

    } else {
      setVisibleCount(faqs.length);
    }
  };

  if (isLoading) {
    return <div className="py-20 text-center animate-pulse">Loading FAQs...</div>;
  }

  return (
    <div className="container mx-auto my-20 px-5 sm:px-8 md:px-10">
      <div className="text-center">
        <Heading>Frequently Asked Questions</Heading>

        {/* 2 Column Grid Layout */}
        <div className="font-playfair mt-12 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
          {faqs.slice(0, visibleCount).map((faq: TFaq, index: number) => (
            <div
              key={index}
              className={`h-fit overflow-hidden rounded-lg border transition-all duration-300 ${
                openIndex === index ? "border-amber-200 bg-amber-50/30 shadow-md" : "border-gray-100 bg-white hover:border-amber-100"
              }`}
            >
              <button
                className="font-playfair flex w-full items-center justify-between p-5 text-left transition-colors cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-playfair text-base font-medium text-black md:text-lg">
                  {faq.question}
                </span>
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  openIndex === index ? "bg-yellow-600 text-white rotate-180" : "bg-gray-100 text-gray-500"
                }`}>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border-t border-amber-100/50 px-5 py-4 text-left text-sm leading-relaxed text-gray-600 md:text-base">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {faqs.length > INITIAL_COUNT && (
          <div className="mt-12 flex justify-center">
            <Button
              onClick={handleShowMore}
              variant="outline"
              className="group flex items-center gap-2 border-yellow-600 px-8 py-6 text-yellow-700 hover:bg-yellow-600 hover:text-white"
            >
              {isExpanded ? (
                <>
                  <Minus className="h-4 w-4" /> Show Less
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" /> Show More
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}