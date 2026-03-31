import { useMemo, useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Heart, Share2, ShoppingCart} from "lucide-react";
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
  selectedSizeObj,
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
  
  // Zoom states
  const [zoomLevel, ] = useState(1.5);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const zoomContainerRef = useRef<HTMLDivElement>(null);

  const allImages = useMemo(() => {
    const images: string[] = [];
    if (selectedShapeObj?.video) images.push(selectedShapeObj?.video);
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
    setIsZoomed(false);
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

  // Zoom handlers for hover
  const handleMouseEnter = () => {
    if (!allImages[currentIndex]?.includes(".mp4")) {
      setIsZoomed(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const websiteUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="container mx-auto px-4 py-12 relative">
      {isCalculating && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
          <img src="/loader.gif" className="h-50 w-50" />
        </div>
      )}
      <div className="flex flex-col gap-10 lg:flex-row">
        {/* LEFT : MEDIA - STICKY */}
        <div className="relative lg:sticky lg:top-24 lg:self-start flex flex-col items-center lg:w-[45%] mt-12">
          <div className="relative w-full max-w-2xl rounded-lg border p-6 shadow-lg flex items-center justify-center">
            <button onClick={() => setCurrentIndex((p) => Math.max(p - 1, 0))} disabled={currentIndex === 0} className="absolute left-2 z-10 rounded-full bg-white p-2 shadow disabled:opacity-50"><ArrowLeft /></button>
            
            
            <div 
              ref={zoomContainerRef}
              className="relative h-[420px] w-full max-w-xl flex items-center justify-center overflow-hidden"
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {mediaLoading && <div className="absolute inset-0 animate-pulse rounded-lg bg-gray-200" />}
              
              {allImages[currentIndex]?.includes(".mp4") ? (
                <video 
                  src={allImages[currentIndex]} 
                  autoPlay loop muted playsInline 
                  onLoadedData={() => setMediaLoading(false)} 
                  className={`h-full w-full rounded-lg object-contain transition-opacity ${mediaLoading ? "opacity-0" : "opacity-100"}`} 
                />
              ) : (
                <div 
                  ref={imageRef}
                  className="w-full h-full flex items-center justify-center"
                >
                  {isZoomed ? (
                    <div 
                      className="relative w-full h-full cursor-crosshair"
                      style={{
                        backgroundImage: `url(${allImages[currentIndex]})`,
                        backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                        backgroundSize: `${zoomLevel * 100}%`,
                        backgroundRepeat: 'no-repeat',
                        transition: 'background-size 0.1s ease'
                      }}
                    />
                  ) : (
                    <Img 
                      dynamic 
                      src={allImages[currentIndex]} 
                      alt={product?.title} 
                      onLoad={() => setMediaLoading(false)} 
                      className={`h-full w-full rounded-lg object-contain transition-opacity ${mediaLoading ? "opacity-0" : "opacity-100"}`}
                    />
                  )}
                </div>
              )}
            </div>
            
            <button onClick={() => setCurrentIndex((p) => Math.min(p + 1, allImages.length - 1))} disabled={currentIndex === allImages.length - 1} className="absolute right-2 z-10 rounded-full bg-white p-2 shadow disabled:opacity-50"><ArrowRight /></button>
          </div>
          
          {/* Thumbnail Strip */}
          <div className={`mt-6 flex w-full gap-4 overflow-x-auto no-scrollbar ${isFewImages ? "justify-center" : ""}`}>
            {allImages.map((src, idx) => (
              <div 
                key={idx} 
                onClick={() => setCurrentIndex(idx)} 
                className={`h-39 w-38 shrink-0 cursor-pointer rounded-lg border-2 overflow-hidden ${currentIndex === idx ? "border-[#957127]" : "border-gray-200"}`}
              >
                {src.includes(".mp4") ? (
                  <video src={src} muted className="h-full w-full object-cover" />
                ) : (
                  <Img dynamic src={src} alt="" className="h-full w-full object-cover" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT : DETAILS */}
        <div className="flex flex-col gap-6 lg:w-[55%] mt-12">
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

          <div className="rounded-2xl border border-[#E8D9B5] bg-linear-to-br from-[#F8F2E7] to-[#F4E8D6] shadow-md mx-2 lg:mx-4 p-4 my-4 lg:my-0">
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
                {token && (
                  <button
                    type="button"
                    title={product?.isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    onClick={() => {
                      if (product?.isWishlisted) {
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
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:px-4">
            <Button 
              className="h-16 rounded-2xl bg-[#351043] text-lg font-bold text-white shadow-xl transition-all hover:bg-[#4a165c] active:scale-95"
              onClick={() => { handleAddToCart(); navigate("/checkout"); }}
            >
              Buy Now
            </Button>
            
            <Button 
              variant="outline" 
              className="h-16 rounded-2xl border-2 border-[#351043] text-lg font-bold text-[#351043] transition-all hover:bg-[#351043] hover:text-white active:scale-95"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-3 h-5 w-5" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}