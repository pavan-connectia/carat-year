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
        className="mb-4 flex w-full items-center justify-between text-lg font-semibold"
        onClick={() => setShow(!show)}
      >
        <span>Price Breakup</span>
        {show ? <ChevronUp /> : <ChevronDown />}
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          show ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <table className="w-full text-left text-sm">
          <thead className="text-[#957127]">
            <tr>
              <th className="px-4 py-2">Component</th>
              <th className="px-4 py-2">Rate</th>
              <th className="px-4 py-2">Qty/Wt</th>
              <th className="px-4 py-2">Final Value</th>
            </tr>
          </thead>

          <tbody>
            {/* Gold */}
            <tr>
              <td className="px-4 py-2 font-semibold">
                {selectedMetal} {selectedColor}
              </td>
              <td className="px-4 py-2">
                ₹{selectedSizeObj?.goldRate}
              </td>
              <td className="px-4 py-2">
                {selectedSizeObj?.goldWeight}g
              </td>
              <td className="px-4 py-2 font-semibold">
                ₹{selectedSizeObj?.goldValue?.toLocaleString()}
              </td>
            </tr>

            {/* Diamonds */}
            {selectedCaratObj?.diamondCategory?.map(
              (cat: string, index: number) => {
                const catNum = parseInt(cat.replace("d", ""));
                const isDynamic = catNum >= 6 && catNum <= 10;

                return (
                  <tr key={index}>
                    <td className="px-4 py-2 font-semibold">
                      Diamond ({cat})
                    </td>
                    <td className="px-4 py-2">
                      ₹{selectedCaratObj?.diamondRate?.[index]?.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      {isDynamic
                        ? selectedCarat
                        : selectedCaratObj?.diamondWeight?.[index]}{" "}
                      {isDynamic ? "ct" : "g"}
                    </td>
                    <td className="px-4 py-2 font-semibold">
                      ₹{calculatedDiamondBreakdown?.[index]?.toLocaleString()}
                    </td>
                  </tr>
                );
              }
            )}

            {/* Making Charges */}
            <tr>
              <td className="px-4 py-2 font-semibold">
                Making Charges
              </td>
              <td className="px-4 py-2">
                {selectedCaratObj?.labourRate} / gram
              </td>
              <td className="px-4 py-2">
                {selectedSizeObj?.goldWeight ?? "-"} g
              </td>
              <td className="px-4 py-2 font-semibold">
                ₹{selectedCaratObj?.labourAmt?.toLocaleString() ?? "-"}
              </td>
            </tr>

            {/* Gross Amount */}
            <tr>
              <td className="px-4 py-2 font-semibold">
                Gross Amount
              </td>
              <td className="px-4 py-2">-</td>
              <td className="px-4 py-2">-</td>
              <td className="px-4 py-2 font-semibold">
                ₹{selectedSizeObj?.grossValue?.toLocaleString() ?? "-"}
              </td>
            </tr>

            {/* Discount */}
            <tr>
              <td className="px-4 py-2 font-semibold">
                Discount Amount
              </td>
              <td>-</td>
              <td>-</td>
              <td className="px-4 py-2 font-semibold text-green-700">
                ₹{selectedSizeObj?.discountValue?.toLocaleString() ?? "-"}
              </td>
            </tr>

            {/* Total */}
            <tr className="border-t border-amber-200">
              <td className="px-4 py-2 font-bold">Total Net</td>
              <td></td>
              <td></td>
              <td className="px-4 py-2 font-bold">
                ₹{selectedSizeObj?.totalValue?.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
