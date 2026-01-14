import { useState } from "react";
import CheckoutSteps from "../../components/checkout/CheckoutSteps";
import Cart from "./Cart";
import SummaryPage from "./OrderSummaryPage";
import PaymentPage from "./PaymentPage";
import CompletePage from "./CompletePage";
import Heading from "@/components/ui/Heading";
import { useCart } from "@/hooks/useCart";
import EmptyCart from "@/components/shared/EmptyCart";

export default function Checkout() {
  const { data: cartData, isLoading } = useCart();
  const [step, setStep] = useState(1);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium">
        Loading your cart...
      </div>
    );
  }

  // Empty cart
  if (
    (step !== 4 && !cartData?.data) ||
    (step !== 4 && cartData.data.items?.length === 0)
  ) {
    return <EmptyCart />;
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Cart onNext={() => setStep(2)} />;
      case 2:
        return <SummaryPage onNext={() => setStep(3)} />;
      case 3:
        return <PaymentPage onNext={() => setStep(4)} />;
      case 4:
        return <CompletePage />;
      default:
        return <Cart onNext={() => setStep(2)} />;
    }
  };

  return (
    <div className="mx-auto min-h-screen p-4 sm:p-6">
      <Heading>Check Out</Heading>

      <div className="mt-10 overflow-x-auto">
        <CheckoutSteps currentStep={step} />
      </div>

      <div className="mt-4 w-full sm:mt-6">{renderStep()}</div>
    </div>
  );
}
