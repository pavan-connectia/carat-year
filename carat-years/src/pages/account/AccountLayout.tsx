import { Link, NavLink, Outlet, useLocation } from "react-router";
import CraftedByLook from "@/components/shared/CraftedByLook";
import Heading from "@/components/ui/Heading";

const accountSections = [
  { name: "My Account", path: "/account", heading: "My Account Information" },
  {
    name: "Change Password",
    path: "/account/change-password",
    heading: "Change Password",
  },
  {
    name: "Address Book",
    path: "/account/address-book",
    heading: "Address Book",
  },
  {
    name: "My Carat Points",
    path: "/account/caratpoints",
    heading: "My Carat Points",
  },
  { name: "Order History", path: "/account/orders", heading: "Order History" },
  { name: "Wishlist", path: "/account/wishlist", heading: "My Wishlist" },
  { name: "Newsletter", path: "/account/newsletter", heading: "Newsletter" },
  { name: "Logout", path: "/account/logout", heading: "Logout" },
  {
    name: "Delete Account",
    path: "/account/delete",
    heading: "Delete Account",
  },
];

export default function AccountLayout() {
  const { pathname } = useLocation();

  const currentSection =
    accountSections.find((section) => section.path === pathname) ??
    accountSections[0];

  return (
    <>
      <section className="px-5 py-10 sm:px-8">
        <div className="container mx-auto mt-10">
          <Heading>{currentSection.heading}</Heading>

          <nav className="font-inter mt-10 text-sm">
            <Link to="/" className="hover:text-[#957127]">
              Home
            </Link>{" "}
            &gt;{" "}
            <Link to="/account" className="hover:text-[#957127]">
              Account
            </Link>{" "}
            &gt; <span className="text-[#957127]">{currentSection.name}</span>
          </nav>

          <div className="my-10 flex flex-col gap-8 rounded-2xl border-2 border-[#FFE6B3] p-6 lg:flex-row">
            <aside className="top-10 h-fit w-full rounded-2xl border border-[#957127] bg-[#F8F2E7] p-6 lg:sticky lg:w-1/4">
              <ul className="space-y-3">
                {accountSections.map(({ name, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      end={path === "/account"}
                      className={({ isActive }) =>
                        [
                          "font-playfair block px-3 py-2 text-xl font-medium transition-colors",
                          isActive
                            ? "text-[#957127]"
                            : "text-black hover:text-[#957127]",
                        ].join(" ")
                      }
                    >
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </aside>

            <main className="w-full flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      </section>

      <CraftedByLook />
    </>
  );
}
