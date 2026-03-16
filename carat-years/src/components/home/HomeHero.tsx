import { Button } from "@/components/ui/button";
import { useHome } from "@/hooks/useHome";
import { useNavigate } from "react-router";
import Img from "../ui/Img";

export default function HomeHero() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useHome();

  const res = data?.data;

  if (isLoading) {
    return (
      <section className="relative overflow-hidden">
        <div className="grid h-full w-full bg-[#E6D7C2] lg:grid-cols-2">

          {/* Image Skeleton */}
          <div className="order-1 h-[300px] animate-pulse bg-gray-300 sm:h-[400px] lg:order-2 lg:h-full" />

          {/* Content Skeleton */}
          <div className="order-2 flex flex-col justify-center space-y-6 px-6 py-12 lg:order-1 lg:px-16">
            <div className="h-10 w-3/4 animate-pulse rounded bg-gray-300" />
            <div className="h-6 w-1/2 animate-pulse rounded bg-gray-300" />
            <div className="flex gap-4 pt-4">
              <div className="h-12 w-40 animate-pulse rounded-full bg-gray-300" />
              <div className="h-12 w-40 animate-pulse rounded-full bg-gray-300" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <section className="relative overflow-hidden">
      <div className="grid h-full w-full bg-[#E6D7C2] lg:grid-cols-2">
        <div className="relative order-1 h-[300px] sm:h-[400px] lg:order-2 lg:h-full">
          <img
            src="/home/jewelery1.png"
            alt="Woman wearing elegant gold jewelry"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="order-2 flex flex-col justify-center space-y-6 bg-white/90 px-6 py-12 text-center lg:order-1 lg:rounded-none lg:bg-transparent lg:px-16 lg:text-left">
          <h1 className="font-montserrat text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl xl:text-6xl">
            Celebrate Your
            <br />
            Story in Carats
          </h1>

          <p className="font-playfair text-base sm:text-lg">
            Life’s little big moments, Now in carats
          </p>

          <div className="font-inter flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center lg:justify-start">

            <Button
              variant="outline"
              className="rounded-full border border-purple-900 bg-[#430045] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-purple-900 sm:px-10 sm:py-4 sm:text-lg"
              onClick={() => navigate("product?q=new-arrivals")}

            >
              Shop New Arrivals
            </Button>
            <Button
              variant="outline"
              className="rounded-full border border-[#533D0E] bg-transparent px-8 py-3 text-base font-medium text-[#533D0E] transition hover:bg-[#533D0E] hover:text-white sm:px-10 sm:py-4 sm:text-lg"
              onClick={() => navigate("/product")}
            >
              Explore More
            </Button>
          </div>
        </div>
      </div>

      <div className="my-5 hidden w-full items-center justify-center lg:flex">
        <span className="h-[3px] w-16 bg-[#351043]"></span>
        <span className="mx-4 h-[3px] w-40 bg-[#351043]"></span>
        <span className="h-[3px] w-16 bg-[#351043]"></span>
      </div>
    </section>
  }

  return (
    <section className="relative overflow-hidden">
      <div className="grid h-full w-full bg-[#E6D7C2] lg:grid-cols-2">

        <div className="relative order-1 h-[300px] sm:h-[400px] lg:order-2 lg:h-full">
          <Img
            src={res?.hero?.image}
            alt="Woman wearing elegant gold jewelry"
            className="h-full w-full object-cover object-[center_top]"
          />
        </div>

        <div className="order-2 flex flex-col justify-center space-y-6 bg-white/90 px-6 py-12 text-center lg:order-1 lg:bg-transparent lg:px-16 lg:text-left">

          <h1 className="whitespace-pre-line font-montserrat text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl xl:text-6xl">
            {res?.hero?.title?.replace(/\\n/g, "\n")}
          </h1>

          <p className="whitespace-pre-line font-playfair text-base sm:text-lg">
            {res?.hero?.description?.replace(/\\n/g, "\n")}
          </p>

          <div className="font-inter flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center lg:justify-start">

            <Button
              variant="outline"
              className="rounded-full border border-purple-900 bg-[#430045] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-purple-900 sm:px-10 sm:py-4 sm:text-lg"
              onClick={() => res?.hero?.button1 && navigate(res.hero.button1)}
            >
              Shop New Arrivals
            </Button>

            <Button
              variant="outline"
              className="rounded-full border border-[#533D0E] bg-transparent px-8 py-3 text-base font-medium text-[#533D0E] transition hover:bg-[#533D0E] hover:text-white sm:px-10 sm:py-4 sm:text-lg"
              onClick={() => res?.hero?.button2 && navigate(res.hero.button2)}
            >
              Explore More
            </Button>

          </div>
        </div>
      </div>
    </section>
  );
}