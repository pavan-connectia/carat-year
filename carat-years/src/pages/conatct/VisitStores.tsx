import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";

export default function VisitStores() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-r from-amber-50 to-orange-100 p-6">
      <div className="p-5">
        <Heading>Visit Our Stores</Heading>
        <p className="mb-8 text-center text-gray-600">
          Discover our exclusive jewellery collections at our flagship
          locations.
        </p>

        {/* Card Layout */}
        <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg md:flex-row">
          {/* Left side — Store info */}
          <div className="flex w-full flex-col justify-center p-8 text-gray-700 md:w-1/2">
            <h2 className="mb-6 text-2xl font-semibold text-[#533D0E]">
              Our Locations
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-1 text-lg font-semibold">Store 1 – Mumbai</h3>
                <p>123 Jewellery Street, Mumbai, Maharashtra</p>
                <p>Phone: +91 12345 67890</p>
              </div>

              <div>
                <h3 className="mb-1 text-lg font-semibold">Store 2 – Delhi</h3>
                <p>456 Gold Lane, Delhi, India</p>
                <p>Phone: +91 98765 43210</p>
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-gray-500">
              Visit us in-store to experience our collections in person and
              receive one-on-one guidance from our jewellery experts.
            </p>
          </div>

          {/* Right side — Map */}
          <div className="w-full md:w-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15080.724302905392!2d72.91061989999999!3d19.099710599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1760682777860!5m2!1sen!2sin"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full md:h-full"
            ></iframe>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            className="rounded-full border border-purple-900 bg-[#430045] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-purple-900 sm:px-10 sm:py-4 sm:text-lg"
          >
            Get Directions
          </Button>
        </div>
      </div>
    </div>
  );
}
