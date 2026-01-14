import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Heading from "../ui/Heading";
import { usePostNewsletterSub } from "@/hooks/useNewsletterSub";
import { motion } from "motion/react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

export default function SubscribePopup() {
  const { mutate } = usePostNewsletterSub();
  const [isOpen, setIsOpen] = useState(false);

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
        setIsOpen(false);
      },
    });
  };

  useEffect(() => {
    const subscribed = localStorage.getItem("newsletter-subscribed");
    const dismissed = localStorage.getItem("newsletter-dismissed");

    if (!subscribed && !dismissed) {
      const timer = setTimeout(() => setIsOpen(true), 8000); // show after 8s
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("newsletter-dismissed", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/40 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative mt-[50px] w-full max-w-3xl rounded-xl bg-white shadow-lg sm:mt-12 sm:overflow-auto"
      >
        {/* Close button */}
        <div className="flex justify-end p-4 md:p-6">
          <Button
            onClick={handleClose}
            className="h-8 w-8 rounded-full border border-gray-400 bg-white text-gray-600 hover:bg-gray-100"
          >
            ✕
          </Button>
        </div>

        <div className="px-6 pb-4 text-center md:px-8">
          <Heading>Subscribe To Get 10% Off</Heading>
          <p className="text-sm text-gray-600 md:text-base">
            Stay up-to-date with new collections and deals.
          </p>
        </div>

        <div className="mb-10 flex flex-col-reverse md:flex-row">
          <div className="flex-1 p-4 md:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your name"
                          className="w-full rounded-2xl border border-[#C0C0C0] px-3 py-2 md:px-4 md:py-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email"
                          className="w-full rounded-2xl border border-[#C0C0C0] px-3 py-2 md:px-4 md:py-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full rounded-3xl bg-[#351043] py-3 text-white hover:bg-purple-950"
                >
                  Subscribe now
                </Button>
              </form>
            </Form>
          </div>

          <div className="mb-6 flex flex-1 items-center justify-center md:mb-0">
            <img
              src="/home/left-image.png"
              alt="Offer"
              className="max-h-84 w-76 max-w-sm rounded-3xl object-cover md:max-h-72"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
