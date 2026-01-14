import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Heading from "../ui/Heading";
import { useProductsByTag } from "@/hooks/useProducts";
import ProductCard from "../product/ProductCard";

export default function ExploreCollection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const {
    data: productsData,
    isLoading,
    refetch,
  } = useProductsByTag(selectedCategory);

  useEffect(() => {
    refetch();
  }, [selectedCategory]);

  const products = productsData?.data || [];

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Heading>Explore Our Kids Collections</Heading>

        <div className="my-10 flex flex-wrap justify-center gap-4">
          {["All", "Gold", "Necklaces", "Earrings", "Rings"].map(
            (category) => (
              <div
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer px-6 py-2 text-sm transition-colors duration-300 ${
                  selectedCategory === category
                    ? "bg-white text-[#CAB996] underline"
                    : "bg-transparent text-[#CAB996] hover:underline"
                }`}
              >
                {category}
              </div>
            ),
          )}
        </div>

        {isLoading && (
          <p className="text-center text-[#CAB996]">Loading products...</p>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto place-items-center">
          {products?.length ? (
            products.map((p: any) => <ProductCard key={p._id} product={p} />)
          ) : (
            <p className="col-span-full text-center text-[#CAB996]">
              No products found.
            </p>
          )}
        </div>

        <div className="mt-15 flex justify-center">
          <Button className="rounded-full border border-[#430045] bg-[#430045] px-12 py-4 text-lg font-medium text-white transition hover:bg-transparent hover:text-[#430045]">
            Explore Now
          </Button>
        </div>
      </div>
    </div>
  );
}
