export default function HallmarkingGuide() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 text-gray-800">
      {/* Header */}
      <h1 className="mb-6 text-center text-4xl font-semibold text-[#533D0E] md:text-5xl">
        Hallmarking Guide
      </h1>
      <p className="mb-12 text-center text-lg text-gray-600">
        Learn how hallmarking ensures authenticity, purity, and trust in your
        jewellery.
      </p>

      {/* Section: What is Hallmarking */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-[#533D0E]">
          What Is Hallmarking?
        </h2>
        <p className="leading-relaxed text-gray-700">
          Hallmarking is the official process of certifying the purity of
          precious metals. A hallmark is a small but vital mark applied to items
          made of gold, silver, platinum, or palladium, confirming that the
          metal content has been independently tested and verified by a UK Assay
          Office. It’s your guarantee that the item meets legal purity standards
          and is made from genuine precious metal.
        </p>
        <p className="mt-4 leading-relaxed text-gray-700">
          In the UK, hallmarking is a legal requirement and acts as a
          reassurance of quality and authenticity — protecting both buyers and
          sellers.
        </p>
      </section>

      {/* Section: Which Metals Need Hallmarking */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-[#533D0E]">
          Which Metals & Weights Need Hallmarking?
        </h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          Four precious metals are subject to hallmarking laws in the UK: gold,
          silver, platinum, and palladium. Hallmarking is only required when an
          item exceeds the following weight thresholds:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-left text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 font-semibold">Metal</th>
                <th className="px-4 py-2 font-semibold">Minimum Weight</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Platinum</td>
                <td className="px-4 py-2">0.5 grams or more</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Gold</td>
                <td className="px-4 py-2">1 gram or more</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Palladium</td>
                <td className="px-4 py-2">1 gram or more</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Silver</td>
                <td className="px-4 py-2">7.78 grams or more</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 leading-relaxed text-gray-700">
          If an item falls below these weights, a hallmark isn’t legally
          required — but many jewellers still choose to hallmark smaller pieces
          for added assurance.
        </p>
      </section>

      {/* Section: How Is Jewellery Hallmarked */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-[#533D0E]">
          How Is Jewellery Hallmarked?
        </h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          Hallmarking is performed by official UK Assay Offices — independent
          bodies authorised to test and verify precious metal content. Once the
          item meets the required standard, it is hallmarked using one of two
          methods:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>
            <strong>Stamping:</strong> Traditional metal punches imprint the
            hallmark directly onto the item.
          </li>
          <li>
            <strong>Laser Etching:</strong> A modern method ideal for delicate
            or intricate pieces to prevent distortion.
          </li>
        </ul>
        <p className="mt-4 leading-relaxed text-gray-700">
          The hallmark is applied discreetly — often inside a ring band or on a
          necklace clasp — so it doesn’t interfere with the design.
        </p>
      </section>

      {/* Section: What Does a Hallmark Look Like */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-[#533D0E]">
          What Does a Hallmark Look Like?
        </h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          A full UK hallmark includes three compulsory symbols:
        </p>
        <ol className="list-decimal space-y-2 pl-6 text-gray-700">
          <li>
            <strong>Sponsor’s Mark:</strong> Identifies the manufacturer or
            sponsor who submitted the item.
          </li>
          <li>
            <strong>Fineness Mark:</strong> Indicates the purity of the metal
            (e.g. “925” for sterling silver, “375” for 9ct gold).
          </li>
          <li>
            <strong>Assay Office Mark:</strong> Shows which UK Assay Office
            tested and marked the item.
          </li>
        </ol>
      </section>

      {/* Section: Why Hallmarking Matters */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold text-[#533D0E]">
          Why Hallmarking Matters
        </h2>
        <p className="leading-relaxed text-gray-700">
          At <strong>Diamonds Factory</strong>, hallmarking isn’t just a legal
          requirement — it’s a mark of trust. Whether you’re investing in a
          timeless gold ring or a delicate silver pendant, a hallmark guarantees
          you’re getting exactly what you pay for. It’s your seal of
          authenticity and supports the integrity of the jewellery industry,
          ensuring every customer buys with complete confidence.
        </p>
      </section>
    </div>
  );
}
