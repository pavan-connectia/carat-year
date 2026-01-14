import { cn } from "@/lib/utils";
import { type ImgHTMLAttributes } from "react";

type ImgProps = {
  className?: string;
  src?: string; // Make src optional
  dynamic?: boolean;
} & ImgHTMLAttributes<HTMLImageElement>;

export default function Img({
  className,
  src,
  dynamic = false,
  loading = "lazy",
  ...props
}: ImgProps) {


  const getSrc = () => {
  if (!src) return "";

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  if (!baseUrl) {
    console.error("VITE_API_BASE_URL is missing");
    return src; // fallback
  }

  return `${baseUrl}${src}`;
};




  const finalSrc = getSrc();

  return (
    <img
      className={cn("object-cover", className)}
      alt={props.alt || ""}
      loading={loading}
      src={finalSrc}
      {...props}
    />
  );
}