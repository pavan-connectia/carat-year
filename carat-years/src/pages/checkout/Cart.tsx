import OrderSummaryBox from "./OrderSummaryBox";
import { useCart, useUpdateCartItem, useRemoveFromCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import Img from "@/components/ui/Img";
import { LucideTrash2, Lock, Minus, Plus, ShoppingBag } from "lucide-react";
import Discount from "@/components/checkout/Discount";
import { useNavigate } from "react-router";
import useUserStore from "@/store/userStore";

export default function Cart({ onNext }: { onNext: () => void }) {
  const { token } = useUserStore();
  const navigate = useNavigate();
  const { data: cartData, refetch } = useCart();
  const { mutate: updateItem } = useUpdateCartItem();
  const { mutate: removeItem } = useRemoveFromCart();

  if (!cartData || !cartData.data || cartData.data.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-gray-200 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900">Your bag is empty</h2>
        <p className="text-gray-500 mt-2">Looks like you haven't added any jewelry yet.</p>
        <Button onClick={() => navigate("/")} className="mt-6 bg-[#351043]">Start Shopping</Button>
      </div>
    );
  }

  const cart = cartData.data;

  const handleQtyChange = (item: any, newQty: number) => {
    if (newQty < 1) return;
    if (!token) {
      const localCartRaw = localStorage.getItem("localCart");
      if (localCartRaw) {
        const localCart = JSON.parse(localCartRaw);
        const itemIndex = localCart.findIndex((i: any) =>
          i.product === item.productId && i.metal === item.metal &&
          i.shape === item.shape && i.carat === item.carat && i.size === item.size
        );
        if (itemIndex > -1) {
          localCart[itemIndex].quantity = newQty;
          localStorage.setItem("localCart", JSON.stringify(localCart));
          refetch();
        }
      }
    } else {
      updateItem({ item, quantity: newQty }, { onSuccess: () => refetch() });
    }
  };

  const handleRemove = (item: any) => {
    if (!token) {
      const localCartRaw = localStorage.getItem("localCart");
      if (localCartRaw) {
        const localCart = JSON.parse(localCartRaw);
        const filteredCart = localCart.filter((i: any) =>
          !(i.product === item.productId && i.metal === item.metal &&
            i.shape === item.shape && i.carat === item.carat && i.size === item.size)
        );
        localStorage.setItem("localCart", JSON.stringify(filteredCart));
        refetch();
      }
    } else {
      removeItem(item, { onSuccess: () => refetch() });
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Cart Items */}
        <div className="flex-1">
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-8 flex items-center gap-3">
            Your Shopping Bag <span className="text-sm font-sans font-normal text-gray-500">({cartItems.length} items)</span>
          </h1>

          <div className="space-y-8">
            {cartItems?.map((item: any, idx: number) => (
              <div key={idx} className="group flex flex-col sm:flex-row items-start gap-6 pb-8 border-b border-gray-100 last:border-0">
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                  <Img dynamic src={item.img} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 uppercase tracking-wider">
                        <span>{item.metal}</span>
                        <span>{item.color}</span>
                        <span>{item.shape}</span>
                        <span>{item.carat} Carat</span>
                        {item.size && <span>Size: {item.size}</span>}
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">₹{item.total.toLocaleString("en-IN")}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-full px-2 py-1">
                      <button onClick={() => handleQtyChange(item, item.qty - 1)} className="p-1 hover:text-[#351043] transition-colors">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center font-medium">{item.qty}</span>
                      <button onClick={() => handleQtyChange(item, item.qty + 1)} className="p-1 hover:text-[#351043] transition-colors">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item)}
                      className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <LucideTrash2 className="h-4 w-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Summary/Discount */}
        <div className="w-full lg:w-[400px]">
          <div className="sticky top-24 space-y-6">
            {token ? (
              <>
                <Discount apppliedDiscount={cartData?.data?.discountInfo?.code} />
                <OrderSummaryBox
                  items={cartItems?.length}
                  price={cart.subtotal}
                  discount={cart.totalDiscount}
                  total={cart.finalTotal}
                  onContinue={onNext}
                />
              </>
            ) : (
              <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
                  <Lock className="h-7 w-7 text-[#351043]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Secure Checkout</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  Join our exclusive circle to apply personalized coupons and secure your order.
                </p>
                <Button
                  onClick={() => navigate("/login")}
                  className="mt-8 w-full bg-[#351043] py-6 text-base font-semibold hover:bg-[#351043]/90 rounded-lg shadow-lg shadow-purple-900/10"
                >
                  Sign In to Checkout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}