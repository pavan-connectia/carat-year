import Heading from "../ui/Heading";

export default function AboutUs() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f5f0eb] px-6 py-12 md:px-16 lg:py-0">
      {/* Desktop & Large Tablet Layout (starts at lg/1024px) */}
      <div className="relative mx-auto hidden h-[750px] max-w-7xl items-center gap-8 lg:grid lg:grid-cols-2">
        <div className="absolute -top-0.5 left-[-162px] h-[755px] overflow-hidden">
          <img
            src="/home/left-image.png"
            alt="Jewelry Model"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="absolute right-88 bottom-0.5 h-[400px] w-[588px] overflow-hidden">
          {/* <img
            src="/home/left-image1.png"
            alt="Jewelry Model"
            className="h-full w-full object-cover"
          /> */}
        </div>

        <div className="absolute top-[35px] left-[405px] flex w-120 flex-col justify-between gap-5 text-center">
          <div className="mb-5 text-center">
            <h2 className="flex items-center justify-center text-3xl font-bold text-gray-900">
              About Us
            </h2>
          </div>
          <p className="text-sm text-gray-700">
            Carat Years is a modern luxury jewellery house, specialising in
            lab-grown diamond statement pieces. Each piece is designed to
            celebrate life's milestones. From everyday memories to
            once-in-a-lifetime occasions, our jewellery celebrates meaningful
            moments with ethical elegance.
          </p>
          <p className="text-sm text-gray-700">
            From ethically sourced diamonds, we craft elegant jewellery for
            individuals and families who value both style and significance. The
            brand philosophy is rooted in emotional storytelling, modern luxury,
            and wearable elegance powered by innovation.
          </p>
          <button className="w-max self-center rounded-full bg-fuchsia-950 px-6 py-2 text-white transition hover:bg-purple-900">
            Know Our Story
          </button>
        </div>

        <div className="absolute top-16 right-0 h-48 w-48 lg:hidden xl:block xl:right-16">
          <img
            src="/home/right-image-1.png"
            alt="Jewelry Closeup"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-6.518-3.76A1 1 0 007 8.22v7.56a1 1 0 001.234.97l6.518-3.76a1 1 0 000-1.732z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="absolute right-2 bottom-[30px] flex h-45 w-90 flex-col justify-between">
          <p className="mt-2 text-xs text-gray-500">
            At Carat Years, we don’t just craft jewelry — we shape timeless
            stories in gold.
          </p>
          <img
            src="/home/right-image-2.png"
            alt="Jewelry Closeup 2"
            className="h-full w-full object-cover object-bottom shadow-lg"
          />
        </div>
      </div>

      {/* Mobile & Tablet Layout (up to 1023px) */}
      <div className="block lg:hidden">
        <div className="flex flex-col justify-center space-y-4 px-4 sm:space-y-6 md:px-8">
          <Heading>About Us</Heading>

          {/* Tablet Grid Adjustment */}
          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
            <div className="flex items-start justify-between gap-4">
              <div className="h-56 w-1/2 shrink-0 overflow-hidden md:h-80">
                <img
                  src="/home/left-image.png"
                  alt="Left Image 1"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-56 w-1/2 shrink-0 overflow-hidden md:h-48">
                <img
                  src="/home/right-image-2.png"
                  alt="Right Image 2"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 text-center md:text-left">
              <p className="text-sm text-gray-700">
                Carat Years is a modern luxury jewellery house, specialising in
                lab-grown diamond statement pieces. Each piece is designed to
                celebrate life's milestones. From everyday memories to
                once-in-a-lifetime occasions, our jewellery celebrates meaningful
                moments with ethical elegance.
              </p>
              <p className="text-sm hidden text-gray-700 md:block">
                From ethically sourced diamonds, we craft elegant jewellery for
                individuals and families who value both style and significance.
              </p>
              <div className="flex justify-center md:justify-start">
                <button className="rounded-full bg-fuchsia-950 px-6 py-2 text-white transition hover:bg-purple-900">
                  Know Our Story
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section for Mobile/Tablet */}
        <div className="mt-8 flex flex-col gap-4 px-4 text-center md:hidden">
           <p className="text-sm text-gray-700">
            From ethically sourced diamonds, we craft elegant jewellery for
            individuals and families who value both style and significance. The
            brand philosophy is rooted in emotional storytelling, modern luxury,
            and wearable elegance powered by innovation.
          </p>
        </div>

        <div className="relative mt-10 h-48 w-full overflow-hidden md:h-64">
          {/* <img
            src="/home/left-image1.png"
            alt="Left Image 2 Background"
            className="h-full w-full object-cover"
          /> */}

          <img
            src="/home/right-image-1.png"
            alt="Right Image 1 Cover"
            className="absolute bottom-3 left-[16vw] h-2/3 w-2/3 object-cover md:w-1/3"
          />

          <div className="absolute inset-0 top-10 right-10 flex items-center justify-center md:right-1/4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-6.518-3.76A1 1 0 007 8.22v7.56a1 1 0 001.234.97l6.518-3.76a1 1 0 000-1.732z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}