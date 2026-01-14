import Heading from "../../components/ui/Heading";

export default function Lifetime() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-5">
        <div className="my-10 text-center">
          <Heading>Lifetime Manufacturing Guarantee</Heading>
          <p className="mt-5 text-lg text-gray-500">
            At Carat Years, we take great pride in the quality and craftsmanship
            of our jewellery. Each piece is carefully made with precision and
            attention to every detail to ensure lasting beauty.
          </p>
        </div>
        <div className="space-y-8 text-center text-gray-700">
          <p>
            All our products are thoroughly inspected before dispatch to ensure
            they reach you in perfect condition. In the rare event of a
            manufacturing issue, we offer a{" "}
            <strong>Lifetime Manufacturing Guarantee</strong>, under which we
            will repair your jewellery free of cost for any manufacturing defect
            throughout its lifetime.
          </p>

          <p>
            If you ever face an issue or wish to send your item for inspection
            or repair, please contact our <strong>Customer Service Team</strong>{" "}
            at{" "}
            <a
              href="mailto:support@caratyears.com"
              className="text-blue-600 underline"
            >
              support@caratyears.com
            </a>{" "}
            or call us on <strong>+91-99999-00000</strong>. Once we receive your
            jewellery, our experts will inspect it, and if any repair costs
            apply, we will inform you before proceeding with the work.
          </p>
        </div>
      </div>
    </div>
  );
}
