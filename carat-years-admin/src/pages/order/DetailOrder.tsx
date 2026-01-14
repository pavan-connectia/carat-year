import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
} from "@/components/ui/form";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useOrder, useUpdateOrder } from "@/hooks/useOrder";
import { TOrder } from "@/types/api";
import InputLabel from "@/components/shared/InputLabel";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const orderSchema = z.object({
  paymentStatus: z.enum(["pending", "paid", "failed"]),
  orderStatus: z.enum(["processing", "shipped", "delivered", "cancelled"]),
});

type OrderFormValues = z.infer<typeof orderSchema>;

export default function DetailOrder() {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      paymentStatus: "pending",
      orderStatus: "processing",
    },
  });

  const { id } = useParams();
  const { data } = useOrder(id ?? "");
  const { mutate } = useUpdateOrder();

  useEffect(() => {
    if (data?.data) {
      form.reset({
        paymentStatus: data.data.paymentStatus,
        orderStatus: data.data.orderStatus,
      });
    }
  }, [data]);

  const onSubmit = (values: OrderFormValues) => {
    mutate({ id: data?.data?._id!, formData: values });
  };

  if (!data?.data) return <p>Loading order...</p>;

  const order: TOrder = data.data;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* --- ORDER SUMMARY --- */}
        <Card className="grid gap-5 p-6 sm:grid-cols-2">
          <InputLabel value={order._id} label="Order Id" />
          <InputLabel
            value={
              typeof order.user === "object" ? (order.user.name ?? "") : ""
            }
            label="Customer Name"
          />
          <InputLabel
            value={
              typeof order.user === "object" ? (order.user.email ?? "") : ""
            }
            label="Customer Email"
          />
          <InputLabel
            value={
              typeof order.user === "object" ? (order.user.mobile ?? "") : ""
            }
            label="Customer Mobile"
          />
          <InputLabel value={order.items.length} label="Items Count" />
          <InputLabel value={order.paymentMethod} label="Payment Method" />
          <InputLabel
            value={new Date(order.createdAt!).toLocaleString("en-IN")}
            label="Created At"
          />
          <InputLabel
            value={new Date(order.updatedAt!).toLocaleString("en-IN")}
            label="Last Updated"
          />

          <FormField
            control={form.control}
            name="paymentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Status</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent >
                      {["pending", "paid", "failed"].map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="orderStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Status</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select order status" />
                    </SelectTrigger>
                    <SelectContent>
                      {["processing", "shipped", "delivered", "cancelled"].map(
                        (status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </Card>

        {/* --- DISCOUNT INFO --- */}
        {order.discountInfo && (
          <Card className="space-y-2 p-6">
            <h2 className="text-lg font-bold">Discount Info</h2>
            <p>
              <strong>Code:</strong> {order.discountInfo.code}
            </p>
            <p>
              <strong>Lab Discount:</strong> {order.discountInfo.labDiscount}%
            </p>
            <p>
              <strong>Diamond Discount:</strong>{" "}
              {order.discountInfo.diamondDiscount}%
            </p>
          </Card>
        )}

        <Separator />

        {/* --- PRICE SUMMARY --- */}
        <Card className="grid gap-3 p-6 sm:grid-cols-2">
          <InputLabel
            value={order.subtotal.toLocaleString("en-IN")}
            label="Subtotal"
          />
          <InputLabel
            value={order.totalLabDiscount.toLocaleString("en-IN")}
            label="Total Lab Discount"
          />
          <InputLabel
            value={order.totalDiamondDiscount.toLocaleString("en-IN")}
            label="Total Diamond Discount"
          />
          <InputLabel
            value={order.totalDiscount.toLocaleString("en-IN")}
            label="Total Discount"
          />
          <InputLabel
            value={order.finalTotal.toLocaleString("en-IN")}
            label="Final Total"
          />
        </Card>

        <Separator />

        {/* --- SHIPPING ADDRESS --- */}
        <Card className="space-y-3 p-6">
          <h2 className="text-lg font-bold">Shipping Address</h2>
          <p>
            <strong>{order.address.name}</strong> ({order.address.phone})
          </p>
          <p>
            {order.address.addressLine1}
            {order.address.addressLine2 && `, ${order.address.addressLine2}`}
            {order.address.landmark && `, Landmark: ${order.address.landmark}`},{" "}
            {order.address.city}, {order.address.state} -{" "}
            {order.address.pincode}
          </p>
        </Card>

        {/* --- ORDERED ITEMS --- */}
        <Card className="space-y-4 p-6">
          <h2 className="text-lg font-bold">Ordered Items</h2>
          {order.items.map((item, idx) => (
            <div key={idx} className="rounded-md border p-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="font-semibold">
                  {item.title} ({item.slug})
                </p>
                <p>
                  <strong>Qty:</strong> {item.quantity} |{" "}
                  <strong>Price:</strong> ₹ {item.price.toLocaleString("en-IN")}
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                Metal: {item.metal}, Color: {item.color}, Shape: {item.shape},
                Carat: {item.carat}, Size: {item.size}
              </p>

              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <InputLabel
                  value={item.priceDetails.metalAmt.toLocaleString("en-IN")}
                  label="Metal Amount"
                />
                <InputLabel
                  value={item.priceDetails.labourAmt.toLocaleString("en-IN")}
                  label="Labour Amount"
                />
                <InputLabel
                  value={item.priceDetails.diamondAmtTotal.toLocaleString(
                    "en-IN",
                  )}
                  label="Diamond Amount"
                />
                <InputLabel
                  value={item.priceDetails.totalAmt.toLocaleString("en-IN")}
                  label="Total Amount"
                />
                <InputLabel
                  value={item.priceDetails.labDiscountAmt.toLocaleString(
                    "en-IN",
                  )}
                  label="Labour Discount"
                />
                <InputLabel
                  value={item.priceDetails.diamondDiscountAmt.toLocaleString(
                    "en-IN",
                  )}
                  label="Diamond Discount"
                />
                <InputLabel
                  value={item.priceDetails.finalAmt.toLocaleString("en-IN")}
                  label="Final Item Amount"
                />
              </div>
            </div>
          ))}
        </Card>

        <Button type="submit" className="w-full">
          Update Order
        </Button>
      </form>
    </Form>
  );
}
