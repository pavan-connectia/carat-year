import Heading from "@/components/ui/Heading";
import { Link } from "react-router";

export default function RingSizeGuide() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 py-10">
      {/* --- Hero Section --- */}
      <div className="mb-12 max-w-4xl text-center">
        <Heading>Ring Size Guide & Conversion Chart</Heading>
        <p className="mt-4 text-lg leading-relaxed text-gray-500">
          So you’ve found the perfect diamond ring — but how do you find your
          ring size? Whether you’re buying an engagement ring for your partner
          or a wedding ring for yourself, this guide will help you measure your
          ring size accurately at home.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Carat Years Editorial Team • October 15, 2025
        </p>
        <img
          src="/ringsize/hero.png"
          alt="Ring Size Guide"
          className="mx-auto my-10 h-96 w-full max-w-3xl rounded-2xl object-cover shadow-md"
        />
      </div>

      {/* --- Content Sections --- */}
      <div className="max-w-5xl space-y-16 leading-relaxed text-gray-700">
        {/* Ring Size Conversion Chart */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Ring Size Conversion Chart
          </h2>
          <p className="mb-4">
            Use our UK ring size conversion chart to easily find your size.
            Simply measure the circumference of your finger and match it to the
            table below.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-md">
            <table className="min-w-full border-collapse text-left">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-4 py-3 font-medium">Ring Size</th>
                  <th className="px-4 py-3 font-medium">Circumference (mm)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["A", "37.8"],
                  ["B", "39.1"],
                  ["C", "40.4"],
                  ["D", "41.7"],
                  ["E", "42.9"],
                  ["F", "44.2"],
                  ["G", "45.5"],
                  ["H", "46.8"],
                  ["I", "48.0"],
                  ["J", "48.7"],
                  ["K", "50.0"],
                  ["L", "51.2"],
                  ["M", "52.5"],
                  ["N", "53.8"],
                  ["O", "55.1"],
                  ["P", "56.3"],
                  ["Q", "57.6"],
                  ["R", "58.9"],
                  ["S", "60.2"],
                  ["T", "61.4"],
                  ["U", "62.7"],
                  ["V", "64.0"],
                  ["W", "65.3"],
                  ["X", "66.6"],
                  ["Y", "67.8"],
                  ["Z", "68.5"],
                ].map(([size, mm]) => (
                  <tr key={size} className="odd:bg-white even:bg-gray-50">
                    <td className="px-4 py-2">{size}</td>
                    <td className="px-4 py-2">{mm} mm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Measure Your Finger */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            How to Measure Your Finger for a Ring
          </h2>
          <p className="mb-4">
            The most accurate way is to get professionally measured in-store. If
            that’s not possible, you can easily measure at home with our
            downloadable ring size guide.
          </p>

          <ol className="ml-6 list-decimal space-y-2">
            <li>Download and print our ring size guide on A4 paper.</li>
            <li>
              Find a ring that fits and match it with the printed circles.
            </li>
            <li>
              Ensure the dotted circle matches perfectly to the inside of the
              ring.
            </li>
            <li>
              You now have your ring size and can confidently order online.
            </li>
          </ol>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/downloads/ring-size-guide.pdf"
              className="rounded-full bg-[#533D0E] px-6 py-3 text-center text-white transition hover:bg-[#6f5115]"
            >
              Download Our Ring Size Guide
            </Link>
            <Link
              to="/order-ring-sizer"
              className="rounded-full border border-[#533D0E] px-6 py-3 text-center text-[#533D0E] transition hover:bg-[#533D0E] hover:text-white"
            >
              Order a Free Ring Sizer
            </Link>
          </div>
        </section>

        {/* How to Measure Secretly */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            How to Measure a Ring in Secret
          </h2>

          <div className="space-y-4">
            <p>
              Planning a surprise proposal or gift? Here are some creative (and
              subtle) ways to find out their ring size.
            </p>

            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>Ask a friend or family member:</strong> They might
                already know or can help you find out.
              </li>
              <li>
                <strong>Borrow an existing ring:</strong> Measure a ring your
                partner already wears using our printable guide.
              </li>
              <li>
                <strong>Measure while they sleep:</strong> Wrap a piece of
                string around their finger, mark it, and compare to our chart.
              </li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Ring Measuring Tips & Tricks
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                title: "Temperature",
                desc: "Measure at room temperature — fingers expand when warm and shrink when cold.",
              },
              {
                title: "Weight Changes",
                desc: "Fluctuations in weight can affect how your ring fits.",
              },
              {
                title: "Pregnancy",
                desc: "Fingers may swell during pregnancy — consider a temporary resize.",
              },
              {
                title: "Time of Day",
                desc: "Evenings are ideal as fingers are slightly larger compared to mornings.",
              },
            ].map((tip, i) => (
              <div
                key={i}
                className="rounded-2xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-5 shadow transition hover:shadow-md"
              >
                <h3 className="mb-1 font-medium text-gray-800">{tip.title}</h3>
                <p>{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Average Ring Sizes */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Average Ring Sizes
          </h2>

          <p className="mb-4">
            Not sure what size to start with? Here are the average UK ring sizes
            for men and women.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-linear-to-b from-amber-50 via-yellow-50 to-orange-100 p-5 shadow">
              <h3 className="mb-2 font-medium text-gray-800">Women</h3>
              <p>
                Average UK ring size ranges from <strong>K</strong> to{" "}
                <strong>N</strong>.
              </p>
            </div>
            <div className="rounded-2xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-5 shadow">
              <h3 className="mb-2 font-medium text-gray-800">Men</h3>
              <p>
                Average UK ring size ranges from <strong>S</strong> to{" "}
                <strong>T</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10 text-center">
          <Link
            to="/collection/engagement-rings"
            className="mt-10 rounded-full border border-[#533D0E] bg-[#533D0E] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-[#533D0E] sm:px-10 sm:py-4 sm:text-lg"
          >
            Explore Engagement Rings
          </Link>
        </section>
      </div>
    </div>
  );
}
