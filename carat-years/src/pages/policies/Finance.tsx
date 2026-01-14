import Heading from "../../components/ui/Heading";

export default function Finance() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 py-10">
      <div className="p-10">
        <div className="mb-10 text-center">
          <Heading>Finance</Heading>
          <p className="mt-7 text-lg leading-relaxed text-gray-500">
            At Carat Years, we understand that fine jewellery is a meaningful
            investment. That’s why we’ve partnered with trusted financial
            providers to offer easy and flexible EMI options through major banks
            and payment partners such as HDFC, ICICI, Axis, and Bajaj Finserv.
            These options make your shopping experience simple, affordable and
            stress-free. Choose “Easy EMI” at checkout to spread the cost of
            your purchase across convenient monthly installments.
          </p>
        </div>
      </div>

      {/* --- Carat Years Finance Info --- */}
      <div className="max-w-7xl space-y-10 text-gray-700">
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">
            Carat Years Financing
          </h2>
          <p className="leading-relaxed text-gray-600">
            For purchases above ₹25,000, we offer completely interest-free EMI
            options for 3 or 6 months with a small 10% initial down payment.
            <br />
            <br />
            For purchases above ₹75,000, you can choose 9 or 12 month EMI
            options with 0% interest, again with just a 10% deposit.
            <br />
            <br />
            We also provide longer-term EMI plans at attractive rates for 18,
            24, or 36 months with 12.9% p.a. interest, so you can buy your dream
            jewellery today and pay comfortably over time.
          </p>
        </section>

        {/* --- Finance Example Cards --- */}
        <section className="flex flex-col items-center justify-center px-6 py-16">
          <div className="flex flex-col gap-10 md:flex-row">
            {/* --- Card 1 --- */}
            <div className="max-w-sm flex-1 divide-y rounded-xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-6 shadow-md transition hover:shadow-lg">
              <h2 className="mb-5 text-center text-2xl font-semibold text-gray-800">
                0% Interest EMI
                <br />3 Month Example
              </h2>
              <ul className="divide-y divide-orange-100">
                <li className="flex justify-between px-4 py-2">
                  <span>Jewellery Price</span>
                  <span className="font-medium">₹25,000</span>
                </li>
                <li className="flex justify-between px-4 py-2">
                  <span>Down Payment 10%</span>
                  <span className="font-medium">₹2,500</span>
                </li>
                <li className="flex justify-between px-4 py-2">
                  <span>Amount Financed</span>
                  <span className="font-medium">₹22,500</span>
                </li>
                <li className="flex justify-between px-4 py-2">
                  <span>Interest</span>
                  <span className="font-medium">₹0.00</span>
                </li>
                <li className="flex justify-between px-4 py-2">
                  <span>Total Payable</span>
                  <span className="font-medium">₹22,500</span>
                </li>
                <li className="flex justify-between px-4 py-2">
                  <span>3 Monthly EMIs</span>
                  <span className="font-medium">₹7,500 (0%)</span>
                </li>
              </ul>
            </div>

            {/* --- Card 2 --- */}
            <div className="max-w-sm flex-1 divide-y rounded-xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-6 shadow-md transition hover:shadow-lg">
              <h2 className="mb-5 text-center text-2xl font-semibold text-gray-800">
                0% Interest EMI
                <br />6 Month Example
              </h2>
              <ul className="divide-y divide-orange-100">
                <li className="flex justify-between px-4 py-2">
                  <span>Jewellery Price</span>
                  <span className="font-medium">₹50,000</span>
                </li>
                <li className="flex justify-between px-4 py-2">
                  <span>Down Payment 10%</span>
                  <span className="font-medium">₹5,000</span>
                </li>
                <li className="flex justify-between px-4 py-2">
                  <span>Amount Financed</span>
                  <span className="font-medium">₹45,000</span>
                </li>
                <li className="flex justify-between px-4 py-2">
                  <span>Interest</span>
                  <span className="font-medium">₹0.00</span>
                </li>
                <li className="flex justify-between px-4 py-2">
                  <span>Total Payable</span>
                  <span className="font-medium">₹45,000</span>
                </li>
                <li className="flex justify-between px-4 py-2">
                  <span>6 Monthly EMIs</span>
                  <span className="font-medium">₹7,500 (0%)</span>
                </li>
              </ul>
            </div>

            {/* --- Card 3 --- */}
            <div className="max-w-sm flex-1 divide-y rounded-xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-6 shadow-md transition hover:shadow-lg">
              <h2 className="mb-5 text-center text-2xl font-semibold text-gray-800">
                12.9% p.a. EMI Option
                <br />
                12 Month Example
              </h2>
              <ul className="divide-y divide-orange-100">
                <li className="flex justify-between px-4 py-2">
                  <span>Jewellery Price</span>
                  <span className="font-medium">₹1,00,000</span>
                </li>
                <li className="flex justify-between px-4 py-2">
                  <span>Down Payment 10%</span>
                  <span className="font-medium">₹10,000</span>
                </li>
                <li className="flex justify-between px-4 py-2">
                  <span>Amount Financed</span>
                  <span className="font-medium">₹90,000</span>
                </li>
                <li className="flex justify-between px-4 py-2">
                  <span>Interest</span>
                  <span className="font-medium">₹5,850</span>
                </li>
                <li className="flex justify-between px-4 py-2">
                  <span>Total Payable</span>
                  <span className="font-medium">₹95,850</span>
                </li>
                <li className="flex justify-between px-4 py-2">
                  <span>12 Monthly EMIs</span>
                  <span className="font-medium">₹7,987 (12.9%)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- Below the cards --- */}
          <div className="mt-16">
            <h3 className="mb-4 text-xl font-semibold">
              Minimum & Maximum Loan Value
            </h3>
            <p className="leading-relaxed text-gray-600">
              <strong>Minimum loan value</strong> refers to the financed amount
              after the 10% down payment.
              <br />
              <br />
              <span className="block">
                3 & 6 Month 0% EMI — Min ₹25,000 — Max ₹3,00,000
              </span>
              <span className="block">
                9 & 12 Month 0% EMI — Min ₹75,000 — Max ₹5,00,000
              </span>
              <span className="block">
                12–36 Month 12.9% EMI — Min ₹50,000 — Max ₹10,00,000
              </span>
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">
            What is the cost of the EMI?
          </h2>
          <p className="leading-relaxed text-gray-600">
            The total cost depends on your repayment duration and whether your
            plan includes interest. 0% EMI plans have no additional charge,
            while longer tenures may attract nominal interest as per bank
            policy.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">
            Important Notes
          </h2>
          <p className="leading-relaxed text-gray-600">
            Carat Years Jewellery Pvt. Ltd. acts as a credit intermediary and
            partners with NBFCs and banks for EMI services. All finance options
            are subject to approval as per lender policy and RBI regulations.
            <br />
            <br />
            Carat Years Jewellery Pvt. Ltd., registered office at Mumbai,
            Maharashtra, India. Credit facilities are offered through our
            financing partners such as Bajaj Finserv, HDFC Bank, ICICI Bank,
            Axis Bank, and Pine Labs.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">
            How to Apply
          </h2>
          <p className="leading-relaxed text-gray-600">
            You can select “Easy EMI with Carat Years” during checkout. Once you
            choose your preferred bank and plan, you’ll be redirected to the
            lender’s secure page for instant approval — it takes just a few
            minutes.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">
            Eligibility Criteria
          </h2>
          <p className="leading-relaxed text-gray-600">
            To apply for EMI finance, you must meet the following requirements:
          </p>
          <ul className="mx-10 list-disc">
            <li>Be at least 18 years old.</li>
            <li>Be an Indian resident with valid address proof.</li>
            <li>Have a steady source of income (salaried or self-employed).</li>
            <li>Possess a valid PAN card and Aadhaar number.</li>
            <li>
              Have a bank account or credit card eligible for EMI conversion.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">
            RBI Guidelines
          </h2>
          <p className="leading-relaxed text-gray-600">
            All EMI facilities offered by Carat Years are in compliance with
            Reserve Bank of India (RBI) norms. Please ensure timely repayment to
            maintain a healthy credit score and avoid penalties or extra
            charges.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">
            Benefits of Buying Jewellery on EMI
          </h2>
          <ul className="mx-10 list-disc">
            <li>Own your dream jewellery with only 10% down payment.</li>
            <li>Choose flexible tenures from 3 to 36 months.</li>
            <li>Enjoy 0% interest on select plans.</li>
            <li>Quick and paperless approval process.</li>
            <li>
              Keep your savings intact while planning long-term purchases.
            </li>
            <li>Fixed monthly installments for easy budgeting.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">
            Engagement Rings on EMI
          </h2>
          <p className="leading-relaxed text-gray-600">
            Engagement rings mark one of life’s most special moments. Carat
            Years offers flexible EMI options so you can choose the perfect ring
            without financial pressure. Select your desired plan at checkout or
            consult our team for personalized guidance.
          </p>
        </section>
      </div>
    </div>
  );
}
