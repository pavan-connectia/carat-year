import { Button } from "@/components/ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserStore from "@/store/userStore";
import { useUpdateProfile } from "@/hooks/useUser";
import { LucideLoader2 } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import type { TUser } from "@/types/user";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  mobile: z.string().regex(/^[0-9]{10}$/, "mobile number must be 10 digits"),
});

type FormValues = z.infer<typeof formSchema>;

export default function AccountInfo() {
  const { mutate, isPending } = useUpdateProfile();
  const { name, email, mobile } = useUserStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      email: email || "",
      mobile: mobile || "",
    },
  });

  const onSubmit = async (values: Partial<TUser>) => {
    mutate({ formData: values });
  };

  return (
    <div className="font-inter mt-10 flex items-center justify-center bg-transparent">
      <div className="w-full max-w-xl">
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
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>mobile</FormLabel>
                  <FormControl>
                    <input
                      placeholder="Enter your mobile number"
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
              className="w-full cursor-pointer rounded-3xl bg-[#351043] px-4 py-3 font-medium text-white transition-colors hover:bg-purple-950 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 focus:outline-none"
            >
              {!isPending ? (
                <span>Update</span>
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
