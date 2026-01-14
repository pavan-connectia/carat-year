import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPassword } from "@/hooks/useUser";
import { LucideLoader2 } from "lucide-react";

const formSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof formSchema>;

export default function ResetPassword() {
  const { mutate, isPending } = useResetPassword();
  const form = useForm<PasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: PasswordFormData) => {
    const email = sessionStorage.getItem("email") ?? "";
    mutate({ password: values.confirmPassword, email });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-r from-amber-50 to-orange-100">
      <div className="w-full max-w-xl p-8">
        <div className="mb-16">
          <h1 className="flex items-center justify-center text-3xl font-bold text-black">
            <span className="h-0.5 grow bg-linear-to-r from-transparent to-[#FFE2A6]" />
            <span className="mx-4">Set New Password</span>
            <span className="h-0.5 grow bg-linear-to-l from-transparent to-[#FFE2A6]" />
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                      className="rounded-2xl border border-[#C0C0C0]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      {...field}
                      className="rounded-2xl border border-[#C0C0C0]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              className="w-full cursor-pointer rounded-3xl bg-[#351043] px-4 py-3 font-medium text-white transition-colors hover:bg-purple-950 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 focus:outline-none"
            >
              {!isPending ? (
                <span>Login</span>
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
