import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Link } from "react-router";

const pages = [
  { label: "Rings", href: "/product?q=rings" },
  { label: "Earrings", href: "/product?q=earrings" },
  { label: "Pendants & Necklaces", href: "/product?q=pendants-necklaces" },
  { label: "Pendants", href: "/product?q=pendant" },
  { label: "Necklaces", href: "/product?q=necklaces" },
  { label: "Bangles & Bracelets", href: "/product?q=bangles-bracelets" },
  { label: "Wedding Rings", href: "/product?q=rings&occsasion=wedding" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "FAQs", href: "/faqs" },
  { label: "Delivery", href: "/delivery" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Return/Exchange Policy", href: "/refund-policy" },
  { label: "Jewellery Finance", href: "/finance" },
  { label: "Lifetime Manufacturing Guarantee", href: "/lifetime" },
  { label: "Jewellery Insurance", href: "/insurance" },
  { label: "Jewellery Valuations", href: "/valuations" },
  { label: "Jewellery Care Plan", href: "/care-plan" },
  { label: "Gift Cards", href: "/gift" },
  { label: "Blog", href: "/blog" },
  { label: "Engagement Ring Buying Guide", href: "/engagement-guide" },
  { label: "Wedding Ring Buying Guide", href: "/wedding" },
  { label: "Diamond Guide", href: "/diamond-education" },
  { label: "Metal Guide", href: "/metal-guide" },
  { label: "Natural Diamond Guide", href: "/natural-diamond-guide" },
  { label: "Lab Grown Diamonds Guide", href: "/lab-grown-diamond-guide" },
  { label: "Gemstone Guide", href: "/gemstone-guide" },
  { label: "Ring Size Guide", href: "/ring-size-guide" },
  { label: "Digital Ring Sizer", href: "/digital-ring-sizer" },
  { label: "Diamond Cuts Guide", href: "/diamond-cut-guide" },
  { label: "Jewellery Care Guide", href: "/jewellery-care-guide" },
  { label: "Bespoke Jewellery", href: "/bespoke" },
  { label: "Engagement Ring Calculator", href: "/engagement-ring-calculator" },
  { label: "Hallmarking", href: "/hallmarking" },
];

const links = [
  {
    heading: "Discover",
    items: [
      { title: "FAQs", href: "/faqs" },
      { title: "Blogs", href: "/blog" },
      { title: "Diamond Guide", href: "/diamond-education" },
      { title: "Lab Grown Diamonds", href: "/lab-grown-diamond-guide" },
    ],
  },
  {
    heading: "Questions?",
    items: [{ title: "Contact us", href: "/contact-us" }],
  },
];

const suggestions = [
  { href: "/product?q=engagement-rings", title: "Engagement Rings" },
  { href: "/product?q=wedding-rings", title: "Wedding Rings" },
  { href: "/product?q=diamond-earrings", title: "Diamond Earrings" },
];

export default function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic: This runs whenever the searchQuery changes
  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return pages.filter((p) => p.label.toLowerCase().includes(query));
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
        {/* Search Bar */}
        <div className="mt-5 mb-12 flex gap-3">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search pages (e.g. Wedding Ring...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-input text-foreground placeholder:text-muted-foreground h-11 bg-white py-2 pl-10"
              autoFocus
            />
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-medium"
            onClick={() => { }} // Local search is reactive, button not strictly needed but kept for UI
          >
            Search
          </Button>
        </div>

        {/* Search Results or Fallback */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left Column — Search Results or Trending */}
          <div className="md:col-span-1">
            <h3 className="text-foreground mb-4 text-lg font-bold">
              {isSearching ? `Search Results (${filteredResults.length})` : "Trending Searches"}
            </h3>

            <ul className="space-y-3">
              {isSearching ? (
                filteredResults.length > 0 ? (
                  filteredResults.map((p) => (
                    <li key={p.href}>
                      <Link
                        to={p.href}
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground text-left text-sm transition-colors block"
                      >
                        {p.label}
                      </Link>
                    </li>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm italic">No pages found matching "{searchQuery}"</p>
                )
              ) : (
                <>
                  {suggestions.map((s) => (
                    <li key={s.title}>
                      <Link
                        to={s.href}
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground text-left text-sm transition-colors block"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          {/* Right Columns — Static Links (Always Visible or adjust as needed) */}
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
                      onClick={onClose}
                      className="text-muted-foreground hover:text-foreground text-left text-sm transition-colors block"
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