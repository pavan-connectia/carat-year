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

const formSchema = z.object({
  name: z.string().min(1, "Name can't be empty"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Message can't be empty"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactUs() {
  const { mutate, isPending } = usePostContactForm();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    mutate(values, { onSuccess: () => form.reset() });
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

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input
                      placeholder="Enter your email"
                      {...field}
                      className="w-full rounded-none border-b border-[#9A9A9A] px-0 py-3 focus:border-[#351043] focus:ring-0 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
