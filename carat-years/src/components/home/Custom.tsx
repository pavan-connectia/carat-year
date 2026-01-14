import { Button } from "../ui/button";
import Heading from "../ui/Heading";

export default function Custom() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Heading>Custom Jewellery Design</Heading>

        <div className="relative my-12 overflow-hidden rounded-2xl bg-[#D7B388]">
          <div className="absolute top-10 right-10 h-24 w-24 animate-pulse rounded-full bg-linear-to-r from-amber-200 to-yellow-300 opacity-20 mix-blend-multiply"></div>

          <div className="grid lg:grid-cols-2">
            <div className="relative order-1 h-[300px] sm:h-[400px] lg:order-2 lg:h-full">
              <img
                src="/custom.png"
                alt="carat years"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="order-2 flex flex-col justify-center space-y-6 rounded-2xl bg-white/90 px-6 py-12 text-center shadow-md lg:order-1 lg:rounded-none lg:bg-transparent lg:px-16 lg:text-left lg:shadow-none">
              <h2 className="font-montserrat text-3xl leading-tight font-medium text-gray-900 sm:text-4xl lg:text-5xl">
                Born from a Vision to Redefine Luxury
              </h2>
              <p className="font-playfair text-base font-light text-gray-700 sm:text-lg">
                At Carat Years, we believe that every story deserves a signature
                piece. Our Custom Jewelry Design service transforms your ideas,
                memories.
              </p>
              <div className="pt-4">
                <Button
                  variant="outline"
                  className="font-inter rounded-full border border-[#430045] bg-[#430045] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-[#430045] sm:px-12 sm:py-4 sm:text-lg"
                >
                  Start your Custom Design
                </Button>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-lg sm:text-xl">
          Join us
          <span className="text-[#957127]"> @Caratyears</span>
        </p>
      </div>
    </div>
  );
}
