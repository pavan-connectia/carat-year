import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Heading from "../ui/Heading";
import { useFaqs } from "@/hooks/useFaq";
import type { TFaq } from "@/types/api";

export default function FAQ() {
  const { data, isLoading } = useFaqs();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (isLoading) {
    return <div className="py-10 text-center">Loading FAQs...</div>;
  }

  return (
    <div className="container mx-auto my-15 px-5 sm:px-8 md:px-10">
      <div className="text-center">
        <Heading>Frequently Asked Questions</Heading>

        <div className="font-playfair mt-15 space-y-6">
          {data?.data?.map((faq: TFaq, index: number) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border py-3 shadow-sm hover:bg-amber-50 sm:text-lg"
            >
              <button
                className="font-playfair flex w-full items-center justify-between px-4 text-left font-medium text-black transition sm:text-lg"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 rounded-full bg-yellow-600 text-white transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="bg-amber-50 px-4 py-3 text-left text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
