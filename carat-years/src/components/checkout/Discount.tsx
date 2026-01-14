import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag, Gift, Check, X, Percent } from "lucide-react";
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
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex shrink-0 items-center gap-2">
            <Tag className="h-5 w-5" />
            Coupon Code
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAllCoupons(!showAllCoupons)}
            className="text-primary"
          >
            <Gift className="mr-1 h-4 w-4" />
            view available coupons
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showAllCoupons && (
          <div className="space-y-3 py-5">
            <div className="flex items-center text-sm">
              <Percent className="mr-2 h-4 w-4" />
              {"available_coupons"}
            </div>

            <div className="space-y-3">
              {data?.data?.map((d: TDiscount) => (
                <div
                  key={d.code}
                  className="cursor-pointer rounded-md border p-3 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="default">{d.code}</Badge>
                      </div>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {d.description}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setCouponInput(d.code);
                      }}
                    >
                      {"apply"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!apppliedDiscount ? (
          <div className="flex gap-2">
            <Input
              placeholder="Enter coupon code"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
            />
            <Button
              onClick={() => applyDiscount(couponInput)}
              disabled={!couponInput.trim() || isPending}
            >
              {isPending ? "Applying..." : "Apply"}
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-green-700 dark:text-green-300">
                Coupon {apppliedDiscount} applied
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeDiscount()}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
