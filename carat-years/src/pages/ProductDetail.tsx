import CraftedByLook from "@/components/shared/CraftedByLook";
import { useNavigate, useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { useProductBySlug } from "@/hooks/useProducts";
import SimilarProducts from "@/components/product/SimilarProducts";
import ProductPriceBreakup from "@/components/product/ProductPriceBreakup";
import ProductInfo from "@/components/product/ProductInfo";
import { usePreviewDiscount } from "@/hooks/useDiscounts";
import FloatingWhatsapp from "@/components/shared/FloatingWhtasapp";
import { useAddToCart } from "@/hooks/useCart";
import { toast } from "sonner";
import useUserStore from "@/store/userStore";
import StickyProductBar from "@/components/product/StickyProductBar"; // This should be imported, not defined here

export default function ProductDetail() {
  const { id } = useParams();
  const { data } = useProductBySlug(id ?? "");
  const product = data?.data;
  const { mutate: addCartMutate } = useAddToCart();
  const navigate = useNavigate();
  const { token } = useUserStore();

  const [selectedMetal, setSelectedMetal] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedShape, setSelectedShape] = useState<any>(null);
  const [selectedCarat, setSelectedCarat] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [discountPreview, setDiscountPreview] = useState<any>(null);
  const { mutate: previewDiscount } = usePreviewDiscount();

  /* ---------- DERIVED DATA ---------- */

  const selectedVariation = useMemo(() => {
    if (!product?.variations) return null;
    return product.variations.find(
      (v: any) => v.metal === selectedMetal && v.color === selectedColor
    );
  }, [product, selectedMetal, selectedColor]);

  const selectedShapeObj = useMemo(() => {
    if (!selectedVariation?.shapes) return null;
    return selectedVariation.shapes.find(
      (s: any) => s.shape === selectedShape
    );
  }, [selectedVariation, selectedShape]);

  const selectedCaratObj = useMemo(() => {
    if (!selectedShapeObj?.carats) return null;
    const found = selectedShapeObj.carats.find((c: any) => c.carat === selectedCarat);
    return found || selectedShapeObj.carats[0];
  }, [selectedShapeObj, selectedCarat]);

  /* ---------- DYNAMIC PRICE CALCULATION ---------- */

  const calculatedDiamondDetails = useMemo(() => {
    if (!selectedCaratObj?.diamondCategory) return { total: 0, breakdown: [] };

    let total = 0;
    const breakdown = selectedCaratObj.diamondCategory.map((cat: string, index: number) => {
      const catNumber = parseInt(cat.replace("D", ""));
      const isDynamic = catNumber >= 6 && catNumber <= 10;

      // Dynamic: Rate * User Selection | Static: DB Amount
      const diamondRate = selectedCaratObj.diamondRate?.[index] || 0;
      const diamondAmt = selectedCaratObj.diamondAmt?.[index] || 0;
      const calculatedAmt = isDynamic
        ? diamondRate * (selectedCarat || 0)
        : diamondAmt;

      total += calculatedAmt;
      return calculatedAmt;
    });

    return { total, breakdown };
  }, [selectedCaratObj, selectedCarat]);

  /* ---------- AUTO DEFAULT SELECTION ---------- */

  useEffect(() => {
    if (product?.variations?.[0]) {
      setSelectedMetal(product.variations[0].metal);
      setSelectedColor(product.variations[0].color);
    }
  }, [product]);

  useEffect(() => {
    if (selectedVariation?.shapes?.[0]) {
      setSelectedShape(selectedVariation.shapes[0].shape);
    }
  }, [selectedVariation]);

  useEffect(() => {
    if (selectedShapeObj?.carats?.[0]) {
      setSelectedCarat(selectedShapeObj.carats[0].carat);
    }
  }, [selectedShapeObj]);

  useEffect(() => {
    if (selectedCaratObj?.size?.length) {
      setSelectedSize(selectedCaratObj.size[0]);
    }
  }, [selectedCaratObj]);

  /* ---------- DISCOUNT & PRICE OBJECT ---------- */

  useEffect(() => {
    if (!selectedCaratObj) return;
    
    const dynamicGross = (selectedCaratObj.metalAmt || 0) + 
                        (selectedCaratObj.labourAmt || 0) + 
                        calculatedDiamondDetails.total;

    previewDiscount(
      {
        code: "AUTO",
        priceDetails: {
          labourAmt: selectedCaratObj.labourAmt,
          diamondAmtTotal: calculatedDiamondDetails.total,
          totalAmt: dynamicGross,
        },
      },
      {
        onSuccess: (res) => setDiscountPreview(res.data),
        onError: () => setDiscountPreview(null),
      }
    );
  }, [selectedCaratObj, calculatedDiamondDetails, previewDiscount]);

  /* ---------- STICKY BAR SCROLL HANDLER ---------- */

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      const threshold = window.innerHeight * 0.2;
      setShowSticky(scrolled > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------- SELECTED SIZE OBJECT ---------- */

  const selectedSizeObj = useMemo(() => {
    if (!selectedCaratObj) return null;
    
    const grossValue = (selectedCaratObj.metalAmt || 0) + 
                      (selectedCaratObj.labourAmt || 0) + 
                      calculatedDiamondDetails.total;

    return {
      goldRate: selectedCaratObj.metalRate,
      goldWeight: selectedCaratObj.nWt,
      goldValue: selectedCaratObj.metalAmt,
      labourValue: selectedCaratObj.labourAmt,
      diamondValue: calculatedDiamondDetails.total,
      grossValue: grossValue,
      discountValue: discountPreview?.totalDiscount ?? 0,
      totalValue: discountPreview?.finalPrice ?? grossValue,
    };
  }, [selectedCaratObj, calculatedDiamondDetails, discountPreview]);

  /* ---------- ADD TO CART HANDLER ---------- */

  const handleAddToCart = () => {
    if (!token) {
      navigate("/signup");
      return;
    }

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

  return (
    <>
      <StickyProductBar
        visible={showSticky}
        product={product}
        selectedSizeObj={selectedSizeObj}
        onAddToCart={handleAddToCart}
        token={token ?? null}
        navigate={navigate}
      />

      <ProductInfo
        product={product}
        selectedShapeObj={selectedShapeObj}
        selectedCaratObj={selectedCaratObj}
        selectedVariation={selectedVariation}
        selectedColor={selectedColor}
        selectedShape={selectedShape}
        selectedMetal={selectedMetal}
        selectedCarat={selectedCarat}
        selectedSize={selectedSize}
        selectedSizeObj={selectedSizeObj}
        setSelectedMetal={setSelectedMetal}
        setSelectedColor={setSelectedColor}
        setSelectedShape={setSelectedShape}
        setSelectedCarat={setSelectedCarat}
        setSelectedSize={setSelectedSize}
        discountPreview={discountPreview}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="lg:w-1/2">
            {/* Left side content goes here - likely product images */}
          </div>
          <div className="flex flex-col gap-6 lg:w-1/2">
            <ProductPriceBreakup
              selectedMetal={selectedMetal}
              selectedColor={selectedColor}
              selectedCaratObj={selectedCaratObj}
              selectedSizeObj={selectedSizeObj}
              selectedCarat={selectedCarat}
              calculatedDiamondBreakdown={calculatedDiamondDetails.breakdown}
            />
          </div>
        </div>
      </div>
      
      <SimilarProducts tags={product?.tags ?? []} currentId={product?._id ?? ""} />
      <FloatingWhatsapp text={`I need more information about this product (Code: ${product?.productCode})`} />
      <CraftedByLook />
    </>
  );
}