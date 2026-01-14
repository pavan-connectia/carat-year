import type { ReactNode, ElementType } from "react";

type HeadingProps = {
  children: ReactNode;
  Tag?: ElementType;
};

export default function Heading({ children, Tag = "h1" }: HeadingProps) {
  const Component = Tag;

  return (
    <Component className="flex items-center justify-center text-xl sm:text-2xl md:text-3xl">
      <span className="h-[5px] grow bg-linear-to-r from-transparent to-[#FFE2A6]"></span>
      <span className="font-montserrat mx-4 font-medium">{children}</span>
      <span className="h-[5px] grow bg-linear-to-l from-transparent to-[#FFE2A6]"></span>
    </Component>
  );
}
