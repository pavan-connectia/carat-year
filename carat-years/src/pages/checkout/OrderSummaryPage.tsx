import { useState } from "react";
import OrderSummaryBox from "./OrderSummaryBox";
import { Pencil } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAddresss } from "@/hooks/useAddress";
import type { TAddress } from "@/types/api";
import AddressModal from "@/components/account/AddressModal";
import { Button } from "@/components/ui/button";

export default function OrderSummaryPage({ onNext }: { onNext: () => void }) {
  const { data: cartData } = useCart();
  const { data: addressData } = useAddresss();
  const [selectedAddress, setSelectedAddress] = useState<TAddress | null>(null);
  const [open, setOpen] = useState<"none" | "new" | "view">("none");

  const cart = cartData?.data;
  if (!cart) return <p>Loading cart...</p>;

  const handleSelect = (address: TAddress) => {
    setSelectedAddress(address);
    sessionStorage.setItem("addressId", address._id ?? "");
  };

  const handleContinue = () => {
    if (!selectedAddress) {
      alert("Please select a shipping address before continuing.");
      return;
    }
    onNext();
  };

  const totalPrice = Math.round(cart.subtotal);
  const discount = cart.totalDiscount;
  const total = cart.finalTotal;

  return (
    <div className="flex flex-col-reverse gap-6 lg:flex-row">
      <div className="flex-1 space-y-8">
        <h2 className="text-lg font-bold">Shipping Address</h2>

        {addressData?.data?.length === 0 && (
          <p className="text-gray-600">No saved addresses found.</p>
        )}

        <div className="space-y-4">
          {addressData?.data?.map((a: TAddress) => (
            <label
              key={a?._id}
              className={`relative flex cursor-pointer flex-col rounded-lg border p-4 shadow-sm transition ${
                selectedAddress?._id === a._id
                  ? "border-[#F39D08] bg-[#fdf7ed]"
                  : "border-gray-300 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="absolute top-3 right-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAddress(a);
                    setOpen("view");
                  }}
                  className="text-gray-500 hover:text-[#7A7A7A]"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress?._id === a._id}
                  onChange={() => handleSelect(a)}
                  className="mt-1 size-4 cursor-pointer accent-[#F39D08]"
                />

                <div>
                  <p className="text-lg font-semibold">{a?.name}</p>
                  <p className="text-sm text-[#7A7A7A]">{a?.phone}</p>
                  <p className="text-sm text-[#7A7A7A]">{a?.email}</p>

                  <p className="mt-1 text-sm whitespace-pre-line text-[#7A7A7A]">
                    {a?.addressLine1}
                    {a?.addressLine2 ? `, ${a.addressLine2}` : ""}
                    {a?.landmark ? `, Landmark: ${a.landmark}` : ""}, {a?.city},{" "}
                    {a?.state} - {a?.pincode}
                  </p>
                </div>
              </div>
            </label>
          ))}
        </div>

        <Button
          type="button"
          className="w-full cursor-pointer rounded-3xl bg-[#351043] px-4 py-3 font-medium text-white transition-colors hover:bg-purple-950 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 focus:outline-none"
          onClick={() => {
            setSelectedAddress(null);
            setOpen("new");
          }}
        >
          Add New Address
        </Button>
      </div>

      <AddressModal
        open={open === "new" || open === "view"}
        onClose={() => setOpen("none")}
        address={selectedAddress}
      />

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
