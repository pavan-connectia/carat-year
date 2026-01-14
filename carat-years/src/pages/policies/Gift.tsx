import Heading from "../../components/ui/Heading";
import { Button } from "../../components/ui/button";

export default function Gift() {
  return (
    <div className="flex min-h-screen flex-col items-center overflow-x-hidden pt-10">
      <div className="mb-10 max-w-3xl px-4 text-center">
        <Heading>Gift Card</Heading>
        <p className="mt-5 text-lg text-gray-500">
          Celebrate life’s special moments with a Carat Years Gift Card — the
          perfect way to let your loved ones choose the jewellery piece they’ll
          cherish forever.
        </p>
      </div>

      {/* Step 1 */}
      <section className="w-screen bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 p-10 text-center">
        <div className="mx-auto max-w-6xl">
          <h2 className="m-5 text-2xl font-semibold text-gray-800">
            Step 1: Choose Gift Card Type
          </h2>
          <div className="flex flex-col justify-center gap-10 text-center md:flex-row">
            <div className="m-10 flex-1 p-8">
              <h3 className="text-[#533D0E]">Digital</h3>
              <p className="leading-relaxed text-gray-600">
                Sent instantly to their email — perfect for last-minute gifting.
              </p>
              <Button className="mt-3 bg-[#533D0E] px-6 py-2 text-white hover:bg-white hover:text-[#533D0E]">
                Select
              </Button>
            </div>
            <div className="m-10 flex-1 p-8">
              <h3 className="text-[#533D0E]">Physical</h3>
              <p className="leading-relaxed text-gray-600">
                Delivered in an elegant Carat Years box, beautifully packaged
                for a memorable surprise.
              </p>
              <Button className="mt-3 bg-[#533D0E] px-6 py-2 text-white hover:bg-white hover:text-[#533D0E]">
                Select
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 */}
      <section className="w-screen p-10 text-center">
        <h2 className="m-5 text-2xl font-semibold text-gray-800">
          Step 2: Select Gift Card Value
        </h2>
        <div className="flex flex-col justify-center gap-10 text-center md:flex-row">
          <Button className="m-10 flex-1 border border-[#533D0E] bg-white p-8 text-[#533D0E] hover:bg-[#533D0E] hover:text-white">
            ₹5,000
          </Button>
          <Button className="m-10 flex-1 border border-[#533D0E] bg-white p-8 text-[#533D0E] hover:bg-[#533D0E] hover:text-white">
            ₹10,000
          </Button>
          <Button className="m-10 flex-1 border border-[#533D0E] bg-white p-8 text-[#533D0E] hover:bg-[#533D0E] hover:text-white">
            ₹25,000
          </Button>
        </div>
        <input
          className="mx-auto mt-5 rounded-none border-0 border-b border-[#533D0E] px-0 py-3 placeholder:text-[#533D0E] focus:border-b-2 focus:border-[#533D0E] focus:ring-0 focus-visible:outline-none"
          placeholder="Enter Custom Amount (₹)"
        />
      </section>

      {/* Step 3 */}
      <section className="w-screen bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 px-6 py-16">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">
            Step 3: Personalize Your Gift
          </h2>

          <form className="flex flex-col">
            <input
              className="mt-5 rounded-none border-0 border-b border-[#533D0E] bg-transparent px-0 py-3 placeholder:text-[#533D0E] focus:border-b-2 focus:border-[#533D0E] focus:ring-0 focus-visible:outline-none"
              placeholder="Recipient's Name *"
            />
            <input
              className="mt-5 rounded-none border-0 border-b border-[#533D0E] bg-transparent px-0 py-3 placeholder:text-[#533D0E] focus:border-b-2 focus:border-[#533D0E] focus:ring-0 focus-visible:outline-none"
              placeholder="Recipient's Email *"
            />
            <input
              className="mt-5 rounded-none border-0 border-b border-[#533D0E] bg-transparent px-0 py-3 placeholder:text-[#533D0E] focus:border-b-2 focus:border-[#533D0E] focus:ring-0 focus-visible:outline-none"
              placeholder="Your Email *"
            />
            <input
              className="mt-5 rounded-none border-0 border-b border-[#533D0E] bg-transparent px-0 py-3 placeholder:text-[#533D0E] focus:border-b-2 focus:border-[#533D0E] focus:ring-0 focus-visible:outline-none"
              placeholder="Your Name *"
            />

            <textarea
              className="mt-5 h-28 resize-none rounded-none border-0 border-b border-[#533D0E] bg-transparent px-0 py-3 placeholder:text-[#533D0E] focus:border-b-2 focus:border-[#533D0E] focus:ring-0 focus-visible:outline-none"
              placeholder="Personal Message *"
            ></textarea>

            <p className="mt-6 text-sm leading-relaxed text-gray-600">
              Fields marked with * are mandatory. <br />
              <br />• Gift cards are valid for <strong>24 months</strong> from
              the date of purchase. <br />• Gift cards cannot be replaced,
              refunded, or exchanged for cash. <br />
              • In case of returns, the refunded amount will be credited back to
              the original gift card. <br />
              • Discounts, coupons, or promotional codes cannot be used to
              purchase gift cards. <br />• Applicable on all Carat Years stores
              and online purchases across India.
            </p>

            <Button className="mt-10 bg-[#533D0E] px-6 py-3 text-white hover:bg-white hover:text-[#533D0E]">
              Add to Bag
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
