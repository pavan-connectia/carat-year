import { cn } from "@/lib/utils";

interface StepProps {
  currentStep: number;
}

const steps = ["Cart", "Order Summary", "Payment", "Complete"];

export default function CheckoutSteps({ currentStep }: StepProps) {
  return (
    <div className="relative hidden items-start justify-center space-x-8 sm:flex">
      {steps.map((step, idx) => (
        <div key={idx} className="relative flex flex-col items-center">
          <div
            className={cn(
              "z-10 flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium",
              idx + 1 <= currentStep
                ? "bg-yellow-400 text-black"
                : "bg-gray-300 text-gray-600",
            )}
          >
            {idx + 1}
          </div>

          <span
            className={cn(
              "mt-1 text-center text-sm font-medium",
              idx + 1 <= currentStep ? "text-black" : "text-gray-500",
            )}
          >
            {step}
          </span>

          {idx !== steps.length - 1 && (
            <div
              className={cn(
                "absolute top-3 left-6 h-0.5 w-full",
                idx + 1 <= currentStep ? "bg-yellow-400" : "bg-gray-300",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
