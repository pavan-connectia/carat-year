import { Button } from "@/components/ui/button";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden">
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
            >
              Shop New Arrivals
            </Button>
            <Button
              variant="outline"
              className="rounded-full border border-[#533D0E] bg-transparent px-8 py-3 text-base font-medium text-[#533D0E] transition hover:bg-[#533D0E] hover:text-white sm:px-10 sm:py-4 sm:text-lg"
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
  );
}
