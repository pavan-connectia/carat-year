import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Link } from "react-router";
import { useSearchProducts } from "@/hooks/useProducts";

const links = [
  {
    heading: "Discover",
    items: [
      { title: "FAQs", href: "/faqs" },
      { title: "Blogs", href: "/blogs" },
      { title: "Diamond Guide", href: "/diamond-education" },
      { title: "Lab Grown Diamonds", href: "/lab-grown-diamond-guide" },
    ],
  },
  {
    heading: "Questions?",
    items: [
      { title: "Contact us", href: "/contact-us" },
    ],
  },
];

const suggestions = [
  { href: "/product?q=engagement-rings", title: "Engagement Rings" },
  { href: "/product?q=wedding-rings", title: "Wedding Rings" },
  { href: "/product?q=diamond-earrings", title: "Diamond Earrings" },
  { href: "/product?q=gemstone", title: "Gemstone" },
];

export default function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce effect — waits 500 ms after typing stops
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data, isFetching } = useSearchProducts(debouncedQuery);
  const searchResults = data?.data || [];

  const hasResults = debouncedQuery.length > 0 && searchResults.length > 0;

  const handleSearch = () => {
    setDebouncedQuery(searchQuery.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="h-fit overflow-y-auto sm:max-w-3xl">
        {/* Search Bar */}
        <div className="mt-5 mb-12 flex gap-3">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search your next jewellery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border-input text-foreground placeholder:text-muted-foreground h-11 bg-white py-2 pl-10"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-medium"
          >
            Search
          </Button>
        </div>

        {/* Search Results or Fallback */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left Column — Search Results or Trending */}
          <div>
            <h3 className="text-foreground mb-4 text-sm font-semibold">
              {hasResults
                ? "Search Results"
                : isFetching
                  ? "Searching..."
                  : "Trending Searches"}
            </h3>

            <ul className="space-y-3">
              {isFetching ? (
                <p className="text-muted-foreground text-sm">Loading...</p>
              ) : hasResults ? (
                searchResults.map((p: any) => (
                  <li key={p._id}>
                    <Link
                      to={`/product/${p.category.slug}/${p.slug}`}
                      className="text-muted-foreground hover:text-foreground text-left text-sm transition-colors"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  {suggestions.map((s) => (
                    <li>
                      <Link
                        to={s.href}
                        key={s.title}
                        className="text-muted-foreground hover:text-foreground text-left text-sm transition-colors"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          {/* Right Columns — Static Links */}
          {links.map((l) => (
            <div key={l.heading}>
              <h3 className="text-foreground mb-4 text-sm font-semibold">
                {l.heading}
              </h3>
              <ul className="space-y-3">
                {l.items.map((i) => (
                  <li key={i.title}>
                    <Link
                      to={i.href}
                      className="text-muted-foreground hover:text-foreground text-left text-sm transition-colors"
                    >
                      {i.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
