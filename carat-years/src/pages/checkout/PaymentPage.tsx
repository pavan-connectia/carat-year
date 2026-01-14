import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import OrderSummaryBox from "./OrderSummaryBox";
import { useCart } from "@/hooks/useCart";
import { useCreateToOrder } from "@/hooks/useOrder";

export default function PaymentPage({ onNext }: { onNext: () => void }) {
  const { data: cartData } = useCart();
  const { mutate } = useCreateToOrder();

  const [method, setMethod] = useState<"COD" | "card" | "upi" | "other">(
    "card",
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    { name: "Paytm", logo: "/logos/paytm.png" },
    { name: "Amazon Pay", logo: "/logos/amazonpay.png" },
    { name: "PhonePe", logo: "/logos/phonepe.png" },
  ];

  const handleContinue = () => {
    const addressId = sessionStorage.getItem("addressId") ?? "";

    mutate(
      {
        addressId: addressId,
        paymentMethod: "COD",
      },
      {
        onSuccess: () => {
          onNext();
        },
      },
    );
  };

  const cart = cartData.data;
  const totalPrice = Math.round(cart.subtotal);
  const discount = cart.totalDiscount;
  const total = cart.finalTotal;

  return (
    <div className="flex flex-col-reverse gap-6 lg:flex-row">
      <div className="flex-1 space-y-8">
        <h2 className="text-lg font-semibold">Payment Details</h2>
        <Label className="flex cursor-pointer items-center gap-2">
          <Input
            type="radio"
            checked={method === "COD"}
            onChange={() => setMethod("COD")}
            className="h-4 w-4"
          />
          <span>Cash On Delivery</span>
        </Label>
        <Label className="flex cursor-pointer items-center gap-2">
          <Input
            type="radio"
            checked={method === "card"}
            onChange={() => setMethod("card")}
            className="h-4 w-4"
          />
          <span>Pay with Debit or Credit card</span>
        </Label>
        {method === "card" && (
          <div className="grid grid-cols-2 gap-4 p-4">
            <Input
              type="text"
              placeholder="Name on the card"
              className="col-span-2"
            />
            <Input
              type="text"
              placeholder="Card Number"
              className="col-span-2"
            />
            <Input type="text" placeholder="Date of Expiry" />
            <Input type="text" placeholder="CVV" />
          </div>
        )}

        <Label className="flex cursor-pointer items-center gap-2">
          <Input
            type="radio"
            checked={method === "upi"}
            onChange={() => setMethod("upi")}
            className="h-4 w-4"
          />
          <span>Pay with UPI</span>
        </Label>
        {method === "upi" && (
          <Input type="text" placeholder="UPI ID" className="w-1/2" />
        )}

        <p className="text-gray-600">Or pay with</p>
        <div className="flex gap-4">
          {options.map((option) => (
            <button
              key={option.name}
              onClick={() => setSelectedOption(option.name)}
              className={`flex h-20 items-center gap-2 rounded-md border px-4 py-2 ${
                selectedOption === option.name
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              <img
                src={option.logo}
                alt={option.name}
                className="h-12 w-20 object-contain"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="lg:w-72 lg:shrink-0">
        <OrderSummaryBox
          items={cart.items.length}
          price={totalPrice}
          discount={discount}
          total={total}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}
