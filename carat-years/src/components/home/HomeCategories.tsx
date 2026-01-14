import { useProductCategorys } from "@/hooks/useProductsCategory";
import Heading from "../ui/Heading";
import Img from "../ui/Img";
import type { TProductCategory } from "@/types/api";

export default function CategoriesSection() {
  const { data } = useProductCategorys();

  return (
    <section className="bg-white py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Heading>
          Shop By Categories
        </Heading>

     

        {/* Or if you want to map from API data dynamically */}
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 py-6">
          {data?.data?.slice(0, 6).map((category: TProductCategory, idx: number) => (
            <div key={idx} className="group overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl">
              <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]">
                <Img
                  dynamic
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-start justify-center">
                  <div className="bg-white/95 backdrop-blur-sm px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full shadow-lg">
                    <span className="text-gray-900 font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                      {category.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      
      </div>
    </section>
  );
}