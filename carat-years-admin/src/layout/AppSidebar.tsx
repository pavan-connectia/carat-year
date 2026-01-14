import type * as React from "react";
import {
  BadgeCheck,
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  LayoutDashboard,
  MailCheck,
  MessageSquareQuote,
  ShieldCheck,
  ShoppingCart,
  Box,
  FileText,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation, useNavigate } from "react-router";
import useAuthStore from "@/store/authStore";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

/* ------------------------------------------------------------------ */
/* TYPES */
/* ------------------------------------------------------------------ */

type UserRole = "Admin" | "SuperAdmin";

type NavItem = {
  title: string;
  url: string;
  icon?: React.ElementType;
  roles?: UserRole[];
  items?: {
    title: string;
    url: string;
  }[];
};

/* ------------------------------------------------------------------ */
/* NAV CONFIG (SINGLE SOURCE OF TRUTH) */
/* ------------------------------------------------------------------ */

const navMain: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    roles: ["Admin", "SuperAdmin"],
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: ShoppingCart,
    roles: ["Admin", "SuperAdmin"],
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Box,
    roles: ["Admin", "SuperAdmin"],
    items: [
      { title: "Products List", url: "/dashboard/products" },
      { title: "Products Category", url: "/dashboard/products/product-category" },
      { title: "Rate", url: "/dashboard/products/rate" },
      { title: "Discount", url: "/dashboard/products/discount" },
    ],
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
    roles: ["Admin", "SuperAdmin"],
  },
  {
    title: "Faqs",
    url: "/dashboard/faqs",
    icon: FileText,
    roles: ["Admin", "SuperAdmin"],
  },
  {
    title: "Contact Form",
    url: "/dashboard/contact-form",
    icon: MailCheck,
    roles: ["Admin", "SuperAdmin"],
  },
  {
    title: "Newsletter",
    url: "/dashboard/newsletter-subscribers",
    icon: MailCheck,
    roles: ["Admin", "SuperAdmin"],
  },
  {
    title: "Testimonials",
    url: "/dashboard/testimonials",
    icon: MessageSquareQuote,
    roles: ["Admin", "SuperAdmin"],
  },
  {
    title: "Super Admin",
    url: "/dashboard/super-admin",
    icon: ShieldCheck,
    roles: ["SuperAdmin"], // 🔐 ONLY SUPER ADMIN
  },
];

/* ------------------------------------------------------------------ */
/* SIDEBAR COMPONENT */
/* ------------------------------------------------------------------ */

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isMobile } = useSidebar();
  const { name, email, role, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 🔐 Filter nav items based on role
  const filteredNav = navMain.filter(
    (item) => !item.roles || item.roles.includes(role as UserRole),
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* ---------------- HEADER ---------------- */}
      <SidebarHeader>
        <div className="flex gap-2 py-2 text-sidebar-accent-foreground">
          <div className="flex size-8 items-center justify-center rounded-lg">
            <img src="/icon.png" alt="logo" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Carat Years</span>
            <span className="truncate text-xs">admin dashboard</span>
          </div>
        </div>
      </SidebarHeader>

      {/* ---------------- CONTENT ---------------- */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            {filteredNav.map((item) => {
              const isActive =
                pathname === item.url ||
                item.items?.some((sub) => pathname === sub.url);

              if (item.items) {
                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton isActive={isActive} tooltip={item.title}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((sub) => (
                            <SidebarMenuSubItem key={sub.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === sub.url}
                              >
                                <Link to={sub.url}>{sub.title}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* ---------------- FOOTER ---------------- */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage alt={name || ""} />
                    <AvatarFallback className="rounded-lg uppercase">
                      {name?.[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{name}</span>
                    <span className="truncate text-xs">{email}</span>
                  </div>

                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg uppercase">
                        {name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{name}</span>
                      <span className="truncate text-xs">{email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard/profile")}
                  >
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
