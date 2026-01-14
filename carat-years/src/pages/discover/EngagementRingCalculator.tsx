import { useState } from "react";
import Heading from "@/components/ui/Heading";
import { Link } from "react-router";

export default function EngagementRingCalculator() {
  const [salary, setSalary] = useState("");
  const [expenses, setExpenses] = useState("");
  const [months, setMonths] = useState("");
  const [budget, setBudget] = useState<number | null>(null);

  const calculateBudget = () => {
    const s = parseFloat(salary) || 0;
    const e = parseFloat(expenses) || 0;
    const m = parseFloat(months) || 0;
    const monthlyIncome = s / 12;
    const savingsPotential = Math.max(monthlyIncome - e, 0);
    const total = Math.round(savingsPotential * m);
    setBudget(total);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 py-12">
      {/* --- Hero Section --- */}
      <div className="mb-12 max-w-4xl text-center">
        <Heading>Engagement Ring Calculator</Heading>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          Wondering how much you should spend on an engagement ring? Our
          calculator helps you set a budget based on your lifestyle, so you can
          find the perfect ring without the guesswork.
        </p>
      </div>

      {/* --- Calculator --- */}
      <div className="mb-16 w-full max-w-2xl rounded-3xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-8 shadow-md">
        <h2 className="mb-8 text-center text-xl font-semibold text-[#533D0E]">
          Find Out What You Can Comfortably Spend
        </h2>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              £ Annual salary (Take Home) *
            </label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter your annual take-home pay"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              £ Current monthly finances? *
            </label>
            <input
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              placeholder="Enter your average monthly expenses"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              How many months until you propose? *
            </label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              placeholder="Enter number of months you plan to save"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-300 focus:outline-none"
            />
          </div>

          <button
            onClick={calculateBudget}
            className="mt-4 w-full rounded-full bg-[#533D0E] py-3 font-medium text-white transition hover:bg-[#3F2F0A]"
          >
            Calculate My Budget
          </button>

          {budget !== null && (
            <div className="mt-6 text-center text-lg">
              <p className="text-gray-800">
                Based on your inputs, you could afford around:
              </p>
              <p className="mt-2 text-3xl font-semibold text-[#533D0E]">
                £{budget.toLocaleString()}
              </p>
              <p className="mt-1 text-gray-500">
                (This is a general guide — your comfort and priorities matter
                most.)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- Informational Sections --- */}
      <div className="max-w-5xl space-y-16 leading-relaxed text-gray-700">
        {/* Average Cost */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            What’s the Average Cost of an Engagement Ring?
          </h2>
          <p className="mb-4">
            So you’re getting ready to pop that all-important question but not
            sure how much to spend? The UK average paid price for an engagement
            ring is around <strong>£1,483</strong>, and you can absolutely find
            a stunning piece within that range. The amount you choose to spend,
            however, should depend entirely on your personal budget and
            preferences.
          </p>
          <p>
            Ring prices vary depending on the <strong>metal type</strong>,
            <strong> diamond cut, clarity, colour, and carat weight</strong>.
            For example, a tighter budget might lead you to an elegant 9kt gold
            setting, while a higher budget could accommodate a durable, timeless
            platinum design.
          </p>
        </section>

        {/* Affordability */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            What Ring Can I Afford Based on My Salary?
          </h2>
          <p className="mb-4">
            The old saying goes that you should spend one to three months’
            salary on an engagement ring. However, this is just a myth — what
            matters most is what feels right for you.
          </p>
          <p>
            A more practical approach is to look at your{" "}
            <strong>annual salary</strong>,<strong> monthly expenses</strong>,
            and <strong>savings time frame</strong>. Using the calculator above,
            you can quickly estimate a comfortable budget that fits your
            financial situation.
          </p>
        </section>

        {/* Saving Tips */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            The Best Ways to Save for an Engagement Ring
          </h2>
          <p className="mb-4">
            Once you’ve set your budget, it’s time to start saving. Here are a
            few practical tips:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Do your research:</strong> Explore our{" "}
              <Link
                to="/education/diamond-guide"
                className="text-[#533D0E] underline"
              >
                Diamond Education
              </Link>{" "}
              and{" "}
              <Link
                to="/education/metal-guide"
                className="text-[#533D0E] underline"
              >
                Metal Guide
              </Link>{" "}
              to learn how different factors affect pricing.
            </li>
            <li>
              Decide on your preferred ring style early and stick to a set
              budget.
            </li>
            <li>Set up automatic transfers into a separate savings account.</li>
            <li>
              Skip non-essential purchases and save any extra income or bonuses.
            </li>
            <li>
              Stay consistent — small amounts saved regularly make a big
              difference.
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Ready to Find the Perfect Engagement Ring?
          </h2>
          <Link
            to="/collection/engagement-rings"
            className="mt-6 rounded-full border border-[#533D0E] bg-[#533D0E] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-[#533D0E] sm:px-10 sm:py-4 sm:text-lg"
          >
            Explore Best Selling Engagement Rings
          </Link>
        </section>
      </div>
    </div>
  );
}
