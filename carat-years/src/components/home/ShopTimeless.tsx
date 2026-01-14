import { Link } from "react-router";
import { Button } from "../ui/button";
import Heading from "../ui/Heading";
import ProductCard from "../product/ProductCard";
import { useProducts } from "@/hooks/useProducts";

export default function ShopTimeless() {
  const { data } = useProducts(3);

  return (
    <div className="min-h-screen overflow-x-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <Heading Tag="h2">Shop Timeless Gifts</Heading>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 px-5 sm:px-8 md:px-10">
          {data?.data?.map((p: any) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
        <div className="mt-5 text-center">
          <Link to="/product">
            <Button
              variant="outline"
              className="font-inter rounded-full border border-purple-900 bg-purple-900 px-8 py-3 font-medium text-white transition hover:bg-transparent hover:text-purple-900"
            >
              Browse All Gifts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
