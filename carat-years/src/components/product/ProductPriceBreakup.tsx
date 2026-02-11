import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function ProductPriceBreakup({
  selectedMetal,
  selectedColor,
  selectedCaratObj,
  selectedSizeObj,
  selectedCarat,
  calculatedDiamondBreakdown,
}: any) {
  const [show, setShow] = useState(false);

  return (
    <div className="rounded-lg bg-[#F8F2E7] p-4">
      <button
        className="flex w-full items-center justify-between text-lg font-semibold"
        onClick={() => setShow(!show)}
      >
        <span>Price Breakup</span>
        {show ? <ChevronUp /> : <ChevronDown />}
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          show ? "mt-4 max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <table className="w-full text-left text-sm border-collapse">
          <thead className="text-[#957127] border-b border-amber-200">
            <tr>
              <th className="py-2 text-left">Component</th>
              <th className="py-2 text-right">Rate</th>
              <th className="py-2 text-right">Weight</th>
              <th className="py-2 text-right">Final Value</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-amber-100/50">
            {/* Gold Row */}
            <tr>
              <td className="py-3 font-medium">
                {selectedMetal} {selectedColor}
              </td>
              <td className="py-3 text-right">
                ₹{selectedSizeObj?.goldRate?.toLocaleString()} / g
              </td>
              <td className="py-3 text-right">
                {selectedSizeObj?.goldWeight} g
              </td>
              <td className="py-3 text-right font-semibold">
                ₹{selectedSizeObj?.goldValue?.toLocaleString()}
              </td>
            </tr>

            {/* Diamonds Rows */}
            {selectedCaratObj?.diamondCategory?.map((cat: string, index: number) => {
              const catNum = parseInt(cat.replace("d", ""));
              const isDynamic = catNum >= 6 && catNum <= 10;

              return (
                <tr key={index}>
                  <td className="py-3 font-medium">Diamond ({cat})</td>
                  <td className="py-3 text-right">
                    ₹{selectedCaratObj?.diamondRate?.[index]?.toLocaleString()} / ct
                  </td>
                  <td className="py-3 text-right">
                    {isDynamic ? selectedCarat : selectedCaratObj?.diamondWeight?.[index]} ct
                  </td>
                  <td className="py-3 text-right font-semibold">
                    ₹{calculatedDiamondBreakdown?.[index]?.toLocaleString()}
                  </td>
                </tr>
              );
            })}

            {/* Making Charges Row */}
            <tr>
              <td className="py-3 font-medium">Making Charges</td>
              <td className="py-3 text-right">
                ₹{selectedCaratObj?.labourRate?.toLocaleString()} / g
              </td>
              <td className="py-3 text-right">
                {selectedSizeObj?.goldWeight ?? "-"} g
              </td>
              <td className="py-3 text-right font-semibold">
                ₹{selectedCaratObj?.labourAmt?.toLocaleString() ?? "-"}
              </td>
            </tr>

            {/* Gross Amount Row */}
            <tr className="bg-amber-50/30">
              <td className="py-3 font-bold">Gross Amount</td>
              <td className="py-3 text-right text-gray-400"></td>
              <td className="py-3 text-right text-gray-400"></td>
              <td className="py-3 text-right font-bold">
                ₹{selectedSizeObj?.grossValue?.toLocaleString() ?? "-"}
              </td>
            </tr>

            {/* Discount Row */}
            <tr>
              <td className="py-3 font-medium text-green-700">Discount</td>
              <td className="py-3 text-right text-gray-400"></td>
              <td className="py-3 text-right text-gray-400"></td>
              <td className="py-3 text-right font-semibold text-green-700">
                {selectedSizeObj?.discountValue > 0 
                  ? `- (₹${selectedSizeObj?.discountValue?.toLocaleString()})` 
                  : "₹0"}
              </td>
            </tr>

            {/* GST Row */}
            <tr>
              <td className="py-3 font-medium">GST (3%)</td>
              <td className="py-3 text-right text-gray-400"></td>
              <td className="py-3 text-right text-gray-400"></td>
              <td className="py-3 text-right font-semibold">
                {/* ₹{selectedSizeObj?.taxValue?.toLocaleString() ?? "-"} */}
              </td>
            </tr>

            {/* Total Row */}
            <tr className="border-t-2 border-amber-300 bg-amber-100/20">
              <td className="py-4 font-bold text-base">Total Net Value</td>
              <td className="py-4 text-right text-gray-400"></td>
              <td className="py-4 text-right text-gray-400"></td>
              <td className="py-4 text-right font-bold text-base">
                ₹{selectedSizeObj?.totalValue?.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}