import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import {
  MailCheck,
  MessageSquareQuote,
  ShoppingCart,
  Truck,
  Clock,
  XCircle,
  CreditCard,
  Banknote,
} from "lucide-react";
import { useNewsletterSubs } from "@/hooks/useNewsletterSub";
import { useSuperAdmins } from "@/hooks/useSuperAdmin";
import { useTestimonials } from "@/hooks/useTestimonial";
import { useOrderStats } from "@/hooks/useOrder";
import { Link } from "react-router";

type CardCompProps = {
  href: string;
  heading: string;
  icon: ReactNode;
  count?: number;
};

export default function Dashboard() {
  const { data: newsletter } = useNewsletterSubs();
  const { data: testimonial } = useTestimonials();
  const { data: superAdmin } = useSuperAdmins();
  const { data: stats } = useOrderStats();

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">
        Hi, Welcome back 👋
      </h2>

      {/* GENERAL */}
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardComp
          href="/dashboard/newsletter-subscribers"
          heading="Newsletter Subscriptions"
          count={newsletter?.pagination?.total}
          icon={<MailCheck />}
        />
        <CardComp
          href="/dashboard/testimonial"
          heading="Testimonials"
          count={testimonial?.length || 0}
          icon={<MessageSquareQuote />}
        />
        <CardComp
          href="/dashboard/super-admin"
          heading="Super Admins"
          count={superAdmin?.data?.length}
          icon={<MessageSquareQuote />}
        />
        <CardComp
          href="/dashboard/orders?filter=today"
          heading="Today Orders"
          count={stats?.today}
          icon={<ShoppingCart />}
        />
      </div>

      {/* ORDER STATUS */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardComp
          href="/dashboard/orders?orderStatus=processing"
          heading="Processing"
          count={stats?.processing}
          icon={<Clock />}
        />
        <CardComp
          href="/dashboard/orders?orderStatus=shipped"
          heading="Shipped"
          count={stats?.shipped}
          icon={<Truck />}
        />
        <CardComp
          href="/dashboard/orders?orderStatus=delivered"
          heading="Delivered"
          count={stats?.delivered}
          icon={<ShoppingCart />}
        />
        <CardComp
          href="/dashboard/orders?orderStatus=cancelled"
          heading="Cancelled"
          count={stats?.cancelled}
          icon={<XCircle />}
        />
      </div>

      {/* PAYMENT */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardComp
          href="/dashboard/orders?paymentMethod=COD"
          heading="COD Orders"
          count={stats?.cod}
          icon={<Banknote />}
        />
        <CardComp
          href="/dashboard/orders?paymentMethod=ONLINE"
          heading="Online Orders"
          count={stats?.online}
          icon={<CreditCard />}
        />
        <CardComp
          href="/dashboard/orders?paymentStatus=failed"
          heading="Payment Failed"
          count={stats?.failedPayment}
          icon={<XCircle />}
        />
      </div>
    </>
  );
}

function CardComp({ href, heading, count, icon }: CardCompProps) {
  return (
    <Link to={href}>
      <Card className="h-32 cursor-pointer transition hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{heading}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{count ?? 0}</div>
        </CardContent>
      </Card>
    </Link>
  );
}
