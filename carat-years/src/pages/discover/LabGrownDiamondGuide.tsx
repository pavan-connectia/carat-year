import Heading from "@/components/ui/Heading";
import { Link } from "react-router";

export default function LabGrownDiamondGuide() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 py-10">
      {/* --- Hero Section --- */}
      <div className="mb-12 max-w-4xl text-center">
        <Heading>Lab Grown Diamonds Guide</Heading>
        <p className="mt-4 text-lg leading-relaxed text-gray-500">
          Lab-created diamonds have taken the jewellery industry by storm.
          They’re beautiful, sustainable alternatives to natural diamonds and
          offer the same brilliance, fire, and sparkle. But what makes them so
          loved? Let’s dive into the world of lab-grown diamonds and uncover why
          they’re becoming the modern choice for conscious buyers.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Carat Years Editorial Team • October 15, 2025
        </p>
        <img
          src="/lab/lab1.png"
          alt="Lab Grown Diamonds"
          className="mx-auto my-10 h-96 w-full max-w-3xl rounded-2xl object-cover shadow-md"
        />
      </div>

      {/* --- Content Sections --- */}
      <div className="max-w-5xl space-y-16 leading-relaxed text-gray-700">
        {/* What are Lab Created Diamonds */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            What are Lab Created Diamonds?
          </h2>
          <p>
            Also known as man-made or cultured diamonds, lab-created diamonds
            are grown in laboratories using advanced technology that mimics the
            natural conditions under which diamonds form. Because they’re made
            of the same carbon structure and undergo the same crystallization
            process, lab-grown diamonds are optically, chemically, and
            physically identical to natural diamonds.
          </p>
        </section>

        {/* Why Buy Lab Created Diamonds */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Why Buy Lab Created Diamonds?
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800">1. Value</h3>
              <p>
                Lab-grown diamonds can be up to 30% more affordable than natural
                diamonds, allowing you to either save money or upgrade to a
                larger, higher-quality stone within the same budget.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800">
                2. Quality & Beauty
              </h3>
              <p>
                Lab-grown diamonds display the same fire, brilliance, and
                quality as natural diamonds. In fact, due to the controlled
                environment they’re created in, many lab diamonds feature fewer
                imperfections and more uniform cuts.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800">
                3. Ethical Choice
              </h3>
              <p>
                As an eco-conscious alternative, lab-grown diamonds are created
                without the environmental and ethical concerns sometimes
                associated with traditional mining. They’re a beautiful,
                sustainable choice for engagement rings and fine jewellery.
              </p>
            </div>
          </div>
        </section>

        {/* How Are Lab Diamonds Made */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            How Are Lab Diamonds Made?
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                step: "Step 1: Diamond Seed",
                text: "Each lab diamond begins with a tiny carbon seed that acts as the foundation for crystal growth.",
              },
              {
                step: "Step 2: Apply Heat & Pressure",
                text: "The seed is exposed to extreme heat and pressure, or placed in a CVD (Chemical Vapor Deposition) chamber to replicate natural diamond conditions.",
              },
              {
                step: "Step 3: The Diamond Grows",
                text: "Over 6–10 weeks, carbon atoms bond and crystalize, forming a rough diamond identical to one formed in the earth.",
              },
              {
                step: "Step 4: The Diamond is Ready",
                text: "The diamond is then cut, polished, and graded using the same methods as natural diamonds.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-6 shadow-md transition hover:shadow-lg"
              >
                <h3 className="mb-2 font-medium text-gray-800">{item.step}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Are Lab Diamonds Real */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Are Lab Created Diamonds Real?
          </h2>
          <p>
            Absolutely! Lab-created diamonds are 100% real diamonds — not
            imitations or substitutes. They share the same optical, physical,
            and chemical properties as mined diamonds. Only advanced gemological
            equipment can tell the difference.
          </p>
        </section>

        {/* Lab vs Natural */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Lab-Created vs Natural Diamonds
          </h2>
          <p>
            Both types of diamonds are visually and chemically identical. The
            key difference lies solely in their origin: natural diamonds form
            deep within the Earth over billions of years, while lab diamonds are
            grown using advanced technology in a matter of weeks. Lab-created
            diamonds can also be up to 30% more affordable without compromising
            on beauty or quality.
          </p>
        </section>

        {/* How to Buy */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            How to Buy Lab-Grown Diamond Jewellery
          </h2>
          <p>
            All of our diamond jewellery is available with lab-grown diamonds.
            When shopping, simply choose{" "}
            <span className="font-medium">“Lab-Created Diamond”</span> from the
            options before adding to your cart. Whether you’re buying a ring,
            necklace, bracelet, or earrings — the choice is yours.
          </p>
        </section>

        {/* Diamond Tips */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Lab-Created Diamond Tips
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Cut",
                desc: "Lab-grown diamonds are cut with exceptional precision, often yielding superior symmetry and brilliance thanks to their uniform structure.",
              },
              {
                title: "Clarity",
                desc: "Most lab-grown diamonds are colourless or near-colourless, with minimal inclusions — comparable to high-grade natural diamonds.",
              },
              {
                title: "Budget",
                desc: "Since they cost around 30% less, you can choose a larger carat or higher grade diamond within your preferred budget.",
              },
            ].map((tip, i) => (
              <div
                key={i}
                className="rounded-2xl bg-linear-to-b from-amber-50 via-yellow-50 to-orange-100 p-6 shadow-md transition hover:shadow-lg"
              >
                <h3 className="mb-2 font-medium text-gray-800">{tip.title}</h3>
                <p>{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lab Grown Collections */}
        <section>
          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
            Lab Grown Diamond Jewellery
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center">
            Explore our range of exquisite lab-grown diamond jewellery, crafted
            to deliver unmatched brilliance, sustainability, and value.
          </p>

          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            {[
              {
                name: "Lab Grown Engagement Rings",
                img: "/lab/engagement.png",
                link: "/collection/lab-grown-engagement-rings",
              },
              {
                name: "Lab Grown Diamond Rings",
                img: "/lab/rings.png",
                link: "/collection/lab-grown-rings",
              },
              {
                name: "Lab Grown Diamond Earrings",
                img: "/lab/earrings.png",
                link: "/collection/lab-grown-earrings",
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

        {/* CTA */}
        <section className="mt-10 text-center">
          <Link
            to="/collection/lab-grown-diamonds"
            className="mt-10 rounded-full border border-[#533D0E] bg-[#533D0E] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-[#533D0E] sm:px-10 sm:py-4 sm:text-lg"
          >
            Explore Lab Grown Diamond Collection
          </Link>
        </section>
      </div>
    </div>
  );
}
