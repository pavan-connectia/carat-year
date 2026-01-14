import { Link } from "react-router";
import FacebookIcon from "@/assets/icons/facebook.svg";
import InstagramIcon from "@/assets/icons/instagram.svg";
import TwitterIcon from "@/assets/icons/twitter.svg";
import LinkedinIcon from "@/assets/icons/linkedin.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { usePostNewsletterSub } from "@/hooks/useNewsletterSub";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

const helpAndInfo = [
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
];

const discoverLinks = [
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

const contactLinks = [
  { label: "Live Chat", href: "#" },
  { label: "Email Us", href: "mailto:connect@caratyears.in" },
  { label: "Book An Appointment", href: "/book-appointment" },
  { label: "Visit Our Stores", href: "/visit-stores" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-6 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo and Social */}
          <div className="order-1 col-span-3 md:col-span-1 flex flex-col items-start gap-6">
            <Link to="/">
              <img
                src="/logo.png"
                loading="eager"
                className="h-20 w-auto object-contain"
              />
            </Link>

            <div className="flex items-center gap-5">
              <img src={FacebookIcon} className="h-6 w-6 cursor-pointer" />
              <img src={InstagramIcon} className="h-6 w-6 cursor-pointer" />
              <img src={TwitterIcon} className="h-6 w-6 cursor-pointer" />
              <img src={LinkedinIcon} className="h-6 w-6 cursor-pointer" />
            </div>
          </div>


          <div className="order-3 col-span-2 md:order-2 md:col-span-1">
            <FooterList title="HELP & INFORMATION" items={helpAndInfo} />
          </div>

          <div className="order-4 col-span-2 md:order-3 md:col-span-1">
            <FooterList title="DISCOVER" items={discoverLinks} />
          </div>

          <div className="order-5 col-span-2 md:order-4 md:col-span-1">
            <FooterList title="CONTACT US" items={contactLinks} />
          </div>

          <div className="order-2 col-span-3 space-y-3 text-center md:col-span-1 lg:order-5 lg:text-left">
            <h3 className="mb-4 text-xs font-medium sm:text-sm">
              SIGN UP TO THE NEWSLETTER
            </h3>
            <p className="mb-4 text-xs sm:text-sm">
              For the chance to win a pair of diamond earrings! Plus early
              access to sales, birthday rewards & promotions.
            </p>
            <NewsLetterForm />
          </div>
        </div>

        <div className="mt-12 border-t border-[#FFFCF633] pt-8 text-center">
          <p className="sm:text-lg md:text-xl">
            Copyright © 2025 Carat Years
          </p>

          <div className="mt-4 max-w-4xl mx-auto text-center text-[11px] leading-relaxed text-[#F8F2E7]/80 sm:text-xs">
            Prices, exchange values and buy-back amounts are subject to verification,
            prevailing market rates and quality inspection. Carat Years reserves the
            right to accept or reject any exchange or buy-back request. Policies may be
            updated without prior notice.
          </div>
        </div>

      </div>
    </footer>
  );
}

function FooterList({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-montserrat text-sm font-medium sm:text-lg">
        {title}
      </h3>

      <ul className="mt-3 space-y-2 overflow-hidden text-sm transition-all duration-300 md:block">
        {items.map((i) => (
          <li key={i.label}>
            <Link
              to={i.href}
              className="block text-xs text-[#F8F2E7] transition-colors hover:text-white sm:text-sm"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
function NewsLetterForm() {
  const { mutate } = usePostNewsletterSub();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (values: FormData) => {
    mutate(values, {
      onSuccess: () => {
        form.reset();
        localStorage.setItem("newsletter-subscribed", "true");
      },
    });
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 md:space-y-8"
        >
          {[
            { id: "name", label: "Name" },
            { id: "email", label: "Email" },
          ].map((i) => (
            <FormField
              key={i.id}
              control={form.control}
              name={i.id as keyof FormData}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      {...field}
                      placeholder={i.label}
                      className="border-b bg-transparent text-xs focus:outline-0 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <button className="w-full cursor-pointer rounded-full border border-white bg-transparent py-1.5 text-xs text-white hover:bg-white/10 sm:py-2 sm:text-sm">
            Sign up
          </button>
        </form>
      </Form>
    </div>
  );
}
