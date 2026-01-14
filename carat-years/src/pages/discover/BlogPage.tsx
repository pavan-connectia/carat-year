import Heading from "@/components/ui/Heading";
import { Link } from "react-router";

export default function DiamondCutGuide() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 py-10">
      {/* --- Hero Section --- */}
      <div className="mb-12 max-w-4xl text-center">
        <Heading>Diamond Cut Guide</Heading>
        <p className="mt-4 text-lg leading-relaxed text-gray-500">
          Diamond cut is one of the most important factors in determining a
          diamond’s beauty and brilliance. The perfect cut ensures maximum
          sparkle, fire, and light reflection — turning a simple stone into a
          breathtaking masterpiece.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Carat Years Education • October 15, 2025
        </p>
        <img
          src="/education/cut-hero.png"
          alt="Diamond Cut Guide"
          className="mx-auto my-10 h-96 w-full max-w-3xl rounded-2xl object-cover shadow-md"
        />
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-5xl space-y-16 leading-relaxed text-gray-700">
        {/* What is a Diamond Cut */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            What is a Diamond Cut?
          </h2>
          <p>
            Diamond cut refers to how well a diamond is proportioned, faceted,
            and polished. The best diamond cuts are symmetrical, beautifully
            proportioned, and expertly polished to allow light to enter and
            reflect with maximum brilliance. A well-cut diamond appears bright
            and full of life — while a poorly cut one can look dull and
            lifeless.
          </p>
          <p className="mt-4">
            When cutting diamonds, symmetry plays a vital role in achieving the
            best light return (or simply, sparkle). The more precise the
            symmetry and polish, the more radiant the diamond.
          </p>
        </section>

        {/* How Diamonds Are Cut */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            How Are Diamonds Cut?
          </h2>
          <p className="mb-4">
            Cutting a diamond is a delicate process performed by expert
            craftsmen using high-precision tools. The process involves five key
            stages:
          </p>
          <ul className="ml-6 list-decimal space-y-2">
            <li>
              <strong>Planning</strong> – determining the best shape and cut to
              maximize beauty and carat weight.
            </li>
            <li>
              <strong>Cleaving</strong> – splitting the rough diamond into
              smaller, workable pieces.
            </li>
            <li>
              <strong>Bruting</strong> – shaping the diamond into a basic round
              or outline form.
            </li>
            <li>
              <strong>Polishing</strong> – adding facets and bringing out the
              diamond’s fire and brilliance.
            </li>
            <li>
              <strong>Inspecting</strong> – evaluating the final polish,
              symmetry, and cut grade for quality assurance.
            </li>
          </ul>
        </section>

        {/* Cut vs Shape */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Diamond Cut vs Diamond Shape
          </h2>
          <p>
            It’s easy to confuse <strong>cut</strong> and <strong>shape</strong>
            , but they refer to different things. The cut describes how a
            diamond’s facets are proportioned and polished to reflect light —
            while the shape refers to the diamond’s outline or silhouette (such
            as round, oval, princess, etc.).
          </p>
        </section>

        {/* Types of Diamond Cuts */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Types of Diamond Cuts
          </h2>
          <p className="mb-6">
            Diamond cut grades measure how well a diamond interacts with light.
            The better the cut, the more sparkle you’ll see. Each diamond is
            assessed for brilliance, symmetry, polish, and fire — and graded
            from Excellent to Poor.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                title: "Excellent Cut Diamond",
                desc: "The best diamond cut grade — perfectly proportioned with exceptional brilliance, symmetry, and fire. Reflects nearly all the light that enters the diamond for an unmatched sparkle.",
              },
              {
                title: "Very Good Cut Diamond",
                desc: "Nearly as stunning as an excellent cut, but slightly less expensive. Still reflects most light beautifully while maintaining great symmetry and polish.",
              },
              {
                title: "Good Cut Diamond",
                desc: "Reflects a large amount of light, but not as bright or fiery as the higher grades. A balanced choice for those seeking good quality at a lower price.",
              },
              {
                title: "Fair Cut Diamond",
                desc: "Reflects only some light entering the diamond. Often chosen when prioritizing carat weight over brilliance.",
              },
              {
                title: "Poor Cut Diamond",
                desc: "Cut too deep or too shallow, causing significant light loss. The least brilliant option, but also the most affordable.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-linear-to-b from-amber-50 via-yellow-50 to-orange-100 p-6 shadow-md transition hover:shadow-lg"
              >
                <h3 className="mb-2 font-medium text-gray-800">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Diamond Cut Chart */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Diamond Cut Chart
          </h2>
          <p className="mb-6">
            The diamond cut chart below shows how light interacts with diamonds
            of various cut qualities. As you can see, the quality of the cut
            directly determines how light reflects — and how much sparkle the
            diamond exhibits.
          </p>

          <img
            src="/education/cut-chart.png"
            alt="Diamond Cut Chart"
            className="mx-auto w-full max-w-3xl rounded-2xl shadow-md"
          />
        </section>

        {/* CTA */}
        <section className="mt-12 gap-10 text-center">
          <p className="mb-10 text-gray-600">
            Learn more about the 4Cs of Diamonds — Cut, Colour, Clarity, and
            Carat — to make an informed choice for your perfect stone.
          </p>
          <Link
            to="/education/diamond-education"
            className="my-10 rounded-full border border-[#533D0E] bg-[#533D0E] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-[#533D0E] sm:px-10 sm:py-4 sm:text-lg"
          >
            Explore Diamond Education
          </Link>
        </section>
      </div>
    </div>
  );
}
