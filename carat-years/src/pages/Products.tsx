import { useEffect, useState } from "react";
import CraftedByLook from "@/components/shared/CraftedByLook";
import { Button } from "@/components/ui/button";
import { Filter, Search, X } from "lucide-react";
import { useFilteredProducts } from "@/hooks/useProducts";
import ProductCard from "../components/product/ProductCard";
import { Sidebar } from "@/components/product/Sidebar";
import { useLocation } from "react-router";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [initialized, setInitialized] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const page = 1;

  const location = useLocation();

useEffect(() => {
  const params = new URLSearchParams(location.search);

  const q = params.get("q"); // category slug
  const tags = params.get("tags");
  const metal = params.get("metal");
  const shape = params.get("shape");
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");

  setFilters({
    categories: tags
      ? tags.split(",")
      : q
      ? [q]            // ✅ USE q AS CATEGORY
      : [],
    metal: metal ? metal.split(",") : [],
    shape: shape ? shape.split(",") : [],
    priceRange: [
      minPrice ? Number(minPrice) : 0,
      maxPrice ? Number(maxPrice) : 500000,
    ],
  });

  setSearchQuery(""); // ✅ q is NOT search text
  setInitialized(true);
}, [location.search]);



  const { data } = useFilteredProducts(
    {
      filters,
      search: searchQuery,
      page,
    },
    {
      enabled: initialized,
    }
  );

  // Close mobile filter on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileFilterOpen) {
        setIsMobileFilterOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileFilterOpen]);

  return (
    <div className="overflow-x-hidden min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-6 md:py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 md:mb-1 text-center">
            {/* <Heading >
              Custom Designs
            </Heading>
            <p className="mx-auto mt-4 sm:mt-6 md:mt-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-600 px-2 sm:px-4 md:px-0">
              The perfect accessory to elevate any outfit, diamond pendants
              should be a staple in any wardrobe. From a classic and delicate
              necklace to a statement piece, our wide collection of diamond
              pendants designs is available in white, yellow or rose gold and
              platinum.
            </p> */}
          </div>
        </div>
      </section>

      {/* Mobile Search & Filter Bar */}
      <section className="container mx-auto mb-4 sm:mb-6 px-4 sm:px-6 lg:hidden">
  <div className="flex items-center gap-2 sm:gap-3">
    <div className="relative flex-1">
      <span className="absolute inset-y-0 left-3 flex items-center text-[#957127]">
        {/* Fixed icon size - consistent across breakpoints */}
        <Search className="h-4 w-4 sm:h-5 sm:w-5" />
      </span>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-full border border-[#957127] pl-9 sm:pl-10 pr-8 sm:pr-10 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#957127] focus:border-[#957127]"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          {/* Fixed clear icon size */}
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}
    </div>
    <Button
      onClick={() => setIsMobileFilterOpen(true)}
      className="rounded-full border border-[#957127] bg-white px-3 py-2.5 text-[#957127] hover:bg-gray-50 min-w-11 sm:min-w-[60px]"
      aria-label="Open filters"
    >
      {/* Fixed filter icon size */}
      <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
      <span className="hidden sm:inline ml-2 text-sm">Filters</span>
    </Button>
  </div>
</section>

      {/* Desktop Search */}
      <section className="hidden lg:block container mx-auto mb-8 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-[#957127]">
              <Search size={20} />
            </span>
            <input
              type="text"
              placeholder="Search for products, categories, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#957127] pl-12 pr-10 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#957127]/20 focus:border-[#957127] shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-0 z-50 lg:hidden">
            <Sidebar
              onChange={setFilters}
              isMobile
              onClose={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </>
      )}

      {/* Main Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-72 xl:w-80 shrink-0">
            <div className="sticky top-6">
              <Sidebar onChange={setFilters} />
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1 w-full">
            {/* Results Header */}
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <h2 className="text-lg sm:text-xl font-semibold">Products</h2>
                {data?.data?.length ? (
                  <span className="text-xs sm:text-sm text-gray-500">
                    ({data.data.length} items)
                  </span>
                ) : null}
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1 sm:gap-2 text-sm text-[#957127] hover:text-[#7a5c20]"
              >
                <Filter size={16} />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-8">
              {data?.data?.length ? (
                data.data.map((product: any) => (
                  <div
                    key={product._id}
                    className="w-full flex justify-center sm:justify-start"
                  >
                    <div className="w-full max-w-[320px] sm:max-w-none sm:w-full">
                      <ProductCard product={product} />
                    </div>
                  </div>
                ))
              ) : initialized ? (
                <div className="col-span-full py-8 sm:py-12 md:py-16 text-center">
                  <div className="mx-auto max-w-md px-4">
                    <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                      <Search size={48} className="mx-auto opacity-50" />
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery("");
                        setFilters({});
                      }}
                      className="bg-[#957127] hover:bg-[#7a5c20] text-white px-4 py-2 text-sm"
                    >
                      Clear all filters
                    </Button>
                  </div>
                </div>
              ) : (
                // Loading Skeleton
                <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-gray-200 rounded-lg h-[280px] sm:h-80 md:h-[350px]"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Load More Button (Optional) */}
            {data?.data?.length && data?.total > data.data.length && (
              <div className="mt-8 sm:mt-10 md:mt-12 text-center">
                <Button
                  variant="outline"
                  className="border-[#957127] text-[#957127] hover:bg-[#957127] hover:text-white px-6 sm:px-8 py-2.5 sm:py-3"
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom Sections */}
      <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
       {/* <Testimonial /> */}
        <CraftedByLook />
      </div>
    </div>
  );
}