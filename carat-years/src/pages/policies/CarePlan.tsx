import Heading from "../../components/ui/Heading";

type Row = {
  label: string;
  values: Array<string | number | null>;
};

const plans = ["1 Year", "2 Years", "3 Years", "4 Years", "5 Years"];

const rows: Row[] = [
  {
    label: "Price (INR)",
    values: ["₹4,999", "₹8,999", "₹12,499", "₹15,999", "₹19,499"],
  },
  {
    label: "Cleaning & Polishing Service",
    values: [
      "1 per year",
      "1 per year",
      "1 per year",
      "1 per year",
      "1 per year",
    ],
  },
  {
    label: "Stone Tightening",
    values: [
      "1 per year",
      "1 per year",
      "1 per year",
      "1 per year",
      "1 per year",
    ],
  },
  {
    label: "Earring Repairs",
    values: [
      "1 per year",
      "1 per year",
      "1 per year",
      "1 per year",
      "1 per year",
    ],
  },
  {
    label: "Chain & Bracelet Soldering",
    values: [
      "1 per year",
      "1 per year",
      "1 per year",
      "1 per year",
      "1 per year",
    ],
  },
  {
    label: "Resetting Diamonds & Gemstones",
    values: [
      "1 per year",
      "1 per year",
      "1 per year",
      "1 per year",
      "1 per year",
    ],
  },
  {
    label: "Clasp Replacement",
    values: [
      "1 per year",
      "1 per year",
      "1 per year",
      "1 per year",
      "1 per year",
    ],
  },
  {
    label: "Complimentary Jewellery Inspection",
    values: [
      "1 per year",
      "1 per year",
      "1 per year",
      "1 per year",
      "1 per year",
    ],
  },
  {
    label: "Free Engraving (for plan duration)",
    values: ["1", "1", "1", "1", "1"],
  },
  {
    label: "Ring Resizing (for plan duration)",
    values: ["1", "1", "1", "1", "1"],
  },
  {
    label: "Free use of CAD Design Service (Wedding Rings Only)",
    values: [null, null, null, null, "1 per year"],
  },
];

const JewelleryPlanTable = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="mx-auto max-w-6xl">
        <table className="min-w-full divide-gray-200 border-2 dark:divide-gray-700">
          <thead className="rounded-xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-6 shadow-md transition hover:shadow-lg">
            <tr>
              <th scope="col" className="sticky left-0">
                Plan Details
              </th>
              {plans.map((p) => (
                <th
                  key={p}
                  scope="col"
                  className="px-6 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  {p}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
            {rows.map((row) => (
              <tr
                key={row.label}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-6 px-4 py-3 text-sm font-medium whitespace-nowrap shadow-md transition hover:shadow-lg">
                  {row.label}
                </td>

                {row.values.map((val, idx) => (
                  <td
                    key={idx}
                    className="px-6 py-3 text-center text-sm whitespace-nowrap text-gray-700 dark:text-gray-300"
                  >
                    {val ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function CarePlan() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="p-10">
        <div className="mb-10 text-center">
          <Heading>Jewellery Care Plan</Heading>
          <p className="mt-5 text-lg text-gray-500">
            At Carat Years, we understand that your jewellery deserves lifelong
            care. Our Jewellery Care Plan helps you maintain the brilliance and
            craftsmanship of your jewellery through regular servicing and
            professional maintenance at exclusive member pricing.
          </p>
        </div>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              What Does the Plan Offer & How Much Does It Cost?
            </h2>
            <JewelleryPlanTable />
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              Terms & Conditions
            </h2>
            <p className="leading-relaxed text-gray-600">
              The plan is valid only for purchases made directly from Carat
              Years. Services must be availed through authorised Carat Years
              stores or service partners. To view the complete terms and
              conditions, please{" "}
              <a href="#" className="text-blue-600 underline">
                click here
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
