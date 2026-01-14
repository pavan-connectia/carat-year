import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <ShoppingBag className="mb-4 h-16 w-16 text-gray-400" />
      <h2 className="mb-2 text-2xl font-semibold">Your cart is empty</h2>
      <p className="mb-6 text-gray-500">
        Looks like you haven’t added anything yet.
      </p>
      <Button
        className="bg-[#351043] hover:bg-[#351043]/90"
        onClick={() => navigate("/product")}
      >
        Continue Shopping
      </Button>
    </div>
  );
}
