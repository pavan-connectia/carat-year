import { useMemo, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Heart, Share2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import Img from "../ui/Img";
import { useAddToCart } from "@/hooks/useCart";
import ProductSpecs from "./ProductSpecs";
import useUserStore from "@/store/userStore";
import { useAddToWishlist } from "@/hooks/useWishlist";

interface ProductInfoProps {
  product: any;
  selectedShapeObj: any;
  selectedCaratObj: any;
  selectedVariation: any;
  selectedColor: any;
  selectedShape: any;
  selectedMetal: any;
  selectedCarat: any;
  selectedSize: any;
  // ADDED THIS PROP
  selectedSizeObj: any;
  setSelectedMetal: (value: any) => void;
  setSelectedColor: (value: any) => void;
  setSelectedShape: (value: any) => void;
  setSelectedCarat: (value: any) => void;
  setSelectedSize: (value: any) => void;
  discountPreview: any;
  isCalculating: any;
}

export default function ProductInfo({
  product,
  selectedShapeObj,
  selectedCaratObj,
  selectedVariation,
  selectedColor,
  selectedShape,
  selectedMetal,
  selectedCarat,
  selectedSize,
  selectedSizeObj, // Receive the dynamic calculation
  setSelectedMetal,
  setSelectedColor,
  setSelectedShape,
  setSelectedCarat,
  setSelectedSize,
  discountPreview,
  isCalculating,
}: ProductInfoProps) {
  const navigate = useNavigate();
  const { mutate: addCartMutate } = useAddToCart();
  const { token } = useUserStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaLoading, setMediaLoading] = useState(true);
  const { mutate } = useAddToWishlist();

  const allImages = useMemo(() => {
    const images: string[] = [];
    if (product?.video) images.push(product.video);
    if (selectedShapeObj?.images?.length) {
      images.push(...selectedShapeObj.images);
    } else if (selectedVariation?.shapes?.[0]?.images?.length) {
      images.push(...selectedVariation.shapes[0].images);
    } else if (product?.images?.length) {
      images.push(...product.images);
    } else if (product?.image) {
      images.push(product.image);
    } else {
      images.push("/placeholder.jpg");
    }
    return images;
  }, [product, selectedShapeObj, selectedVariation]);

  const isFewImages = allImages.length <= 4;

  useEffect(() => {
    setMediaLoading(true);
  }, [currentIndex]);

  const handleAddToCart = () => {
    const sizeRequired = product?.title === "Ring" || product?.title === "Bracelet";

    if (!selectedMetal || !selectedColor || !selectedShape || !selectedCarat || (sizeRequired && !selectedSize)) {
      toast.error("Please select all options");
      return;
    }

    addCartMutate({
      productId: product?._id,
      metal: selectedMetal,
      color: selectedColor,
      designType: product?.designType,
      style: product?.style,
      stone: product?.stone,
      shape: selectedShape,
      carat: selectedCarat,
      size: sizeRequired ? selectedSize : "N/A",
      quantity: 1,
    });
  };

  console.log(selectedCarat);

  const phone = "919870197167";
  const websiteUrl = typeof window !== "undefined" ? window.location.href : "";
  const text = `Hi, I need more information about ${product?.title} (Code: ${product?.productCode}). I would like to book an appointment.`;

  const message = `${text}\n\nWebsite: ${websiteUrl}`;
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;





  return (
    <div className="container mx-auto px-4 py-12 relative">
      {isCalculating && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
          <img src="/loader.gif" className="h-50 w-50" />
        </div>
      )}
      <div className="flex flex-col gap-10 lg:flex-row">
        {/* LEFT : MEDIA */}
        <div className="relative flex flex-col items-center lg:w-[45%] mt-12">
          <div className="relative w-full max-w-2xl rounded-lg border p-6 shadow-lg flex items-center justify-center">
            <button onClick={() => setCurrentIndex((p) => Math.max(p - 1, 0))} disabled={currentIndex === 0} className="absolute left-2 z-10 rounded-full bg-white p-2 shadow disabled:opacity-50"><ArrowLeft /></button>
            <div className="relative h-[420px] w-full max-w-xl flex items-center justify-center">
              {mediaLoading && <div className="absolute inset-0 animate-pulse rounded-lg bg-gray-200" />}
              {allImages[currentIndex]?.includes(".mp4") ? (
                <video src={allImages[currentIndex]} autoPlay loop muted playsInline onLoadedData={() => setMediaLoading(false)} className={`h-full w-full rounded-lg object-contain transition-opacity ${mediaLoading ? "opacity-0" : "opacity-100"}`} />
              ) : (
                <Img dynamic src={allImages[currentIndex]} alt={product?.title} onLoad={() => setMediaLoading(false)} className={`h-full w-full rounded-lg object-contain transition-opacity ${mediaLoading ? "opacity-0" : "opacity-100"}`} />
              )}
            </div>
            <button onClick={() => setCurrentIndex((p) => Math.min(p + 1, allImages.length - 1))} disabled={currentIndex === allImages.length - 1} className="absolute right-2 z-10 rounded-full bg-white p-2 shadow disabled:opacity-50"><ArrowRight /></button>
          </div>
          <div className={`mt-6 flex w-full gap-4 overflow-x-auto no-scrollbar ${isFewImages ? "justify-center" : ""}`}>
            {allImages.map((src, idx) => (
              <div key={idx} onClick={() => setCurrentIndex(idx)} className={`h-39 w-38 shrink-0 cursor-pointer rounded-lg border ${currentIndex === idx ? "border-2 border-[#957127]" : "border-[#957127]"}`}>
                {src.includes(".mp4") ? <video src={src} muted className="h-full w-full object-cover rounded-lg" /> : <Img dynamic src={src} alt="" className="h-full w-full object-cover rounded-lg" />}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT : DETAILS */}
        <div className="flex flex-col gap-6 lg:w-[55%]">
          <div className="flex items-start justify-between gap-4 mr-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{product?.title}</h1>
              <p className="text-gray-600 mt-2">{product?.description}</p>
            </div>
            {product?.reviews && (
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end"><span className="font-semibold text-lg">{product.reviews.averageRating?.toFixed(1)}</span><span className="text-yellow-500">★</span></div>
                <p className="text-sm text-gray-500">{product.reviews.numberOfReviews} reviews</p>
              </div>
            )}
          </div>

          <ProductSpecs
            product={product}
            selectedMetal={selectedMetal} setSelectedMetal={setSelectedMetal}
            selectedColor={selectedColor} setSelectedColor={setSelectedColor}
            selectedShape={selectedShape} setSelectedShape={setSelectedShape}
            selectedCarat={selectedCarat} setSelectedCarat={setSelectedCarat}
            selectedSize={selectedSize} setSelectedSize={setSelectedSize}
            selectedVariation={selectedVariation}
            selectedShapeObj={selectedShapeObj}
            selectedCaratObj={selectedCaratObj}
          />

          <div className="rounded-2xl border border-[#E8D9B5] bg-linear-to-br from-[#F8F2E7] to-[#F4E8D6] p-5 shadow-md sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              {/* Price Section */}
              <div className="flex-1">
                <p className="text-sm font-medium uppercase tracking-wide text-gray-600">Standard Price</p>

                {discountPreview?.appliedCode ? (
                  <div className="mt-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-500 line-through">
                          ₹{discountPreview.originalPrice.toLocaleString()}
                        </p>
                        <div className="mt-1 flex flex-wrap items-end gap-2">
                          <p className="text-3xl font-bold text-[#351043] sm:text-4xl">
                            ₹{discountPreview.finalPrice.toLocaleString()}
                          </p>
                          <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                            SAVE ₹{discountPreview.totalDiscount.toLocaleString()}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-green-700">
                          You saved ₹{discountPreview.totalDiscount.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                          {discountPreview.appliedCode}
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(discountPreview.appliedCode);
                            toast.success("Coupon code copied");
                          }}
                          className="rounded-md border border-green-300 bg-white px-3 py-1 text-xs font-semibold text-green-700 hover:bg-green-50"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* FIXED: Use fallback price calculation */
                  <p className="mt-3 text-3xl font-bold text-[#351043] sm:text-4xl">
                    ₹{(
                      selectedSizeObj?.grossValue ||
                      selectedCaratObj?.totalAmt ||
                      selectedShapeObj?.price ||
                      0
                    ).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row items-center gap-4 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  className="rounded-full p-2.5 hover:bg-amber-50 hover:border-[#957127]"
                  onClick={() => {
                    navigator.clipboard.writeText(websiteUrl);
                    toast.success("URL copied");
                  }}
                >
                  <Share2 className="h-4 w-4 text-957127" />
                </Button>

                <button
                  type="button"
                  title={product?.isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  onClick={() => {
                    if (product?.isWishlisted) {
                      // Handle remove from wishlist
                      return;
                    }

                    const wishlistPayload = {
                      image: selectedShape?.images?.[0] || "/placeholder.png",
                      title: product?.title || "Untitled Product",
                      slug: product?.slug,
                      category: product?.category?._id,
                      metal: selectedVariation?.metal,
                      color: selectedVariation?.color,
                      designType: selectedVariation?.designType,
                      style: selectedVariation?.style,
                      stone: selectedVariation?.stone,
                      shape: selectedShape?.shape,
                      carat: selectedCarat,
                      size: selectedSize,
                    };

                    mutate(wishlistPayload);
                  }}
                  className="rounded-full p-2.5 border border-[#957127] bg-white hover:bg-amber-50 transition"
                >
                  <Heart
                    className={`h-5 w-5 transition ${product?.isWishlisted
                      ? "fill-[#957127] stroke-[#957127]"
                      : "stroke-[#957127] hover:[#957127]"
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <Button className="w-full bg-[#351043] py-6 text-lg text-white hover:bg-transparent hover:text-[#351043] border border-[#351043]" onClick={() => { handleAddToCart(); navigate("/checkout"); }}>Buy Now</Button>
          <Button variant="outline" className="w-full py-6 text-lg border border-[#351043] hover:bg-[#351043] hover:text-white" onClick={() => { if (!token) { navigate("/signup"); return; } handleAddToCart(); }}>
            <ShoppingCart className="mr-2 " /> Add to Cart
          </Button>


          <Button
            asChild
            className="w-full bg-[#351043] py-6 text-lg text-white
             hover:bg-transparent hover:text-[#351043]
             border border-[#351043]"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book an Appointment
            </a>
          </Button>

        </div>
      </div>
    </div>
  );
}