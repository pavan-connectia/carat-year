import { useState, useEffect, useCallback } from "react";
import Heading from "../ui/Heading";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useTestimonials } from "@/hooks/useTestimonial";
import Img from "../ui/Img";
import { motion, AnimatePresence } from "framer-motion";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isLoading, isError } = useTestimonials();
  
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const testimonials = data || [];
  const totalItems = testimonials.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, totalItems));
  }, [totalItems]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  useEffect(() => {
    if (totalItems === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, totalItems]);

  if (isLoading) return <div className="py-20 text-center">Loading Testimonials...</div>;
  if (isError || testimonials.length === 0) return null;

  const visibleTestimonials = Array.from({ length: itemsPerPage }).map((_, i) => {
    return testimonials[(currentIndex + i) % totalItems];
  });

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 md:px-16">
      <div className="mb-16 text-center">
         <Heading Tag="h5">Testimonials</Heading>
        <p className="mx-auto mt-4 max-w-3xl text-gray-600">
          Our team includes certified US tax professionals and IRS-authorized
          e-filing agents who understand the complexities of NRI taxation.
          Whether you're dealing with dual income, FATCA, or FBAR, we've got you
          covered with deep expertise and personal attention.
        </p>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="relative">
          <div className="grid grid-cols-1 gap-8 lg:gap-16 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleTestimonials.map((item, idx) => (
                <motion.div
                  key={`${item?._id}-${currentIndex}-${idx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-gray-50 border border-gray-100 transition-all hover:shadow-xl hover:bg-white"
                >
                  {/* SQUARE IMAGE AT TOP */}
                  <div className="relative aspect-3/2 w-full overflow-hidden">
                    <Img
                      dynamic
                      src={item?.image}
                      alt={item?.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                  </div>

                  {/* CONTENT BELOW IMAGE */}
                  <div className="flex flex-col p-8">

                    <div className="mb-4 flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < (item?.star || 5) ? "currentColor" : "none"} 
                        />
                      ))}
                      <span className="ml-2 text-xs font-bold text-gray-400">{(item?.star || 5).toFixed(1)}</span>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{item?.name}</h3>
                      <p className="text-sm font-semibold text-blue-600">{item?.role}</p>
                    </div>

                    <p className="text-gray-600 italic leading-relaxed">
                      “{item?.description}”
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              onClick={prevSlide}
              className="flex cursor-pointer h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-[#430045] transition-all hover:bg-[#430045] hover:text-white"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === i ? "w-8 bg-[#430045]" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="flex cursor-pointer   h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-[#430045] transition-all hover:bg-[#430045] hover:text-white"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;