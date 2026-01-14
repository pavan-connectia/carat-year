import { Link } from "react-router";
import SearchIcon from "@/assets/icons/search.svg";
// import StoreIcon from "@/assets/icons/store.svg";
import UserIcon from "@/assets/icons/user.svg";
import BagIcon from "@/assets/icons/bag.svg";
import useUserStore from "@/store/userStore";
import { ChevronDown, House, Menu, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import SearchDialog from "@/components/shared/SearchDialog";
import { useCart } from "@/hooks/useCart";
import MegaMenu from "./MegaMenu";
import { NAV_LINKS } from "@/lib/constants";


// const links = [
//   { name: "Rings", href: "/product?q=rings" },
//   { name: "Earrings", href: "/product?q=earrings" },
//   {
//     name: "Pendants & Necklaces",
//     href: "/product?q=pendants-necklaces",
//   },
//   {
//     name: "Bangales & Bracelets",
//     href: "/product?q=bangles-bracelets",
//   },
//   { name: "Gifts", href: "/product?q=gifts" },
//   { name: "New Arrivals", href: "/product?q=new-arrivals" },
// ];

export default function Header() {
  const { token, name } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const { data } = useCart();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const totalCartItems = data?.data?.items?.length;

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMegaMenu(name);
    setSelectedColumn(null); // Reset column selection when hovering main menu
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
      setSelectedColumn(null);
    }, 200);
  };

  const handleColumnClick = (columnId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColumn(selectedColumn === columnId ? null : columnId);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Splitting links for the desktop "centered logo" look
  const leftLinks = NAV_LINKS.slice(0, 3);
  const rightLinks = NAV_LINKS.slice(3, 8);

  // Get active mega menu data
  const getActiveMegaMenuData = () => {
    if (!activeMegaMenu) return null;
    const link = NAV_LINKS.find(link => link.name === activeMegaMenu);
    return link?.hasMegaMenu ? link.megaMenuData : null;
  };

  const activeMegaMenuData = getActiveMegaMenuData();

  // Get filtered columns based on selection
  const getFilteredColumns = () => {
    if (!activeMegaMenuData || !selectedColumn) {
      return activeMegaMenuData?.columns || [];
    }

    // If a column is selected, only show that column
    return activeMegaMenuData.columns.filter(column => column.id === selectedColumn);
  };

  // Get active link for base category
  const getActiveLink = () => {
    if (!activeMegaMenu) return null;
    return NAV_LINKS.find(link => link.name === activeMegaMenu);
  };

  const activeLink = getActiveLink();

  return (
    <>
      <div className="font-playfair bg-[#E6E7DF] py-2 text-center text-[10px] sm:text-xs lg:hidden">
        Celebrate Your Story in Carats
      </div>
      <div className="font-playfair hidden bg-[#E6E7DF] py-2 text-center text-sm lg:block">
        Celebrate Your Story in Carats
      </div>

      <header className="bg-gradient text-white lg:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <button
              className="flex items-center gap-4"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>

            <Link to="/">
              <div className="flex items-center">
                <img
                  src="/logo.png"
                  loading="eager"
                  className="mx-auto h-16 w-auto"
                />
              </div>
            </Link>

            <div className="flex items-center gap-5">
              <Link to={token ? "/account" : "/signup"}>
                <img src={UserIcon} alt="search" className="size-5" />
              </Link>

              <Link to="/checkout" className="relative">
                <img src={BagIcon} alt="store" className="size-5" />

                {totalCartItems > 0 && (
                  <span className="absolute -top-3 -right-2 size-4 rounded-full bg-white text-center text-sm font-semibold text-black">
                    {totalCartItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed top-32 z-50 h-full w-full transform bg-white transition-transform duration-1000 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <nav className="mt-10 grid justify-center gap-5 text-2xl">
          {NAV_LINKS.map((i) => (
            <Link
              to={i.href}
              className="px-5 hover:text-[#533D0E]"
              key={i.name}
            >
              {i.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* desktop */}
      <div className="relative">
        <header className="bg-gradient font-montserrat hidden text-white lg:block">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className="mr-5 flex-1 space-y-3 divide-y">
                <div className="flex items-center gap-5 pb-3">
                  <button onClick={() => setIsSearchOpen(true)}>
                    <img src={SearchIcon} alt="search" className="size-5" />
                  </button>

                  <Link to="/">
                   <House />
                    
                  </Link>
                </div>
                <div className="flex justify-center gap-10 md:ml-2">
                  {leftLinks.map((link) => (
                    <div
                      key={link.name}
                      className="relative group pb-2"
                      onMouseEnter={() => link.hasMegaMenu && handleMouseEnter(link.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        to={link.href}
                        className={`text-[11px] font-bold tracking-[0.15em] uppercase flex items-center gap-1 transition-colors ${activeMegaMenu === link.name ? 'text-[#B4975A]' : 'text-[#F8F2E7CC] hover:text-white'}`}
                      >
                        {link.name}
                        {link.hasMegaMenu && <ChevronDown className="size-3 opacity-50" />}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/">
                <div className="flex items-center">
                  <img
                    src="/logo.png"
                    loading="eager"
                    className="mx-auto h-20 w-auto"
                  />
                </div>
              </Link>

              <div className="flex-1 space-y-3 divide-y divide-[#F8F2E7CC]">
                <div className="ml-5 flex-1 space-y-3 divide-y">
                  <div className="flex items-center justify-end gap-5 pb-3">
                    <Link
                      to={token ? "/account" : "/signup"}
                      className="flex items-center gap-2 capitalize"
                    >
                      {token && `Hi, ${name} `}{" "}
                      <img src={UserIcon} alt="search" className="size-5" />
                    </Link>

                    <Link to={token ? "/checkout" : "/signup"} className="relative">
                      <img src={BagIcon} alt="store" className="size-5" />

                      {token && totalCartItems > 0 && (
                        <span className="absolute -top-3 -right-2 size-4 rounded-full bg-white text-center text-sm font-semibold text-black">
                          {totalCartItems}
                        </span>
                      )}
                    </Link>

                  </div>
                </div>

                <div className="flex justify-center gap-10 md:ml-6">
                  {rightLinks.map((link) => (
                    <div
                      key={link.name}
                      className="relative group pb-2"
                      onMouseEnter={() => link.hasMegaMenu && handleMouseEnter(link.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        to={link.href}
                        className={`text-[11px] font-bold tracking-[0.15em] uppercase flex items-center gap-1 transition-colors ${activeMegaMenu === link.name ? 'text-[#B4975A]' : 'text-[#F8F2E7CC] hover:text-white'}`}
                      >
                        {link.name}
                        {link.hasMegaMenu && <ChevronDown className="size-3 opacity-50" />}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mega Menu - Positioned absolutely under the header */}
        {activeMegaMenuData && activeMegaMenu && (
          <div
            className="absolute left-0 top-full w-full z-9999"
            onMouseEnter={() => handleMouseEnter(activeMegaMenu)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Column Selection Bar */}
            <div className="bg-gray-50 border-b border-gray-100">
              <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Filter by:</span>
                    <div className="flex flex-wrap gap-2">
                      {activeMegaMenuData.columns.map((column) => (
                        <button
                          key={column.id}
                          onClick={(e) => column.id && handleColumnClick(column.id, e)}
                          className={`px-4 py-2 text-xs font-medium rounded-full border transition-colors ${selectedColumn === column.id
                              ? 'bg-[#B4975A] text-white border-[#B4975A]'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                          {column.title}
                          {selectedColumn === column.id && (
                            <X className="ml-2 inline size-3" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  {selectedColumn && (
                    <button
                      onClick={() => setSelectedColumn(null)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Show all filters
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Mega Menu Content */}
            <MegaMenu
              layoutType={activeMegaMenuData.layoutType}
              columns={getFilteredColumns()}
              promos={activeMegaMenuData.promos}
              isVisible={true}
              onMouseEnter={() => handleMouseEnter(activeMegaMenu)}
              onMouseLeave={handleMouseLeave}
              baseCategory={activeLink?.id || ''}
            />
          </div>
        )}
      </div>

      <SearchDialog
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}