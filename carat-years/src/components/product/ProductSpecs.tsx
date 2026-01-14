"use client"

import { Sparkles, Ruler, Gem, Weight, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router";

export default function ProductSpecs({
  product,
  selectedMetal,
  setSelectedMetal,
  selectedColor,
  setSelectedColor,
  selectedShape,
  setSelectedShape,
  selectedCarat,
  setSelectedCarat,
  selectedSize,
  setSelectedSize,
  selectedVariation,
  selectedShapeObj,
  selectedCaratObj,
  setSelectedCaratObj,
}: any) {

  const navigate = useNavigate();
  const [caratRange, setCaratRange] = useState<"standard" | "bespoke">("standard");
  const [showSizeSection, setShowSizeSection] = useState(false);

  /* ----------------------------------------
     SIZE VISIBILITY (FIXED)
  ---------------------------------------- */
  const productType = product?.title?.toLowerCase()

  const shouldShowSize =
    (productType === "ring" || productType === "bracelet") &&
    selectedCaratObj?.size?.some((s: string) => s !== "N/A")

  /* ----------------------------------------
     CARAT MODE LOGIC (UNCHANGED)
  ---------------------------------------- */
  const { caratOptions } = useMemo(() => {
    const masterCarat = selectedShapeObj?.carats?.[0]
    if (!masterCarat) return { caratOptions: [] }

    const cats = masterCarat.diamondCategory || []
    const hasLow = cats.some((d: string) => Number(d.slice(1)) <= 5)
    const hasHigh = cats.some((d: string) => Number(d.slice(1)) >= 6)

    const dynamicSteps = [
      { carat: 0.2 },
      { carat: 0.4 },
      { carat: 0.5 },
      { carat: 0.6 },
      { carat: 0.8 },
      { carat: 1 },
      { carat: 1.4 },
      { carat: 1.5 },
      { carat: 1.6 },
      { carat: 1.8 },
      { carat: 2 },
      { carat: 2.2 },
      { carat: 2.5 },
      { carat: 2.6 },
      { carat: 2.8 },
      { carat: 3 },
      { carat: 3.5 },
      { carat: 4 },
      { carat: 4.5 },
      { carat: 5 },
      { carat: 5.5 },
      { carat: 6 },
      { carat: 6.5 },
      { carat: 7 },
      { carat: 7.5 },
      { carat: 8 },
      { carat: 8.5 },
      { carat: 9 },
      { carat: 9.5 },
      { carat: 10 },
    ]

    if (hasLow && !hasHigh) {
      return { caratOptions: selectedShapeObj.carats }
    }

    if (!hasLow && hasHigh) {
      return { caratOptions: dynamicSteps }
    }

    if (hasLow && hasHigh) {
      const merged = [...selectedShapeObj.carats, ...dynamicSteps]
      const unique = Array.from(
        new Map(merged.map(c => [c.carat, c])).values()
      )
      return { caratOptions: unique }
    }

    return { caratOptions: [] }
  }, [selectedShapeObj])

  const sortedCarats = useMemo(() => {
    return [...caratOptions].sort((a, b) => a.carat - b.carat);
  }, [caratOptions]);

  const standardOptions = sortedCarats.filter((c: any) => c.carat <= 3);
  const bespokeOptions = sortedCarats.filter((c: any) => c.carat > 3);

  const displayedOptions = caratRange === "standard" ? standardOptions : bespokeOptions;

  /* ----------------------------------------
     RENDER
  ---------------------------------------- */
  return (
    <div className="rounded-2xl bg-[#F8F2E7] border border-[#E8D9B5] shadow-lg overflow-hidden lg:mx-4 lg:mr-10">

      {/* HEADER */}
      <div className="px-6 py-4 bg-linear-to-r from-amber-50 to-transparent">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
            <Sparkles className="h-4 w-4 text-amber-700" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {product?.description}
            </h2>
            <p className="mt-1 text-xs text-gray-600">
              Select metal, shape, carat & size
            </p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Metal & Finish */}
        <div className="flex items-start gap-6 mb-6">
          <div className="flex items-center gap-2 w-40 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 shrink-0">
              <Sparkles className="h-4 w-4 text-amber-700" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">Metal & Finish</h3>
          </div>
          <div className="flex flex-wrap gap-3 flex-1">
            {product?.variations.map((v: any, i: number) => {
              let colorGradient = ""
              switch (v.color) {
                case "White Gold":
                  colorGradient = "bg-gradient-to-b from-[#F8F8F8] to-[#E5E5E5]"
                  break
                case "Yellow Gold":
                  colorGradient = "bg-gradient-to-b from-[#FFEBB7] to-[#D4AF37]"
                  break
                case "Rose Gold":
                  colorGradient = "bg-gradient-to-b from-[#FFD7D7] to-[#E8B4B4]"
                  break
                case "Platinum":
                  colorGradient = "bg-gradient-to-b from-[#E5E5E5] to-[#B8B8B8]"
                  break
                default:
                  colorGradient = "bg-gray-300"
              }
              const isSelected = selectedMetal === v.metal && selectedColor === v.color
              return (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedMetal(v.metal)
                    setSelectedColor(v.color)
                    setSelectedShape(null)
                    setSelectedCarat(null)
                    setSelectedSize(null)
                  }}
                  className="flex flex-col items-center gap-1 rounded-lg transition-all cursor-pointer"
                >
                  <div
                    className={`flex items-center justify-center h-7 w-7 rounded-full border-2 shadow-md transition-all ${isSelected ? "border-amber-700 scale-105" : "border-gray-300"
                      } ${colorGradient}`}
                  >
                    <span
                      className={`text-xs ${v.color === "Silver" || v.color === "Platinum"
                        ? "text-gray-700"
                        : "text-gray-800"
                        }`}
                    >
                      {v.color === "Silver" || v.color === "Platinum" ? "925" : v.metal}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-[#E8D9B5] to-transparent mb-6" />

        {/* Diamond Shape */}
        <div className="flex items-start gap-6 mb-6">
          <div className="flex items-center gap-2 w-40 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 shrink-0">
              <Gem className="h-4 w-4 text-amber-700" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">Diamond Shape</h3>
          </div>
          <div className="flex flex-wrap gap-2 flex-1">
            {selectedVariation?.shapes?.map((s: any, i: number) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedShape(s.shape)
                  setSelectedCarat(null)
                  setSelectedSize(null)
                }}
                className={`px-3 py-1.5 rounded-xl border-2 transition-all duration-200 cursor-pointer text-sm ${selectedShape === s.shape
                  ? "bg-amber-600 border-amber-600 text-white shadow-lg scale-105"
                  : "border-gray-300 text-gray-700 hover:border-amber-400 hover:bg-amber-50 hover:shadow-md"
                  }`}
              >
                {s.shape}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-[#E8D9B5] to-transparent mb-6" />

        {/* Carat Weight */}
        <div className="flex items-start gap-6 mb-6">
          <div className="flex items-center gap-2 w-40 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 shrink-0">
              <Weight className="h-4 w-4 text-amber-700" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">Carat Weight</h3>
          </div>
          <div className="flex-1">
            {/* Tabs row - Only show if there are bespoke options */}
            {bespokeOptions.length > 0 && (
              <div className="flex justify-center mb-2">
                <div className="flex p-1 bg-gray-100 rounded-xl border border-gray-200">
                  <button
                    onClick={() => setCaratRange("standard")}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${caratRange === "standard"
                      ? "bg-white text-amber-700 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    0.2ct - 3.0ct
                  </button>
                  <button
                    onClick={() => setCaratRange("bespoke")}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${caratRange === "bespoke"
                      ? "bg-white text-amber-700 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    3.0ct - 10.0ct
                  </button>
                </div>
              </div>
            )}

            {/* Display row */}
            <div className="flex flex-wrap gap-2">
              {displayedOptions.length > 0 ? (
                displayedOptions.map((c: any) => (
                  <button
                    key={c.carat}
                    onClick={() => {
                      setSelectedCarat(c.carat);
                      const obj = selectedShapeObj?.carats?.find(
                        (x: any) => x.carat === c.carat
                      );
                      if (obj) setSelectedCaratObj(obj);
                    }}
                    className={`min-w-[60px] px-3 py-2 rounded-xl border-2 text-xs font-bold transition-all duration-200 ${selectedCarat === c.carat
                      ? "bg-amber-600 border-amber-600 text-white shadow-md scale-105"
                      : "bg-white border-gray-200 text-gray-600 hover:border-amber-400 hover:bg-amber-50"
                      }`}
                  >
                    {c.carat} <span className="opacity-70 font-medium">ct</span>
                  </button>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic py-2">
                  No options available in this range for the selected shape.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SIZE - Collapsible section for rings, direct display for bracelets */}
        {shouldShowSize && selectedCaratObj?.size && (
          <>
            <div className="h-px bg-linear-to-r from-transparent via-[#E8D9B5] to-transparent mb-6" />

            {product?.title?.toLowerCase().includes("ring") ? (
              /* RING: Collapsible section */
              <>
                {/* Size Header - Always visible and clickable */}
                <div className="flex items-start gap-6 mb-4">
                  <div className="flex items-center gap-2 w-40 shrink-0">
                    <Ruler className="h-4 w-4 text-amber-700" />
                    <h3 className="font-semibold text-gray-900 text-sm">Ring size</h3>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      {/* Choose your size button with border */}
                      <button
                        onClick={() => setShowSizeSection(!showSizeSection)}
                        className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg border-2 border-gray-300 hover:border-amber-400 transition-all cursor-pointer"
                      >
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium text-gray-700">Choose your size</span>
                          <span className="text-xs text-gray-500 mt-1">
                            {selectedSize ? `Selected: Size ${selectedSize}` : "Click to select ring size"}
                          </span>
                        </div>
                        {showSizeSection ? (
                          <ChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </button>

                      {/* Ring Size Guide link - NO border */}
                      <button
                        onClick={() => navigate("/ring-size-guide")}
                        className="flex items-center gap-1 text-xs text-amber-800 font-bold hover:text-amber-600 underline underline-offset-4 transition-colors shrink-0"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Ring Size Guide
                      </button>
                    </div>
                  </div>
                </div>

                {/* Collapsible Size Content for Rings */}
                {showSizeSection && (
                  <div className="flex items-start gap-6">
                    <div className="w-40 shrink-0" /> {/* Spacer to align with label column */}
                    <div className="flex-1">
                      {/* Size Selection Grid - Flexible wrapping layout */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedCaratObj.size.map((s: string) => (
                          <button
                            key={s}
                            onClick={() => {
                              setSelectedSize(s);
                              setShowSizeSection(false); // Auto-collapse after selection
                            }}
                            className={`px-4 py-2 min-w-[60px] rounded-lg border-2 text-sm font-semibold transition-all ${selectedSize === s
                              ? "bg-amber-600 border-amber-600 text-white shadow-sm"
                              : "border-gray-300 hover:border-amber-400 text-gray-700 bg-white"
                              }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* BRACELET: Direct display of size buttons */
              <div className="flex items-start gap-6">
                <div className="flex items-center gap-2 w-40 shrink-0">
                  <Ruler className="h-4 w-4 text-amber-700" />
                  <h3 className="font-semibold text-gray-900 text-sm">Bracelet Size</h3>
                </div>
                <div className="flex flex-wrap gap-2 flex-1">
                  {selectedCaratObj.size.map((s: string) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-full border-2 text-sm font-semibold transition-all ${selectedSize === s
                        ? "bg-amber-600 border-amber-600 text-white shadow-sm"
                        : "border-gray-300 hover:border-amber-400 text-gray-700 bg-white"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}