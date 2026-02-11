import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tag, Check, X, Ticket } from "lucide-react";
import { useDiscounts } from "@/hooks/useDiscounts";
import { useState } from "react";
import type { TDiscount } from "@/types/api";
import { useApplyDiscount, useRemoveDiscount } from "@/hooks/useCart";

export default function Discount({
  apppliedDiscount,
}: {
  apppliedDiscount: string;
}) {
  const { data } = useDiscounts();
  const { mutate: applyDiscount, isPending } = useApplyDiscount();
  const { mutate: removeDiscount } = useRemoveDiscount();
  const [couponInput, setCouponInput] = useState("");
  const [showAllCoupons, setShowAllCoupons] = useState(false);

  return (
    <Card className="w-full shadow-sm border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Tag className="h-4 w-4 text-[#351043]" />
            Coupon Code
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAllCoupons(!showAllCoupons)}
            className="text-[#351043] hover:bg-[#351043]/5 h-8 text-xs font-medium"
          >
            {showAllCoupons ? "Hide" : "View All"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Coupon Input Area */}
        {!apppliedDiscount ? (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Enter code"
                className="uppercase placeholder:normal-case pr-10"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
              />
            </div>
            <Button
              onClick={() => applyDiscount(couponInput)}
              disabled={!couponInput.trim() || isPending}
              className="bg-[#351043] hover:bg-[#351043]/90 px-6"
            >
              {isPending ? "..." : "Apply"}
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-100 p-1">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-700">
                Code <span className="font-bold">{apppliedDiscount}</span> active
              </span>
            </div>
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                    removeDiscount();
                    setCouponInput("");
                }}
                className="h-7 w-7 p-0 hover:bg-green-100 text-green-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* SCROLLABLE COUPON LIST */}
        {showAllCoupons && data?.data && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Available Offers
            </div>
            {/* Scrollable Container with fixed height */}
            <div className="max-h-[220px] overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-gray-200">
              {data.data.map((d: TDiscount) => (
                <div
                  key={d.code}
                  className="group relative flex items-center justify-between rounded-md border border-dashed border-gray-300 bg-gray-50/50 p-3 transition-all hover:border-[#351043]/40 hover:bg-[#351043]/5"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Ticket className="h-3 w-3 text-[#351043]" />
                      <span className="text-sm font-bold text-[#351043]">{d.code}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-tight">
                      {d.description || "Save on your purchase with this code."}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="link"
                    className="text-xs font-bold text-[#351043] decoration-transparent hover:decoration-[#351043]"
                    onClick={() => {
                      setCouponInput(d.code);
                      if (!apppliedDiscount) applyDiscount(d.code);
                    }}
                  >
                    APPLY
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}