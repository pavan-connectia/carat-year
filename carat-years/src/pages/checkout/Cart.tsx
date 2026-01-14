import OrderSummaryBox from "./OrderSummaryBox";
import { useCart, useUpdateCartItem, useRemoveFromCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import Img from "@/components/ui/Img";
import { LucideTrash2 } from "lucide-react";
import Discount from "@/components/checkout/Discount";

export default function Cart({ onNext }: { onNext: () => void }) {
  const { data: cartData, refetch } = useCart();
  const { mutate: updateItem } = useUpdateCartItem();
  const { mutate: removeItem } = useRemoveFromCart();

  if (!cartData || !cartData.data) return <p>Loading cart...</p>;

  const cart = cartData.data;

  const handleQtyChange = (item: any, newQty: number) => {
    if (newQty < 1) return;
    updateItem({ item, quantity: newQty }, { onSuccess: () => refetch() });
  };

  const handleRemove = (item: any) => {
    removeItem(item, { onSuccess: () => refetch() });
  };

  console.log(cart)

  const cartItems = cart?.items?.map((item: any) => ({
    productId: item.product._id,
    img: item.product.image,
    title: item.product.title,
    slug: item.product.slug,
    price: Math.round(item.priceDetails.finalAmt) / item.quantity,
    qty: item.quantity,
    total: Math.round(item.priceDetails.finalAmt),
    metal: item.metal,
    color: item.color,
    shape: item.shape,
    carat: item.carat,
    size: item.size,
  }));

  const totalPrice = Math.round(cart.subtotal);
  const discount = cart.totalDiscount;
  const total = cart.finalTotal;

  return (
    <>
      <div className="flex flex-col-reverse gap-6 border lg:flex-row lg:items-start lg:justify-center lg:gap-10">
        <div className="flex overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-4">
            <thead>
              <tr>
                <th className="min-w-[200px] p-4 text-left">Product</th>
                <th className="min-w-[100px] p-4 text-left">Price</th>
                <th className="min-w-[100px] p-4 text-left">Quantity</th>
                <th className="min-w-[100px] p-4 text-left">Total</th>
                <th className="min-w-[100px] p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item: any, idx: number) => (
                <tr key={idx} className="border-b border-gray-300">
                  <td className="flex items-center gap-2 p-4">
                    <Img
                      dynamic
                      src={item.img}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                    <span>{item.title}</span>
                  </td>
                  <td className="p-4">
                    ₹ {item.price.toLocaleString("en-IN")}
                  </td>
                  <td className="min-w-40 space-x-3 p-4">
                    <Button
                      className="bg-[#351043] hover:bg-[#351043]/90"
                      onClick={() => handleQtyChange(item, item.qty - 1)}
                    >
                      -
                    </Button>
                    <span>{item.qty}</span>
                    <Button
                      className="bg-[#351043] hover:bg-[#351043]/90"
                      onClick={() => handleQtyChange(item, item.qty + 1)}
                    >
                      +
                    </Button>
                  </td>
                  <td className="p-4">
                    ₹ {item.total.toLocaleString("en-IN")}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleRemove(item)}
                      className="rounded-full px-3 py-1"
                    >
                      <LucideTrash2 className="text-destructive" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-5">
          <Discount apppliedDiscount={cartData?.data?.discountInfo?.code} />
          <OrderSummaryBox
            items={cartItems?.length}
            price={totalPrice}
            discount={discount}
            total={total}
            onContinue={onNext}
          />
        </div>
      </div>
    </>
  );
}
