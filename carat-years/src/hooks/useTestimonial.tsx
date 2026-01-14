import { getTestimonials } from "@/api/testimonial";
import { useQuery } from "@tanstack/react-query";

export const useTestimonials = () => {
  return useQuery({
    queryFn: getTestimonials,
    queryKey: ["testimonials"],
  });
};
