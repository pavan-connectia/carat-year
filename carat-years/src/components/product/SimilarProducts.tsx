import ProductCard from "./ProductCard";
import Heading from "../ui/Heading";
import { useProductsByTag } from "@/hooks/useProducts";

export default function SimilarProducts({ tags, currentId }: { tags: string[], currentId: string }) {
  const firstTag = tags[0] || ""; // use the first tag for now

  const { data } = useProductsByTag(firstTag);

  return (
    <div className="mx-auto max-w-7xl">
      <Heading>You May Also Like</Heading>

      <div className="flex flex-wrap items-center px-5 sm:px-8 md:px-10">
        {data?.data
          ?.filter((p: any) => p?._id !== currentId)
          ?.slice(0, 3)
          ?.map((p: any) => (
            <ProductCard product={p} key={p?._id} />
          ))}
      </div>
    </div>
  );
}
