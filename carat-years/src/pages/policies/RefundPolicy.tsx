import Heading from "../../components/ui/Heading";

export default function ReturnExchangePolicy() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="p-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <Heading>Return / Exchange Policy</Heading>
          <p className="mt-3 text-lg text-gray-500">
            Lifetime Exchange & Buy-Back Policy
          </p>
        </div>

        <div className="space-y-8 text-gray-700">
          {/* Intro */}
          <section>
            <p className="leading-relaxed text-gray-600">
              At <strong>Carat Years</strong>, every piece marks a milestone.
              While jewellery is personal and final, its value should endure.
              Our <strong>Lifetime Exchange & Buy-Back Policy</strong> ensures
              that your Carat Years creation always carries meaning — and value.
            </p>
          </section>

          {/* No Returns */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              No Returns
            </h2>
            <p className="leading-relaxed text-gray-600">
              Carat Years does not offer returns or refunds once a purchase is
              completed.
              <br />
              <br />
              All jewellery is crafted to order and undergoes rigorous quality
              checks prior to delivery.
            </p>
          </section>

          {/* Lifetime Exchange */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              Lifetime Exchange
            </h2>
            <p className="mb-4 text-gray-600">
              You may exchange your Carat Years jewellery at any time.
            </p>

            <h3 className="mb-2 font-medium text-gray-800">Exchange Value</h3>
            <ul className="list-disc px-10 text-gray-600 space-y-1">
              <li>
                <strong>Gold:</strong> 100% of prevailing market value (as per
                purity and net weight)
              </li>
              <li>
                <strong>Diamonds:</strong> 100% of original bill value
              </li>
              <li>
                <strong>Non-refundable:</strong> Making charges, GST / VAT,
                promotional discounts (if any)
              </li>
            </ul>

            <h3 className="mt-4 mb-2 font-medium text-gray-800">Process</h3>
            <ul className="list-disc px-10 text-gray-600 space-y-1">
              <li>
                Exchange value is adjusted against a new Carat Years purchase.
              </li>
              <li>Any price difference is payable by the customer.</li>
              <li>
                Jewellery must be returned in wearable condition with the
                original invoice and diamond certificate.
              </li>
              <li>Processing and logistics charges may apply.</li>
            </ul>
          </section>

          {/* Lifetime Buy-Back */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              Lifetime Buy-Back
            </h2>
            <p className="mb-4 text-gray-600">
              You may choose to sell your jewellery back to Carat Years at any
              time.
            </p>

            <h3 className="mb-2 font-medium text-gray-800">Buy-Back Value</h3>
            <ul className="list-disc px-10 text-gray-600 space-y-1">
              <li>
                <strong>Gold:</strong> 100% of prevailing market value
              </li>
              <li>
                <strong>Diamonds:</strong> 70% of original bill value
              </li>
              <li>
                <strong>Non-refundable:</strong> Making charges, GST / VAT,
                promotional discounts (if any)
              </li>
            </ul>

            <h3 className="mt-4 mb-2 font-medium text-gray-800">Settlement</h3>
            <ul className="list-disc px-10 text-gray-600 space-y-1">
              <li>
                Buy-back value is credited via bank transfer within{" "}
                <strong>10–15 business days</strong> post inspection.
              </li>
              <li>
                Items with damage, missing stones, altered settings or missing
                certificates may be declined or subject to deductions.
              </li>
              <li>
                Buy-back limits and additional verification may apply for
                high-value invoices.
              </li>
            </ul>
          </section>

          {/* General Terms */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              General Terms
            </h2>
            <ul className="list-disc px-10 text-gray-600 space-y-1">
              <li>
                Applicable only to jewellery purchased from Carat Years.
              </li>
              <li>Values are determined post quality inspection.</li>
              <li>
                Carat Years reserves the right to amend this policy at its
                discretion.
              </li>
              <li>
                In case of dispute, Carat Years’ decision shall be final.
              </li>
            </ul>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              Privacy & Data Protection
            </h2>
            <p className="leading-relaxed text-gray-600">
              Carat Years respects your privacy. Customer data is collected
              solely for order fulfilment, exchange / buy-back processing,
              regulatory compliance and service communication. We do not sell or
              share personal data except with trusted service partners where
              required.
            </p>

            <p className="mt-3 text-gray-600">
              View full policy at{" "}
              <a
                href="https://www.caratyears.com/privacy"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.caratyears.com/privacy
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
