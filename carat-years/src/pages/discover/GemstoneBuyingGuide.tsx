import Heading from "@/components/ui/Heading";
import { Link } from "react-router";

export default function GemstoneBuyingGuide() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 py-10">
      {/* --- Hero Section --- */}
      <div className="mb-12 max-w-4xl text-center">
        <Heading>Gemstone Buying Guide</Heading>
        <p className="mt-4 text-lg leading-relaxed text-gray-500">
          Gemstone jewellery is a vibrant and meaningful way to express your
          individuality. From regal sapphires and passionate rubies to elegant
          emeralds and radiant yellow diamonds, every gemstone tells a unique
          story. Whether you’re shopping for a special gift or treating
          yourself, our gemstone jewellery adds a touch of timeless luxury and
          Indian heritage to every occasion.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Lifetime Editorial Team • October 15, 2025
        </p>
        <img
          src="/gem/gem-hero.png"
          alt="Gemstone Jewellery"
          className="mx-auto my-10 h-96 w-full max-w-3xl rounded-2xl object-cover shadow-md"
        />
      </div>

      {/* --- Content Sections --- */}
      <div className="max-w-5xl space-y-16 leading-relaxed text-gray-700">
        {/* Types of Gemstones */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Types of Gemstones
          </h2>
          <p>
            Each gemstone carries deep cultural and emotional significance in
            Indian tradition. Discover the most popular gemstones featured in
            our collection, each radiating its own charm and meaning.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                name: "Sapphires",
                desc: "Symbol of wisdom and purity, sapphires are cherished for their royal blue hue and unmatched brilliance.",
              },
              {
                name: "Emeralds",
                desc: "Known for their rich green colour, emeralds represent growth, renewal, and everlasting love.",
              },
              {
                name: "Rubies",
                desc: "Fiery and passionate, rubies symbolise strength, romance, and power — perfect for heartfelt gifts.",
              },
              {
                name: "Yellow Diamonds",
                desc: "Bright and joyful, yellow diamonds embody happiness and positivity, ideal for festive occasions.",
              },
            ].map((gem, i) => (
              <div
                key={i}
                className="rounded-2xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-6 shadow-md transition hover:shadow-lg"
              >
                <h3 className="mb-2 font-medium text-gray-800">{gem.name}</h3>
                <p>{gem.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The 3 C’s of Gemstones */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            The 3 C’s of Gemstones
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Colour",
                desc: "The hue and saturation of a gemstone define its personality. Vivid, deep colours are the most sought after.",
              },
              {
                title: "Clarity",
                desc: "Natural inclusions are part of a gemstone’s story. The clearer the gem, the more radiant its sparkle.",
              },
              {
                title: "Cut",
                desc: "The precision of the cut enhances brilliance, symmetry, and the overall beauty of the gemstone.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-2xl bg-linear-to-b from-amber-50 via-yellow-50 to-orange-100 p-6 shadow-md transition hover:shadow-lg"
              >
                <h3 className="mb-2 font-medium text-gray-800">{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gemstone Shapes */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Gemstone Jewellery Shapes
          </h2>
          <p>
            Each gemstone shape offers a unique character and brilliance.
            Whether you prefer timeless or contemporary styles, our cuts are
            designed to highlight the gem’s natural beauty.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              "Round",
              "Princess",
              "Cushion",
              "Pear",
              "Heart",
              "Emerald",
              "Oval",
              "Asscher",
              "Marquise",
              "Radiant",
            ].map((shape, i) => (
              <div
                key={i}
                className="rounded-2xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-5 shadow-md transition hover:shadow-lg"
              >
                <h3 className="font-medium text-gray-800">{shape}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Gemstone Collections */}
        <section>
          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
            Gemstone Jewellery Collections
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center">
            Explore our curated gemstone jewellery — handcrafted with precision
            and inspired by Indian artistry. Perfect for weddings, festive
            gifting, or everyday elegance.
          </p>

          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            {[
              {
                name: "Gemstone Engagement Rings",
                img: "/gem/engagement.png",
                link: "/collection/gemstone-engagement-rings",
              },
              {
                name: "Gemstone Pendants",
                img: "/gem/pendant.png",
                link: "/collection/gemstone-pendants",
              },
              {
                name: "Gemstone Earrings",
                img: "/gem/earrings.png",
                link: "/collection/gemstone-earrings",
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

        {/* Gemstone Enhancements */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Gemstone Enhancements
          </h2>
          <p>
            Many gemstones are treated to enhance their natural beauty and
            colour. Common enhancements include:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1">
            <li>Heat Treatment</li>
            <li>Infusion</li>
            <li>Coating</li>
            <li>Dyeing</li>
            <li>Irradiation</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-10 text-center">
          <Link
            to="/collection/gemstone-jewellery"
            className="mt-10 rounded-full border border-[#533D0E] bg-[#533D0E] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-[#533D0E] sm:px-10 sm:py-4 sm:text-lg"
          >
            Explore Gemstone Jewellery Collection
          </Link>
        </section>
      </div>
    </div>
  );
}
