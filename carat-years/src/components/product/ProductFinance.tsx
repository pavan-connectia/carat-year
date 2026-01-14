import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const financeItems = [
  {
    label: "Finance From 2,999/Month",
    content: "Details about finance plan...",
  },
  {
    label: "Choose Your Finance Product",
    content: "Free Finance (6 Months)",
  },
  { label: "Deposit Percentage", content: "35%" },
  { label: "Amount of Deposit", content: "$ 523.25" },
  { label: "Jewellery Insurance", content: "Insurance options here" },
];

export default function ProductFinance() {
  const [openFinanceIndex, setOpenFinanceIndex] = useState<number | null>(null);
  return (
    <div className="rounded-lg bg-[#F8F2E7]">
      {financeItems.map((item, idx) => (
        <div key={idx}>
          <button
            className="mb-4 flex w-full items-center justify-between p-4 text-lg font-semibold"
            onClick={() =>
              setOpenFinanceIndex(openFinanceIndex === idx ? null : idx)
            }
          >
            <span className="text-black">{item.label}</span>
            {openFinanceIndex === idx ? (
              <ChevronUp className="h-5 w-5 text-black" />
            ) : (
              <ChevronDown className="h-5 w-5 text-black" />
            )}
          </button>
          <dl className="mb-4 h-0.5 w-full bg-[#D2B477]"></dl>

          <div
            className={`overflow-hidden transition-all duration-500 ${
              openFinanceIndex === idx
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <p className="px-2 py-2 text-gray-700">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
