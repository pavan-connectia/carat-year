import Heading from "@/components/ui/Heading";
import { Link } from "react-router";

export default function WeddingRingGuide() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 py-10">
      {/* --- Hero Section --- */}
      <div className="mb-12 max-w-4xl text-center">
        <Heading>Wedding Ring Buying Guide</Heading>
        <p className="mt-4 text-lg leading-relaxed text-gray-500">
          Wedding rings are the ultimate symbol of everlasting love and
          commitment. When you decide to tie the knot, finding the perfect rings
          becomes an unforgettable part of your story. This guide walks you
          through everything you need to know — from metals and styles to sizing
          and bespoke options.
        </p>
        <img
          src="/product/anklet.png"
          alt="Wedding Rings"
          className="mx-auto my-10 h-96 w-full max-w-3xl rounded-2xl object-cover shadow-md"
        />
      </div>

      {/* --- Trust Badges --- */}
      <div className="mb-16 grid max-w-5xl grid-cols-2 gap-6 text-center sm:grid-cols-4">
        {[
          { title: "Free UK Delivery" },
          { title: "30-Day Free Resizing" },
          { title: "0% APR Interest-Free Credit" },
          { title: "Lifetime Warranty" },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-2xl bg-linear-to-b from-amber-50 via-yellow-50 to-orange-100 p-5 shadow-md transition hover:shadow-lg"
          >
            <p className="font-medium text-gray-800">{item.title}</p>
          </div>
        ))}
      </div>

      {/* --- Content Section --- */}
      <div className="max-w-5xl space-y-16 leading-relaxed text-gray-700">
        {/* --- Find Your Wedding Ring Size --- */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Find Your Wedding Ring Size
          </h2>
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <img
              src="/product/bangle.png"
              alt="Ring Size"
              className="w-full rounded-2xl object-cover shadow-md md:w-1/2"
            />
            <div>
              <p>
                Finding your correct wedding ring size is important for lasting
                comfort. The most accurate way is to get professionally measured
                at a jeweller or use our{" "}
                <span className="font-medium">Free Ring Sizer</span> service.
              </p>
              <Link
                to="/free-ring-sizer"
                className="mt-5 inline-block rounded-full border border-[#533D0E] bg-[#533D0E] px-6 py-3 text-white transition hover:bg-transparent hover:text-[#533D0E]"
              >
                Order a Free Ring Sizer
              </Link>
            </div>
          </div>
        </section>

        {/* --- Shop by Precious Metal --- */}
        <section>
          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
            Shop by Precious Metal
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center">
            Choose from our collection of beautiful precious metals to create
            your perfect wedding band. Each metal has unique characteristics
            that reflect your style and lifestyle — from traditional yellow gold
            to modern platinum.
          </p>

          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { name: "White Gold", img: "/craft/craft1.png" },
              { name: "Yellow Gold", img: "/craft/craft2.png" },
              { name: "Rose Gold", img: "/craft/craft3.png" },
              { name: "Platinum", img: "/craft/craft4.png" },
            ].map((metal, i) => (
              <div
                key={i}
                className="rounded-2xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-5 shadow-md transition hover:shadow-lg"
              >
                <img
                  src={metal.img}
                  alt={metal.name}
                  className="mb-3 h-32 w-full object-contain"
                />
                <h3 className="font-medium text-gray-800">{metal.name}</h3>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/metal-guide"
              className="inline-block font-medium text-[#533D0E] hover:underline"
            >
              Learn more in our Metal Guide →
            </Link>
          </div>
        </section>

        {/* --- Bespoke Wedding Rings --- */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Bespoke Wedding Rings
          </h2>
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div>
              <p>
                Have a dream design in mind? Our bespoke service lets you bring
                your vision to life. Share your idea, and our expert jewellers
                will create a detailed sketch and craft your perfect wedding
                ring in time for your big day.
              </p>
              <Link
                to="/bespoke-wedding-ring"
                className="mt-5 inline-block rounded-full border border-[#533D0E] bg-[#533D0E] px-6 py-3 text-white transition hover:bg-transparent hover:text-[#533D0E]"
              >
                Create Your Own Wedding Ring
              </Link>
            </div>
            <img
              src="/craft/craft5.png"
              alt="Bespoke Wedding Ring"
              className="w-full rounded-2xl object-cover shadow-md md:w-1/2"
            />
          </div>
        </section>

        {/* --- Wedding Ring Insurance --- */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Wedding Ring Insurance
          </h2>
          <p>
            Protect your precious symbol of love with comprehensive insurance
            against loss, damage, and theft. Some providers even offer joint
            cover for your engagement and wedding rings. Compare options to find
            the best coverage for your needs.
          </p>
          <Link
            to="/insurance-quote"
            className="mt-5 inline-block rounded-full border border-[#533D0E] bg-[#533D0E] px-6 py-3 text-white transition hover:bg-transparent hover:text-[#533D0E]"
          >
            Acquire Free Insurance Quote
          </Link>
        </section>

        {/* --- Wedding Jewellery for Brides --- */}
        <section>
          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
            Wedding Jewellery for Brides
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center">
            Add the finishing touches to your wedding look with our stunning
            bridal jewellery. From timeless diamond earrings to elegant
            bracelets and necklaces, our collection will make your big day
            sparkle.
          </p>

          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            {[
              {
                name: "Wedding Earrings",
                img: "/product/braclet.png",
                link: "/collection/wedding-earrings",
              },
              {
                name: "Wedding Bracelets",
                img: "/product/braclet2.png",
                link: "/collection/wedding-bracelets",
              },
              {
                name: "Wedding Necklaces",
                img: "/product/necklace.png",
                link: "/collection/wedding-necklaces",
              },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="block rounded-2xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-5 shadow-md transition hover:shadow-lg"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="mb-3 h-56 w-full rounded-xl object-cover"
                />
                <h3 className="font-medium text-gray-800">{item.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* --- CTA --- */}
        <section className="mt-10 text-center">
          <Link
            to="/collection/wedding-rings"
            className="mt-10 rounded-full border border-[#533D0E] bg-[#533D0E] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-[#533D0E] sm:px-10 sm:py-4 sm:text-lg"
          >
            Explore Wedding Ring Collection
          </Link>
        </section>
      </div>
    </div>
  );
}
