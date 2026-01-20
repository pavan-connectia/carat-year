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
  const [hasUserSelectedSize, setHasUserSelectedSize] = useState(false);

  const productType = product?.title?.toLowerCase()

  const shouldShowSize =
    (productType === "ring" || productType === "bracelet") &&
    selectedCaratObj?.size?.some((s: string) => s !== "N/A")

  const { caratOptions } = useMemo(() => {
    const masterCarat = selectedShapeObj?.carats?.[0]
    if (!masterCarat) return { caratOptions: [] }

    const cats = masterCarat.diamondCategory || []
    const hasLow = cats.some((d: string) => Number(d.slice(1)) <= 1)
    const hasHigh = cats.some((d: string) => Number(d.slice(1)) >= 2)

    const dynamicSteps = [
      { carat: 0.2 }, { carat: 0.4 }, { carat: 0.5 }, { carat: 0.6 }, { carat: 0.8 },
      { carat: 1 }, { carat: 1.4 }, { carat: 1.5 }, { carat: 1.6 }, { carat: 1.8 },
      { carat: 2 }, { carat: 2.2 }, { carat: 2.5 }, { carat: 2.6 }, { carat: 2.8 },
      { carat: 3 }, { carat: 3.5 }, { carat: 4 }, { carat: 4.5 }, { carat: 5 },
      { carat: 5.5 }, { carat: 6 }, { carat: 6.5 }, { carat: 7 }, { carat: 7.5 },
      { carat: 8 }, { carat: 8.5 }, { carat: 9 }, { carat: 9.5 }, { carat: 10 },
    ]

    if (hasLow && !hasHigh) return { caratOptions: selectedShapeObj.carats }
    if (!hasLow && hasHigh) return { caratOptions: dynamicSteps }
    if (hasLow && hasHigh) {
      const merged = [...selectedShapeObj.carats, ...dynamicSteps]
      const unique = Array.from(new Map(merged.map(c => [c.carat, c])).values())
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

  const metalBgMap: Record<string, string> = {
    "Yellow Gold": "/Metal/Yellow Gold.png",
    "Rose Gold": "/Metal/Rose Gold.png",
    "White Gold": "/Metal/White Gold.png",
    "Silver": "/Metal/White Gold.png",
    "Platinum": "/Metal/White Gold.png",
  };

  return (
    <div className="mx-2 my-4 lg:my-0 rounded-2xl bg-[#F8F2E7] border border-[#E8D9B5] shadow-lg overflow-hidden lg:mx-4 lg:mr-10">

      {/* HEADER SECTION */}
      <div className="px-4 py-4 lg:px-6 bg-linear-to-r from-amber-50 via-amber-50/80 to-transparent border-b border-amber-100/50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg lg:text-xl font-bold text-gray-900 leading-tight">
              {product?.description}
            </h2>
            <p className="mt-1 text-xs lg:text-sm text-gray-600 font-medium">
              Select metal, shape, carat & size
            </p>
          </div>

          {selectedVariation?.shapes?.length > 1 && (
            <div className="inline-flex items-center self-start gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-[#957127] rounded-sm">
              <Sparkles className="h-3 w-3 lg:h-3.5 lg:w-3.5 text-white" />
              <span className="text-[10px] lg:text-sm font-bold text-white tracking-wide uppercase">
                Customize Your Product
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-5 lg:px-8 lg:py-6 space-y-6">

        {/* METAL SELECTION */}
        <div className="flex flex-col lg:flex-row items-start gap-3 lg:gap-6">
          <div className="flex items-center gap-2 w-full lg:w-40 shrink-0">
            <div className="flex h-7 w-7 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-amber-100 shrink-0">
              <Sparkles className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-[#957127]" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">Metal</h3>
          </div>

          <div className="flex flex-wrap gap-4 flex-1">
            {product?.variations.map((v: any, i: number) => {
              const isSelected = selectedMetal === v.metal && selectedColor === v.color;
              const bgImage = metalBgMap[v.color] || "/Metal/White Gold.png";
              return (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedMetal(v.metal);
                    setSelectedColor(v.color);
                    setSelectedShape(null);
                    setSelectedCarat(null);
                    setSelectedSize(null);
                  }}
                  className="relative group flex flex-col items-center gap-1 cursor-pointer"
                >
                  <div className={`relative flex items-center justify-center h-10 w-10 lg:h-8 lg:w-8 rounded-full border-2 transition-all
                    ${isSelected ? "border-[#957127] scale-110 " : ""}`}
                    style={{ backgroundImage: `url("${bgImage}")`, backgroundSize: "cover" }}
                  >
                    <span className="text-[10px] font-bold text-gray-800">
                      {v.color === "Silver" ? "SL" : v.color === "Platinum" ? "PL" : v.metal}
                    </span>
                  </div>
                  <span className="lg:hidden text-[10px] text-gray-500 font-medium">{v.color}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-[#E8D9B5] to-transparent" />

        {/* SHAPE SELECTION */}
        <div className="flex flex-col lg:flex-row items-start gap-3 lg:gap-6">
          <div className="flex items-center gap-2 w-full lg:w-40 shrink-0">
            <div className="flex h-7 w-7 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-amber-100 shrink-0">
              <Gem className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-[#957127]" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">Shape</h3>
          </div>

          <div className="flex flex-wrap gap-2 flex-1">
            {selectedVariation?.shapes?.map((s: any, i: number) => (
              <button
                key={i}
                onClick={() => { setSelectedShape(s.shape); setSelectedCarat(null); setSelectedSize(null); }}
                className={`relative group p-2 rounded-lg border transition-all duration-200 cursor-pointer
                  ${selectedShape === s.shape ? "bg-white border-[#957127] shadow-md scale-105" : "border-transparent hover:bg-amber-50"}`}
              >
                <img src={`/shape/${s.shape}.png`} className="h-7 w-auto lg:h-8 object-contain" alt={s.shape} />
                <div className="hidden lg:block pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-gray-300 bg-white px-1 py-1 text-xs text-black shadow opacity-0 group-hover:opacity-100 transition">
                  {s.shape}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-[#E8D9B5] to-transparent" />

        {/* CARAT SELECTION */}
        <div className="flex flex-col lg:flex-row items-start gap-3 lg:gap-6">
          <div className="flex items-center gap-2 w-full lg:w-40 shrink-0">
            <div className="flex h-7 w-7 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-amber-100 shrink-0">
              <Weight className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-[#957127]" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">Carat</h3>
          </div>
          <div className="flex-1 w-full">
            {bespokeOptions.length > 0 && (
              <div className="flex mb-4 w-full">
                <div className="flex w-full p-1 border border-[#E8D9B5] bg-white/50 rounded-sm">
                  <button
                    onClick={() => setCaratRange("standard")}
                    className={`flex-1 px-2 py-1.5 text-[10px] lg:text-xs font-bold transition-all cursor-pointer text-center
                      ${caratRange === "standard" ? "bg-[#E8D9B5] text-[#957127] shadow-sm" : "text-gray-500"}`}
                  >
                    0.2ct - 3.0ct
                  </button>
                  <button
                    onClick={() => setCaratRange("bespoke")}
                    className={`flex-1 px-2 py-1.5 text-[10px] lg:text-xs font-bold transition-all cursor-pointer text-center
                      ${caratRange === "bespoke" ? "bg-[#E8D9B5] text-[#957127] shadow-sm" : "text-gray-500"}`}
                  >
                    3.0ct - 10.0ct
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:flex lg:flex-wrap gap-2">
              {displayedOptions.length > 0 ? (
                displayedOptions.map((c: any) => (
                  <button
                    key={c.carat}
                    onClick={() => {
                      setSelectedCarat(c.carat);
                      const obj = selectedShapeObj?.carats?.find((x: any) => x.carat === c.carat);
                      if (obj) setSelectedCaratObj(obj);
                    }}
                    className={`min-w-[50px] sm:min-w-[60px] px-2 sm:px-3 py-1.5 sm:py-2 border-2 text-xs font-bold transition-all cursor-pointer duration-200 ${selectedCarat === c.carat
                      ? "bg-[#957127] border-[#957127] text-white shadow-md scale-105"
                      : "border-[#E8D9B5] text-gray-600 hover:border-[#c9b386] hover:bg-amber-50"
                      }`}
                  >
                    {c.carat}
                  </button>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic py-2">No options in this range.</p>
              )}
            </div>
          </div>
        </div>

        {/* SIZE SELECTION */}
        {shouldShowSize && selectedCaratObj?.size && (
          <>
            <div className="h-px bg-linear-to-r from-transparent via-[#E8D9B5] to-transparent" />
            <div className="flex flex-col lg:flex-row items-start gap-3 lg:gap-6">
              <div className="flex items-center gap-2 w-full lg:w-40 shrink-0">
                <div className="flex h-7 w-7 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-amber-100 shrink-0">
                  <Ruler className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-[#957127]" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {product?.title?.toLowerCase().includes("ring") ? "Ring Size" : "Bracelet Size"}
                </h3>
              </div>

              <div className="flex-1 w-full">
                {product?.title?.toLowerCase().includes("ring") ? (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <button
                        onClick={() => setShowSizeSection(!showSizeSection)}
                        className="relative flex items-center w-full px-4 py-3 border-2 border-[#E8D9B5]
             transition-all cursor-pointer"
                      >
                        <span className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-gray-700 text-center">
                          {hasUserSelectedSize ? `Size ${selectedSize}` : "Choose your size"}
                        </span>


                        <span className="ml-auto">
                          {showSizeSection ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      </button>


                      <button
                        onClick={() => navigate("/ring-size-guide")}
                        className="flex items-center gap-1 text-[10px] lg:text-xs text-[#957127] font-bold hover:underline shrink-0"
                      >
                        <ExternalLink className="h-3 w-3" /> Size Guide
                      </button>
                    </div>

                    {showSizeSection && (
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 animate-in fade-in slide-in-from-top-2">
                        {selectedCaratObj.size.map((s: string) => (
                          <button
                            key={s}
                            onClick={() => { setSelectedSize(s); setHasUserSelectedSize(true); setShowSizeSection(false); }}
                            className={`px-2 py-2 border-2 text-xs font-semibold transition-all ${selectedSize === s ? "bg-[#957127] border-[#957127] text-white" : "border-[#E8D9B5] bg-white text-gray-700"}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedCaratObj.size.map((s: string) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2 border-2 text-sm font-semibold transition-all ${selectedSize === s ? "bg-[#957127] border-[#957127] text-white" : "border-[#E8D9B5] bg-white text-gray-700"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}