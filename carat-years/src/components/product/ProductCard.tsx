import { useState } from "react";
// import { Button } from "../ui/button";
import Img from "../ui/Img";
import { Heart } from "lucide-react";
import { Link } from "react-router";
import { useAddToWishlist } from "@/hooks/useWishlist";
// import { useAddToCart } from "@/hooks/useCart";
// import { toast } from "sonner";
// import useUserStore from "@/store/userStore";

type ProductCardProps = {
  product: any;
};

export default function ProductCard({ product }: ProductCardProps) {
  // const { token } = useUserStore();
  const { mutate } = useAddToWishlist();
  // const { mutate: addCartMutate } = useAddToCart();
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(() => {
    return Math.floor(Math.random() * (product?.variations?.length - 1 || 1));
  });


  const selectedVariation = product?.variations?.[selectedVariationIndex];
  const selectedShape = selectedVariation?.shapes?.[0] ?? null;
  const selectedImage = selectedShape?.images?.[0] ?? "/placeholder.png";
  const selectedCarat = selectedShape?.carats?.[0] ?? null;
  const selectedSize = selectedCarat?.sizes?.[0] ?? null;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);



  const price = selectedCarat?.totalAmt
    ? Math.round(selectedCarat.totalAmt)
    : "N/A";

  // const handleAddToCart = () => {
  //   if (!token) {
  //     toast.info("Login or signup to add item to cart");
  //     return;
  //   }

  //   if (
  //     !selectedVariation ||
  //     !selectedShape ||
  //     !selectedCarat ||
  //     !selectedSize
  //   ) {
  //     toast.error("Please select metal, shape, carat, and size");
  //     return;
  //   }

  //   const cartItem = {
  //     productId: product?._id,
  //     metal: selectedVariation?.metal,
  //     color: selectedVariation?.color,
  //     designType: product?.designType,
  //     style: product?.style,
  //     stone: product?.stone,
  //     shape: selectedShape?.shape,
  //     carat: selectedCarat?.carat,
  //     size: selectedSize,
  //     quantity: 1,
  //   };

  //   addCartMutate(cartItem);
  // };

  const uniqueVariations = product?.variations?.filter(
    (v: any, index: number, self: any[]) =>
      index ===
      self.findIndex(
        (item) =>
          item.color?.toLowerCase() === v.color?.toLowerCase()
      )
  );


  return (
    <div className="group relative max-w-[280px] min-w-[280px] overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Wishlist button */}
      {product?.isWishlisted ? (
        <div className="group absolute top-3 right-3 z-10 cursor-pointer p-2">
          <Heart className="h-5 w-5 fill-[#8B7D63] stroke-[#8B7D63] transition" />
        </div>
      ) : (
        <button
          type="button"
          title="Add to Wishlist"
          className="group absolute top-3 right-3 z-10 cursor-pointer p-2"
          onClick={() => {
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
              carat: selectedCarat?.carat,
              size: selectedSize?.size,
            };

            mutate(wishlistPayload);
          }}
        >
          <Heart className="h-5 w-5 stroke-[#8B7D63] transition hover:fill-[#8B7D63]" />
        </button>
      )}

      {/* Product Image */}
      <Link to={`/product/${product?.category?.slug}/${product?.slug}`}>
        <div className="flex h-64 items-center justify-center bg-gray-50">
          <Img
            dynamic
            src={selectedImage}
            alt={product?.description || "Product"}
            className="h-48 w-48 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-3 px-5 pt-5 pb-2 text-center">
        <h3 className="font-montserrat text-lg font-medium text-gray-900 line-clamp-1">
          {product?.description || "Untitled Product"}
        </h3>

        {/* Price Section */}
        <div className="font-playfair flex items-center justify-center gap-2">
          <span className="text-xl  text-gray-900">
            ₹{price.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center justify-center gap-2">
          {uniqueVariations?.map((v: any, i: number) => {
            const isSelected = i === selectedVariationIndex;
            const isHovered = i === hoveredIndex;

            return (
              <div
                key={i}
                className="relative"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <button
                  onClick={() => setSelectedVariationIndex(i)}
                  className={`
            size-5 rounded-full border shadow-sm transition cursor-pointer
            ${isSelected ? "border-gray-500 " : ""}
            ${isHovered ? "border-black" : ""}
          `}
                  style={{
                    background: v.color?.toLowerCase().includes("yellow")
                      ? "linear-gradient(to bottom, #E1CA98, #FDEFD0)"
                      : v.color?.toLowerCase().includes("white")
                        ? "linear-gradient(to bottom, #D9D9D9, #FFF2D6)"
                        : v.color?.toLowerCase().includes("rose")
                          ? "linear-gradient(to bottom, #FFE1E1, #FC9D9D)"
                          : "#f5f5f5",
                  }}
                />

                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-black shadow">
                    {v.color}
                  </div>
                )}
              </div>
            );
          })}
        </div>




        {/* Add to Cart Button
        <Button
          variant="outline"
          className="w-full rounded-full border border-[#957127] bg-transparent px-8 py-3 font-medium text-[#957127] transition hover:bg-[#957127] hover:text-white"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button> */}
      </div>
    </div>
  );
}
