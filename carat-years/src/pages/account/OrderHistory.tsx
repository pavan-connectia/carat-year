import Img from "@/components/ui/Img";
import { useMyOrders } from "@/hooks/useOrder";
import dayjs from "dayjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function OrderHistory() {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<any[]>([]);
  const { data, isLoading, isFetching } = useMyOrders(page);

  const newOrders = data?.data ?? [];
  const pagination = data?.pagination;

  // Merge orders as user loads more pages
  if (page === 1 && orders.length === 0 && newOrders.length) {
    setOrders(newOrders);
  } else if (newOrders.length && orders.length < (pagination?.total ?? 0)) {
    if (!orders.some((o) => o._id === newOrders[0]._id)) {
      setOrders((prev) => [...prev, ...newOrders]);
    }
  }

  if (isLoading && page === 1) {
    return (
      <div className="p-6 text-center text-gray-500">Loading orders...</div>
    );
  }

  if (!orders.length) {
    return (
      <div className="p-6 text-center text-gray-500">No orders found.</div>
    );
  }

  return (
    <div className="font-poppins space-y-10 p-4 text-[15px] sm:p-6 md:p-10">
      <h1 className="mb-4 text-2xl font-semibold">My Orders</h1>

      {orders.map((order: any, idx: number) => (
        <div
          key={order._id || idx}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          {/* --- Order Summary --- */}
          <div className="grid gap-4 text-sm sm:grid-cols-2 md:grid-cols-4">
            <div>
              <p className="font-semibold">Order Date</p>
              <p>{dayjs(order.createdAt).format("MMM D, YYYY")}</p>
            </div>
            <div>
              <p className="font-semibold">Order ID</p>
              <p className="uppercase">{order._id.slice(-6)}</p>
            </div>
            <div>
              <p className="font-semibold">Payment</p>
              <p className="capitalize">{order.paymentMethod}</p>
            </div>
            <div>
              <p className="font-semibold">Status</p>
              <span
                className={`capitalize ${
                  order.orderStatus === "delivered"
                    ? "text-green-600"
                    : order.orderStatus === "cancelled"
                      ? "text-red-600"
                      : "text-blue-600"
                }`}
              >
                {order.orderStatus}
              </span>
            </div>
          </div>

          <div className="mt-2 grid gap-4 text-sm sm:grid-cols-2 md:grid-cols-4">
            <div>
              <p className="font-semibold">Subtotal</p>
              <p>₹{order.subtotal.toLocaleString("en-IN")}</p>
            </div>
            <div>
              <p className="font-semibold">Discount</p>
              <p>₹{order.totalDiscount.toLocaleString("en-IN")}</p>
            </div>
            <div>
              <p className="font-semibold">Final Total</p>
              <p className="font-semibold text-green-700">
                ₹{order.finalTotal.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p className="font-semibold">Payment Status</p>
              <span
                className={`capitalize ${
                  order.paymentStatus === "paid"
                    ? "text-green-600"
                    : order.paymentStatus === "failed"
                      ? "text-red-600"
                      : "text-yellow-600"
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>
          </div>

          {/* --- Discount Info (if any) --- */}
          {order.discountInfo && (
            <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm">
              <p className="font-semibold">Discount:</p>
              <p>
                Code:{" "}
                <span className="font-medium">{order.discountInfo.code}</span> |
                Lab: {order.discountInfo.labDiscount}% | Diamond:{" "}
                {order.discountInfo.diamondDiscount}%
              </p>
            </div>
          )}

          <div className="my-3 border-t border-gray-200" />

          {/* --- Shipping Info --- */}
          <div className="text-sm">
            <p>
              <strong>Shipping To:</strong> {order.address.name} (
              {order.address.phone})
            </p>
            <p>
              {order.address.addressLine1}
              {order.address.addressLine2 && `, ${order.address.addressLine2}`}
              {order.address.landmark &&
                `, Landmark: ${order.address.landmark}`}
              , {order.address.city}, {order.address.state} -{" "}
              {order.address.pincode}
            </p>
          </div>

          <div className="my-3 border-t border-gray-200" />

          {/* --- Ordered Items --- */}
          <div className="mt-4 space-y-6">
            {order.items.map((item: any, itemIdx: number) => (
              <div
                key={itemIdx}
                className="flex flex-col items-center gap-5 sm:flex-row sm:items-start"
              >
                <Img
                  dynamic
                  src={item.image || "/placeholder.jpg"}
                  alt={item.title || "Product"}
                  width={120}
                  height={120}
                  className="rounded-md border object-cover"
                />
                <div className="w-full">
                  <h3 className="text-base font-semibold">
                    {item.title} ({item.designType} {item.style})
                  </h3>
                  <p className="text-sm">
                    Metal: {item.metal} | Color: {item.color} | Stone:{" "}
                    {item.stone}
                  </p>
                  <p className="text-sm">
                    Shape: {item.shape} | Carat: {item.carat} | Size:{" "}
                    {item.size}
                  </p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                  <p className="mt-1 font-medium">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* --- Load More Button --- */}
      {pagination && page < pagination.totalPages && (
        <div className="flex justify-center pt-6">
          <Button
            disabled={isFetching}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-md bg-black px-6 py-2 text-white hover:bg-gray-800"
          >
            {isFetching ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
