import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function CompletePage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="mt-10 flex justify-center px-4">
      <div className="w-full max-w-2xl rounded-md border bg-[#fff7f2] p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Complete Order</h2>
        <p className="mb-2 text-lg font-medium">Thank you for your order</p>
        <p className="mb-6 text-gray-700">
          Your order will be delivered in 3 working days. If not, most probably
          it will be delivered in 7 to 10 days. Otherwise, contact us to provide
          given contact details or just send us an email.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-700">
            Regards
            <br />
            Himanshi Verma
          </p>
          <Button
            onClick={handleBackToHome}
            className="rounded-2xl bg-[#351043] px-6 py-2 font-medium text-white hover:bg-[#3c1b48]"
          >
            Back to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
