import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Props {
  items: number;
  price: number;
  discount: number;
  total: number;
  onContinue: () => void;
}

export default function OrderSummaryBox({
  items,
  price,
  discount,
  total,
  onContinue,
}: Props) {
  return (
    <div className="w-full rounded-xl border border-gray-100 bg-[#FCF9F7] p-6 shadow-sm">
      <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Order Summary</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Bag Subtotal ({items} items)</span>
          <span className="font-medium">₹{price.toLocaleString("en-IN")}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Coupon Discount</span>
            <span className="font-medium">- ₹{discount.toLocaleString("en-IN")}</span>
          </div>
        )}

        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping & Taxes</span>
          <span className="text-xs uppercase font-bold text-green-600">Free</span>
        </div>

        <Separator className="bg-gray-200/60" />

        <div className="flex justify-between items-end pt-2">
          <span className="text-base font-bold text-gray-900">Total Amount</span>
          <div className="text-right">
            <span className="block text-2xl font-bold text-[#351043]">
              ₹{total.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Inclusive of all taxes</span>
          </div>
        </div>
      </div>

      <Button
        onClick={onContinue}
        className="mt-8 w-full rounded-lg bg-[#351043] py-7 text-lg font-bold text-white shadow-xl shadow-purple-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        Proceed to Checkout
      </Button>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium bg-white/50 p-2 rounded-md border border-gray-100">
            <span className="h-1.5 w-1.5 rounded-full bg-[#351043]" />
            LIFETIME EXCHANGE & BUY-BACK
        </div>
        <p className="text-[10px] text-center text-gray-400">
          By continuing, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}