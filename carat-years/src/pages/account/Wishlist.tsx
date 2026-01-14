import { Button } from "@/components/ui/button";
import Img from "@/components/ui/Img";
import { useWishlists, useRemoveFromWishlist } from "@/hooks/useWishlist";
import type { TWishlist } from "@/types/api";
import { Link, useNavigate } from "react-router";

export default function Wishlist() {
  const navigate = useNavigate();
  const { data } = useWishlists();
  const { mutate: deleteWishlist } = useRemoveFromWishlist();

  const wishlist = data?.data || [];

  if (wishlist?.length === 0)
    return (
      <div className="font-playfair mt-16 space-y-6 p-6 text-lg font-medium sm:text-xl md:text-2xl">
        <p>
          Use the wishlist to save items that you like on the go so you can view
          it later. You can also create an account with us so you can save your
          wishlist to view across multiple devices.
        </p>
        <p>Your Wishlist is empty.</p>
        <Button
          type="button"
          className="mx-auto w-full max-w-xs rounded-3xl bg-[#351043] px-4 py-3 font-medium text-white transition-colors hover:bg-purple-950 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 focus:outline-none"
          asChild
        >
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <div className="w-full">
        {wishlist.map((w: TWishlist) => (
          <div
            key={w.slug}
            className="group relative rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-lg"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="relative h-64 w-full">
                <Img
                  dynamic
                  src={w.image}
                  alt={w.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="flex w-full flex-1 flex-col justify-between p-4">
                <div>
                  <h2 className="mb-1 text-lg font-semibold text-black">
                    {w.title}
                  </h2>
                  {[
                    {
                      label: "Category",
                      value:
                        typeof w.category === "string"
                          ? w.category
                          : w.category.slug,
                    },
                    {
                      label: "Metal",
                      value: w.metal ? `${w.metal} ${w.color}` : null,
                    },
                    { label: "Design Type", value: w.designType },
                    { label: "Stone", value: w.stone },
                    { label: "Shape", value: w.shape },
                    {
                      label: "Carat",
                      value: w.carat ? `(${w.carat} ct)` : null,
                    },
                    { label: "Size", value: w.size ? `Size ${w.size}` : null },
                  ].map((i, idx) =>
                    i.value ? (
                      <p key={idx} className="text-sm">
                        {i.label}:{" "}
                        <span className="font-semibold capitalize">
                          {i.value as string}
                        </span>
                      </p>
                    ) : null,
                  )}
                </div>

                {/* Actions */}
              </div>
            </div>
            <div className="grid w-full grid-cols-2 space-x-5 sm:px-5">
              <Button
                onClick={() => {
                  const categorySlug =
                    typeof w.category === "string"
                      ? w.category
                      : w.category.slug;
                  navigate(`/product/${categorySlug}/${w.slug}`);
                }}
                className="bg-[#351043] hover:bg-[#351043]/90"
              >
                View Item
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#351043] hover:bg-[#351043] hover:text-white"
                onClick={() => deleteWishlist(w._id ?? "")}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
