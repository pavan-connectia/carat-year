import Heading from "@/components/ui/Heading";
import { Link } from "react-router";

export default function NaturalDiamondGuide() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 py-10">
      {/* --- Page Heading --- */}
      <div className="mb-10 max-w-4xl text-center">
        <Heading>Natural Diamond Guide</Heading>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">
          Diamonds have existed for billions of years, admired as the most
          desired gemstone of all time. Their dazzling brilliance, rarity, and
          unmatched durability make them a timeless symbol of love and luxury —
          adored by everyone from celebrities to royalty.
        </p>
      </div>

      {/* --- Why Buy Natural Diamonds --- */}
      <div className="mb-14 max-w-5xl">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Why Buy Natural Diamonds?
        </h2>

        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          <div className="rounded-2xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-6 shadow-md transition hover:shadow-lg">
            <h3 className="mb-3 text-xl font-semibold text-gray-800">
              1. Value & Rarity
            </h3>
            <p className="text-gray-600">
              Natural diamonds hold their value exceptionally well because of
              their limited supply and natural origin. Unlike lab-grown
              diamonds, they are formed by nature over billions of years, making
              each one truly rare.
            </p>
          </div>

          <div className="rounded-2xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-6 shadow-md transition hover:shadow-lg">
            <h3 className="mb-3 text-xl font-semibold text-gray-800">
              2. Natural Beauty
            </h3>
            <p className="text-gray-600">
              Formed deep within the Earth, natural diamonds have a unique
              brilliance and allure that reflect their origin — a glow that
              can’t be replicated by human hands.
            </p>
          </div>

          <div className="rounded-2xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-6 shadow-md transition hover:shadow-lg">
            <h3 className="mb-3 text-xl font-semibold text-gray-800">
              3. Unmatched Durability
            </h3>
            <p className="text-gray-600">
              Ranking a perfect 10 on the Mohs scale, natural diamonds are the
              hardest mineral on Earth — ensuring lifelong brilliance and
              resilience against scratches.
            </p>
          </div>
        </div>
      </div>

      {/* --- Natural vs Lab Diamonds --- */}
      <div className="mb-16 max-w-4xl text-center">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Natural vs Lab Created Diamonds
        </h2>
        <p className="leading-relaxed text-gray-600">
          Both natural and lab-grown diamonds share the same chemical and visual
          properties — making them virtually indistinguishable. The key
          difference lies in their origin: natural diamonds are formed deep
          within the Earth under immense heat and pressure, while lab-created
          diamonds are crafted by scientists in controlled environments. Natural
          diamonds, however, remain the timeless choice for those who value
          authenticity, tradition, and natural brilliance.
        </p>
      </div>

      {/* --- How Natural Diamonds Are Created --- */}
      <div className="mb-16 max-w-5xl">
        <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">
          How Are Natural Diamonds Created?
        </h2>

        <div className="space-y-10">
          {[
            {
              step: "Step 1: Carbon Creation",
              desc: "A diamond’s journey begins deep within the Earth’s mantle, where carbon-rich minerals are trapped and form the foundation of a future diamond.",
              image: "/craft/craft1.png",
            },
            {
              step: "Step 2: Pressure and Extreme Heat",
              desc: "Under temperatures reaching up to 1300°C and intense pressure, the carbon begins to crystallize into rough diamond structures.",
              image: "/craft/craft2.png",
            },
            {
              step: "Step 3: Diamonds Rise to the Surface",
              desc: "Volcanic eruptions transport these rough diamonds toward the Earth’s surface through kimberlite and lamproite pipes.",
              image: "/craft/craft3.png",
            },
            {
              step: "Step 4: Cooling and Diamond Formation",
              desc: "Once the magma cools, the diamonds settle within the rock formations — ready to be discovered, cut, and polished into stunning gems.",
              image: "/craft/craft4.png",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-8 rounded-2xl bg-linear-to-b from-amber-50 to-yellow-100 p-6 shadow-md md:flex-row"
            >
              <img
                src={item.image}
                alt={item.step}
                className="h-56 w-full rounded-xl object-cover md:w-1/2"
              />
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  {item.step}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- How to Buy Section --- */}
      <div className="mb-16 max-w-4xl text-center">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          How to Buy Natural Diamond Jewellery
        </h2>
        <p className="leading-relaxed text-gray-600">
          All of our diamond jewellery is available directly on our website.
          When customizing your piece, simply select{" "}
          <span className="font-semibold text-gray-800">
            “Natural Diamonds”
          </span>{" "}
          from the options before adding to your cart. Whether you’re choosing
          an engagement ring, necklace, bracelet, or earrings, our collection of
          natural diamonds ensures timeless brilliance and value.
        </p>
      </div>

      {/* --- Diamond Facts --- */}
      <div className="mb-20 max-w-5xl">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Natural Diamond Facts
        </h2>

        <div className="grid grid-cols-1 gap-6 text-gray-700 sm:grid-cols-2">
          {[
            "Made from pure carbon atoms — one of the only gems formed from a single element.",
            "Scores a perfect 10 on the Mohs scale of hardness.",
            "Reflects white light beautifully, creating unmatched sparkle.",
            "Takes 1 to 3 billion years to form naturally beneath the Earth’s surface.",
            "First discovered as early as 300 B.C. in India and used to engrave gemstones.",
            "Only around 30% of mined diamonds are considered ‘gem-quality’.",
          ].map((fact, index) => (
            <div
              key={index}
              className="rounded-xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-5 shadow-md"
            >
              <p className="text-gray-700">{fact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Contact Section --- */}
      <div className="max-w-3xl text-center">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Get in Touch
        </h2>
        <p className="leading-relaxed text-gray-600">
          Still have questions about choosing a natural diamond? Our gemology
          experts are here to help you make the perfect choice. Contact our
          Customer Care Team at{" "}
          <span className="font-medium text-gray-800">+91 98765 43210</span> or
          reach us via Live Chat for personalized guidance.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-white shadow transition hover:bg-gray-800"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
