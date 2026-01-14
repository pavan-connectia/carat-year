import Heading from "../../components/ui/Heading";

export default function Delivery() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 py-10">
      <div className="p-10">
        <div className="mb-10 text-center">
          <Heading>Free Delivery</Heading>
          <p className="mt-5 text-lg leading-relaxed text-gray-500">
            At Carat Years, we offer free and fully insured delivery on all
            orders across India. Your jewellery will be delivered securely via
            our trusted logistics partners such as Blue Dart, Delhivery, or
            DTDC. All parcels are shipped in tamper-proof packaging and require
            a valid signature upon receipt. Each order is 100% insured until it
            is signed for at the delivery address.
            <br />
            <br />
            For international deliveries, nominal courier charges may apply
            depending on your location. You’ll be informed of this before your
            order is confirmed.
          </p>
        </div>

        <div className="space-y-10 text-gray-700">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              When Will I Receive My Item?
            </h2>
            <p className="leading-relaxed text-gray-600">
              Since most of our jewellery is made-to-order, manufacturing time
              typically takes between <strong>10–15 working days</strong>, and
              <strong> 3–4 weeks</strong> for custom or bespoke designs. This
              ensures each piece is crafted with perfection and precision.
              <br />
              <br />
              Once your jewellery is ready for dispatch, we’ll send you a
              shipping confirmation email with a <strong>tracking link</strong>
              so you can follow your parcel in real time.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              Can I Get My Order Sooner?
            </h2>
            <p className="leading-relaxed text-gray-600">
              Need it urgently? We do have select ready-to-ship designs that can
              reach you within <strong>3–5 working days</strong>. You can also
              contact us for express production or priority delivery.
              <br />
              <br />
              Reach out to us at{" "}
              <a
                href="mailto:support@caratyears.com"
                className="text-blue-600 underline"
              >
                support@caratyears.com
              </a>{" "}
              or call us at <strong>+91-99999-00000</strong> and our team will
              be happy to assist.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              Where Is My Order?
            </h2>
            <p className="leading-relaxed text-gray-600">
              You can check your order status anytime using the tracking link
              sent to your registered email and mobile number. If your order is
              still in production, please allow the standard 10–15 working days.
              <br />
              <br />
              For updates or assistance, email us at{" "}
              <a
                href="mailto:support@caratyears.com"
                className="text-blue-600 underline"
              >
                support@caratyears.com
              </a>{" "}
              or message our Customer Care team via WhatsApp on{" "}
              <strong>+91-99999-00000</strong>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              What If I Want to Deliver To A Different Address?
            </h2>
            <div>
              <p className="leading-relaxed text-gray-600">
                If you would like your delivery address to be different from
                your billing address, we’ll need the following verification
                documents before dispatch:
              </p>
              <ul className="list-disc px-10">
                <li>
                  A copy of the cardholder’s government ID proof – Aadhaar, PAN,
                  or Passport.
                </li>
                <li>
                  A copy of a recent utility bill or bank statement (dated
                  within the last 3 months) showing the billing address.
                </li>
                <li>
                  A signed authorization letter from the cardholder approving
                  delivery to an alternative address.
                </li>
              </ul>
              <p className="leading-relaxed text-gray-600">
                We can email you the letter format for convenience. Once we
                receive the verified documents, we’ll proceed with shipping.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              Will I Get a GST Invoice?
            </h2>
            <p className="leading-relaxed text-gray-600">
              Yes, all Carat Years orders include a{" "}
              <strong>GST-compliant invoice</strong>. The prices displayed on
              our website are inclusive of all applicable taxes. You’ll receive
              a physical and digital copy of your tax invoice along with your
              delivery.
              <br />
              <br />
              For corporate or business purchases, you can provide your GSTIN at
              checkout to include it in your invoice for input tax credit.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              International Shipping
            </h2>
            <p className="leading-relaxed text-gray-600">
              We ship internationally to select countries. Shipping charges and
              import duties may vary based on destination and order value.
              International orders are dispatched via reputed courier partners
              like FedEx or DHL. Please contact{" "}
              <a
                href="mailto:support@caratyears.com"
                className="text-blue-600 underline"
              >
                support@caratyears.com
              </a>{" "}
              for exact delivery timelines and costs for your country.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              Track Your Order
            </h2>
            <p className="mt-4 text-gray-600">
              To track your order, click{" "}
              <a
                href="https://www.caratyears.com/track-order"
                target="_blank"
                className="text-blue-600 underline"
              >
                here
              </a>{" "}
              and enter your order number or registered mobile number to see the
              latest status.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
