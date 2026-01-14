export default function PrivacyPolicy() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-r from-amber-50 to-orange-100">
      <div className="w-3/4 max-w-4xl p-8">
        <h1 className="mb-6 flex items-center justify-center text-2xl font-bold text-black">
          <span className="h-0.5 grow bg-linear-to-r from-transparent to-[#FFE2A6]"></span>
          <span className="mx-4">Privacy Policy</span>
          <span className="h-0.5 grow bg-linear-to-l from-transparent to-[#FFE2A6]"></span>
        </h1>
        <p className="mb-4 text-gray-600">
          At Carat Years, we value your privacy and are committed to protecting
          your personal information. This Privacy Policy explains how we
          collect, use, and safeguard your data when you interact with our
          website or services.
        </p>
        <h2 className="mt-4 mb-2 text-xl font-semibold text-gray-700">
          Information We Collect
        </h2>
        <p className="mb-4 text-gray-600">
          We may collect personal details such as name, email address, phone
          number, and payment information when you make purchases or create an
          account.
        </p>
        <h2 className="mt-4 mb-2 text-xl font-semibold text-gray-700">
          How We Use Your Information
        </h2>
        <p className="mb-4 text-gray-600">
          We use your data to process orders, improve our services, and
          communicate with you about offers or updates.
        </p>
        <p className="text-gray-600">
          For more details or queries, please contact our support team.
        </p>
      </div>
    </div>
  );
}
