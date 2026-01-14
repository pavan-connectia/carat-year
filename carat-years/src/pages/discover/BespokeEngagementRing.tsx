import Heading from "@/components/ui/Heading";
import { Link } from "react-router";

export default function BespokeEngagementRing() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 py-10">
      {/* --- Hero Section --- */}
      <div className="mb-12 max-w-4xl text-center">
        <Heading>
          A Bespoke Engagement Ring Created Out of Your Imagination
        </Heading>
        <p className="mt-4 text-lg leading-relaxed text-gray-500">
          Design your dream engagement ring with our bespoke creation service.
          From your first idea to the final handcrafted masterpiece, we’ll work
          with you every step of the way to bring your imagination to life.
        </p>
        <img
          src="/bespoke/bespoke-hero.png"
          alt="Bespoke Engagement Ring"
          className="mx-auto my-10 h-96 w-full max-w-3xl rounded-2xl object-cover shadow-md"
        />
        <Link
          to="/bespoke/start"
          className="rounded-full border border-[#533D0E] bg-[#533D0E] px-10 py-4 text-lg font-medium text-white transition hover:bg-transparent hover:text-[#533D0E]"
        >
          Let’s Get Started
        </Link>
      </div>

      {/* --- Steps Section --- */}
      <div className="max-w-5xl space-y-16 leading-relaxed text-gray-700">
        <section>
          <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">
            How Our Bespoke Service Works
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Talk Us Through Your Idea",
                desc: "Our bespoke service is entirely personal to you. Share your design ideas, inspirations, or sketches — our jewellery designers will collaborate with you to create your dream piece.",
                img: "/bespoke/idea.png",
              },
              {
                step: "2",
                title: "Receive a CAD Design & Quotation",
                desc: "Our jewellers will create a detailed CAD design of your jewellery so you can visualise it before it’s made. You can request design adjustments, and we’ll provide a tailored quotation based on your preferences and budget.",
                img: "/bespoke/cad.png",
              },
              {
                step: "3",
                title: "Handcrafted & Delivered",
                desc: "Once you approve your design, our skilled craftsmen begin handcrafting your unique piece. Using ethically sourced diamonds and precious metals, your ring is delivered within three weeks — a creation made to last a lifetime.",
                img: "/bespoke/handcrafted.png",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-2xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-6 text-center shadow-md transition hover:shadow-lg"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="mb-4 h-44 w-full rounded-xl object-cover"
                />
                <div className="mb-2 text-3xl font-bold text-[#533D0E]">
                  {item.step}
                </div>
                <h3 className="mb-2 font-medium text-gray-800">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- CTA --- */}
        <section className="mt-10 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Ready to Bring Your Creation to Life?
          </h2>
          <Link
            to="/bespoke/start"
            className="mt-10 rounded-full border border-[#533D0E] bg-[#533D0E] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-[#533D0E] sm:px-10 sm:py-4 sm:text-lg"
          >
            Let’s Get Started
          </Link>
        </section>

        {/* --- Latest Creations & Contact --- */}
        <section className="mt-16 space-y-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Our Latest Creations
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              "/bespoke/creation1.png",
              "/bespoke/creation2.png",
              "/bespoke/creation3.png",
            ].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Bespoke Creation ${i + 1}`}
                className="h-64 w-full rounded-2xl object-cover shadow-md"
              />
            ))}
          </div>

          <div className="space-y-4 pt-8">
            <h3 className="text-lg font-medium text-gray-800">
              Talk to our Jewellery Experts
            </h3>
            <div className="flex flex-col justify-center gap-6 text-base md:flex-row">
              <button className="rounded-full border border-[#533D0E] px-6 py-2 text-[#533D0E] transition hover:bg-[#533D0E] hover:text-white">
                💬 Chat Now
              </button>
              <a
                href="tel:02071383672"
                className="rounded-full border border-[#533D0E] px-6 py-2 text-[#533D0E] transition hover:bg-[#533D0E] hover:text-white"
              >
                📞 Call Us: 020 7138 3672
              </a>
              <Link
                to="/visit-showroom"
                className="rounded-full border border-[#533D0E] px-6 py-2 text-[#533D0E] transition hover:bg-[#533D0E] hover:text-white"
              >
                🏢 Request an Appointment
              </Link>
            </div>
          </div>
        </section>

        {/* --- Packaging --- */}
        <section className="mt-20 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Luxurious Packaging — An Everlasting Gift
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-gray-600">
            Our presentation boxes are carefully designed to complement and
            protect your jewellery. Each piece is nestled within a beautiful
            faux suede lining and finished with delicate gold accents, creating
            a luxurious unboxing experience for every treasured creation.
          </p>
          <img
            src="/bespoke/packaging.png"
            alt="Jewellery Packaging"
            className="mx-auto h-80 w-full max-w-3xl rounded-2xl object-cover shadow-md"
          />
        </section>

        {/* --- Best Selling Rings CTA --- */}
        <section className="mt-16 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Best Selling Engagement Rings
          </h2>
          <Link
            to="/collection/engagement-rings"
            className="mt-10 rounded-full border border-[#533D0E] bg-[#533D0E] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-[#533D0E] sm:px-10 sm:py-4 sm:text-lg"
          >
            Explore Engagement Ring Collection
          </Link>
        </section>
      </div>
    </div>
  );
}
