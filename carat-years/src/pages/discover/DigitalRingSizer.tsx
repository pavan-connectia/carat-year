import Heading from "@/components/ui/Heading";
import { Link } from "react-router";

export default function DigitalRingSizer() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 py-10">
      {/* --- Hero Section --- */}
      <div className="mb-12 max-w-4xl text-center">
        <Heading>Digital Ring Sizer</Heading>
        <p className="mt-4 text-lg leading-relaxed text-gray-500">
          Discover your perfect ring size with our new Digital Ring Sizer —
          measure your ring size accurately in just two easy steps, right from
          your screen!
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Carat Years Editorial Team • October 15, 2025
        </p>
        <img
          src="/ringsize/digital.png"
          alt="Digital Ring Sizer"
          className="mx-auto my-10 h-96 w-full max-w-3xl rounded-2xl object-cover shadow-md"
        />
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-5xl space-y-16 leading-relaxed text-gray-700">
        {/* How to Use Digital Ring Sizer */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            How to Use Our Digital Ring Sizer
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Step 1 */}
            <div className="rounded-2xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-6 shadow-md transition hover:shadow-lg">
              <h3 className="mb-3 font-medium text-gray-800">
                Step 1: Calibrate Your Screen
              </h3>
              <p className="mb-2">
                Use a <strong>credit card</strong> or a <strong>ruler</strong>{" "}
                to calibrate your screen’s dimensions.
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>Credit Card:</strong> Align the top of your card with
                  the top of the dotted line and use the{" "}
                  <span className="font-medium">(+)</span> and{" "}
                  <span className="font-medium">(-)</span> buttons until the
                  bottom line matches.
                </li>
                <li>
                  <strong>Ruler:</strong> Align 0 on the ruler with the 0 on the
                  screen and adjust until the on-screen numbers match.
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl bg-linear-to-b from-amber-50 via-yellow-50 to-orange-100 p-6 shadow-md transition hover:shadow-lg">
              <h3 className="mb-3 font-medium text-gray-800">
                Step 2: Measure Your Ring
              </h3>
              <p className="mb-2">
                Place your ring on the digital grid and use the{" "}
                <span className="font-medium">(+)</span> and{" "}
                <span className="font-medium">(-)</span> buttons to resize the
                circle.
              </p>
              <p>
                Once the arrows just touch the inside edges of your ring, you’ve
                found your exact ring size!
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/digital-ring-sizer-tool"
              className="rounded-full border border-[#533D0E] bg-[#533D0E] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-[#533D0E] sm:px-10 sm:py-4 sm:text-lg"
            >
              Find My Ring Size
            </Link>
          </div>
        </section>

        {/* Ring Size Conversion Chart */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Ring Size Conversion Chart
          </h2>
          <p className="mb-4">
            Our UK ring size conversion chart helps you find your perfect fit.
            Measure the circumference of your finger with a tape measure and
            match it to the chart below.
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

        {/* CTA Section */}
        <section className="mt-10 text-center">
          <p className="mb-4 text-gray-600">
            Not sure about your size? Order our free ring sizer or download our
            printable guide.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/downloads/ring-size-guide.pdf"
              className="rounded-full bg-[#533D0E] px-6 py-3 text-center text-white transition hover:bg-[#6f5115]"
            >
              Download Ring Size Guide
            </Link>
            <Link
              to="/order-ring-sizer"
              className="rounded-full border border-[#533D0E] px-6 py-3 text-center text-[#533D0E] transition hover:bg-[#533D0E] hover:text-white"
            >
              Order Free Ring Sizer
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
