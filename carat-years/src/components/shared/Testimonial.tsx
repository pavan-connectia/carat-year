import { useState } from "react";
import Heading from "../ui/Heading";
import { ArrowLeft } from "lucide-react";
import { useTestimonials } from "@/hooks/useTestimonial";
import Img from "../ui/Img";

const Testimonial = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, isError } = useTestimonials();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <p>Loading testimonials...</p>
      </div>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <p>No testimonials available right now.</p>
      </div>
    );
  }

  const totalPages = data.length;
  const testimonial = data[currentPage];

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative max-w-full px-6 py-16 md:px-16">
      <div className="mb-10 text-center">
        <Heading Tag="h5">Testimonials</Heading>
        <p className="mx-auto mt-4 max-w-3xl text-gray-600">
          Our team includes certified US tax professionals and IRS-authorized
          e-filing agents who understand the complexities of NRI taxation.
          Whether you're dealing with dual income, FATCA, or FBAR, we've got you
          covered with deep expertise and personal attention.
        </p>
      </div>

      <div className="relative m-10 mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2">
        <div className="relative flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bottom-9 left-10 rounded-2xl border-3 border-[#957127] shadow-lg"></div>
            <div className="absolute inset-0 top-10 right-10 rounded-2xl border-3 border-[#957127] shadow-lg"></div>
            <Img
              dynamic
              src={testimonial?.image}
              alt={testimonial?.name}
              className="relative m-10 h-[280px] w-[280px] rounded-2xl object-cover shadow-lg sm:h-[320px] sm:w-[320px]"
            />
          </div>
        </div>

        <div className="relative flex flex-col justify-center space-y-6">
          <div className="p-8">
            <div className="mb-4 flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(testimonial?.star || 5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                ({testimonial?.star}.0 Stars)
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {testimonial?.name}
              </h3>
              <p className="text-sm text-gray-500">{testimonial?.role}</p>
            </div>

            <p className="text-gray-700 italic">“{testimonial?.description}”</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center space-x-6">
        <button
          onClick={prevPage}
          className="rounded-full border border-[#351043] bg-[#351043] p-3 font-medium text-white transition hover:bg-transparent hover:text-purple-900"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="px-1">
          {currentPage + 1} / {totalPages}
        </span>
        <button
          onClick={nextPage}
          className="rounded-full border border-[#6565655E] bg-[#fdfdfd] p-3 font-medium text-[#6565655E] transition hover:border-[#351043] hover:bg-transparent hover:text-[#351043]"
        >
          <ArrowLeft className="rotate-180" size={24} />
        </button>
      </div>

      <div className="mt-5 text-right">
        <div className="flex items-center justify-end space-x-2 text-3xl">
          <svg className="h-7 w-7" fill="#00B67A" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <h4 className="font-semibold text-gray-900">Trustpilot</h4>
        </div>
        <p className="mt-1 font-['Helvetica'] text-sm font-medium text-gray-700">
          Rated <span className="font-bold text-purple-900">4.6 / 5</span> based
          on <span className="font-bold text-purple-900">6,195 reviews</span>.
        </p>
      </div>
    </section>
  );
};

export default Testimonial;
