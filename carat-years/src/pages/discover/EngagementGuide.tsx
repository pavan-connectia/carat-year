import Heading from "@/components/ui/Heading";

export default function EngagementGuide() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 py-10">
      {/* Hero Section */}
      <div className="mb-12 max-w-4xl text-center">
        <Heading>Engagement Ring Buying Guide</Heading>
        <p className="mt-4 text-lg text-gray-500">
          Buying the perfect engagement ring for the one you love can feel like
          a daunting prospect. Learn everything you need to know so you can make
          the right choice and find the ideal engagement ring with our expert
          advice.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Carat Years Editorial Team • October 15, 2025
        </p>
        <img
          src="/craft/craft5.png"
          alt="Engagement Ring Buying Guide"
          className="mx-auto my-10 h-100 w-100 rounded-2xl object-cover shadow-md"
        />
      </div>

      {/* Content Sections */}
      <div className="max-w-5xl space-y-14 leading-relaxed text-gray-700">
        {/* Section 1 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            1. Calculate Your Budget
          </h2>
          <p>
            Working out how much to spend on an engagement ring can be tricky.
            Traditionally, it was said you should spend two to three months’
            salary on a ring, but nowadays, this figure is much more flexible.
          </p>
          <p className="mt-3">
            Rather than saving for months, use our engagement ring calculator to
            find what fits your budget comfortably. Carat Years also offers
            financing options to make your perfect ring attainable.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            2. Choose the Ideal Style
          </h2>
          <p>
            Style is personal — it should reflect your partner’s personality and
            lifestyle. Pay attention to the jewellery they already wear. For a
            timeless look, opt for a solitaire or princess cut; for
            trendsetters, explore creative or vintage-inspired designs.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            3. Find the Perfect Ring Size
          </h2>
          <p>
            Not sure of the size? Don’t worry — you can get professionally
            measured at our Carat Years store or request a free ring sizer. If
            you’re planning a surprise proposal, try borrowing a ring your
            partner already wears and we’ll help match the size discreetly.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            4. Select the Ring Setting
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <span className="font-medium">Solitaire –</span> A single diamond
              on a plain band for timeless elegance.
            </li>
            <li>
              <span className="font-medium">Halo –</span> A central stone
              surrounded by smaller diamonds for added sparkle.
            </li>
            <li>
              <span className="font-medium">3-Stone –</span> Symbolising the
              past, present, and future of your love.
            </li>
            <li>
              <span className="font-medium">Cluster –</span> Multiple smaller
              stones grouped together for maximum brilliance.
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            5. Choose the Diamond Shape
          </h2>
          <p>
            Diamond shape defines the ring’s character. Round diamonds offer
            classic brilliance, while fancy shapes like oval, princess, pear,
            and emerald bring individuality and style.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            6. Select the Metal
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <span className="font-medium">Platinum –</span> Durable, pure, and
              hypoallergenic.
            </li>
            <li>
              <span className="font-medium">Yellow Gold –</span> Classic and
              warm in tone.
            </li>
            <li>
              <span className="font-medium">White Gold –</span> Sleek and
              modern, ideal for contemporary styles.
            </li>
            <li>
              <span className="font-medium">Rose Gold –</span> Romantic and
              trendy, with a soft blush hue.
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            7. Pick a Precious Stone
          </h2>
          <p>
            Diamonds remain the timeless choice for engagement rings,
            symbolising enduring love. However, gemstones like emerald,
            sapphire, and ruby are growing in popularity for those seeking
            unique alternatives.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            8. Buying Options
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <span className="font-medium">Ready-to-Buy –</span> Select from
              our in-stock designs for instant delivery.
            </li>
            <li>
              <span className="font-medium">Custom-Made –</span> Choose diamond
              quality, metal, and size to create your perfect piece.
            </li>
            <li>
              <span className="font-medium">Bespoke –</span> Work with our
              artisans to design a one-of-a-kind ring from scratch.
            </li>
          </ul>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            9. Protect Your Investment
          </h2>
          <p>
            Accidents happen — make sure your engagement ring is insured. Our
            Carat Years Jewellery Insurance offers complete peace of mind,
            covering loss, theft, or damage.
          </p>
        </section>
      </div>
    </div>
  );
}
