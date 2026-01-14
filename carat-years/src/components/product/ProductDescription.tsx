import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function ProductDescription({
  product,
}: {
  product: { title: string; description: string };
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="rounded-lg bg-[#F8F2E7] p-4">
      <button
        className="mb-4 flex w-full items-center justify-between text-lg font-semibold"
        onClick={() => setShow(!show)}
      >
        <span className="text-black">Product Description</span>
        {show ? (
          <ChevronUp className="h-5 w-5 text-black" />
        ) : (
          <ChevronDown className="h-5 w-5 text-black" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          show ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <h4 className="mb-2 font-semibold text-[#957127]">{product?.title}</h4>
        <p className="mb-2">{product?.description}</p>
      </div>
    </div>
  );
}
