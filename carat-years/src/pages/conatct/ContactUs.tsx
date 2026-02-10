import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostContactForm } from "@/hooks/useContactForm";
import { LucideLoader2 } from "lucide-react";

// Updated Schema with logic for "either email or phone"
const formSchema = z
  .object({
    name: z.string().min(1, "Name can't be empty"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    phone: z
      .string()
      .regex(/^[0-9]+$/, "Phone must contain only numbers")
      .min(10, "Phone must be at least 10 digits")
      .optional()
      .or(z.literal("")),
    message: z.string().min(1, "Message can't be empty"),
  })
  .refine((data) => (data.email && data.email.length > 0) || (data.phone && data.phone.length > 0), {
    message: "Either email or phone number is required",
    path: ["email"], // This will show the error message under the email field
  });

type FormData = z.infer<typeof formSchema>;

export default function ContactUs() {
  const { mutate, isPending } = usePostContactForm();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    // Transform phone to number if your API strictly requires a number type
    const payload = {
      ...values,
      phone: values.phone ? Number(values.phone) : undefined,
    };
    
    mutate(payload as any, { 
      onSuccess: () => form.reset() 
    });
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="rounded-2xl bg-transparent p-5">
        <Heading>Contact Us</Heading>
        <p className="my-3 mb-10 text-center text-gray-600">
          Have a question or need help? Our team is here to assist you.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <input
                      placeholder="Enter your name"
                      {...field}
                      className="w-full rounded-none border-b border-[#9A9A9A] px-0 py-3 focus:border-[#351043] focus:ring-0 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <input
                        placeholder="example@mail.com"
                        {...field}
                        className="w-full rounded-none border-b border-[#9A9A9A] px-0 py-3 focus:border-[#351043] focus:ring-0 focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        {...field}
                        className="w-full rounded-none border-b border-[#9A9A9A] px-0 py-3 focus:border-[#351043] focus:ring-0 focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Message Field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Enter your message"
                      {...field}
                      className="w-full rounded-none border-b border-[#9A9A9A] px-0 py-3 focus:border-[#351043] focus:ring-0 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="outline"
              disabled={isPending}
              className="w-full rounded-full border border-purple-900 bg-[#430045] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-purple-900 sm:px-10 sm:py-4 sm:text-lg"
            >
              {!isPending ? (
                <span> Send Message</span>
              ) : (
                <LucideLoader2 className="animate-spin" />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}