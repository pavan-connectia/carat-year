import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useRef, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Heading from "@/components/ui/Heading";
import { useResendEmailOtp, useVerifyEmail } from "@/hooks/useUser";
import { LucideLoader2 } from "lucide-react";

const otpSchema = z.object({
  email: z.string().email("Invalid email address"),
  emailOtp: z
    .array(z.string().length(1, "Enter one digit"))
    .length(6, "OTP must be 6 digits"),
});

type OtpFormData = z.infer<typeof otpSchema>;

export default function ForgotPassword() {
  const { mutate: resendEmailOtp, isPending: isEmailResending } =
    useResendEmailOtp();
  const { mutate, isPending } = useVerifyEmail();
  const [emailTimer, setEmailTimer] = useState(0);
  const emailOtpRefs = useRef<HTMLInputElement[]>([]);

  const form = useForm<OtpFormData>({
    defaultValues: {
      email: "",
      emailOtp: Array(6).fill(""),
    },
  });

  useEffect(() => {
    let emailInterval: NodeJS.Timeout;
    if (emailTimer > 0) {
      emailInterval = setInterval(() => setEmailTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(emailInterval);
  }, [emailTimer]);

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value.replace(/\D/g, ""); // digits only

    const refs = emailOtpRefs.current;

    // Type-safe access
    const otpArray = form.getValues("emailOtp");

    otpArray[index] = value;
    form.setValue("emailOtp", otpArray);

    if (value && index < 5) {
      refs[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const otpArray = form.getValues("emailOtp");

    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      emailOtpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    startIndex: number,
  ) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const refs = emailOtpRefs.current;
    const otpArray = form.getValues("emailOtp");

    pasteData.split("").forEach((char, idx) => {
      if (startIndex + idx < 6) {
        otpArray[startIndex + idx] = char;
      }
    });

    form.setValue("emailOtp", otpArray);

    const lastIndex = Math.min(startIndex + pasteData.length - 1, 5);
    refs[lastIndex]?.focus();
  };

  const onSubmit = (values: OtpFormData) => {
    const payload = {
      email: values.email,
      emailOtp: values.emailOtp.join(""),
    };
    mutate(payload);
  };

  const handleResendOtp = () => {
    resendEmailOtp(form.getValues("email"));
    setEmailTimer(60);
    form.setValue("emailOtp", Array(6).fill(""));
    emailOtpRefs.current[0]?.focus();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-r from-amber-50 to-orange-100">
      <div className="w-full max-w-md p-8">
        <div className="mb-16">
          <Heading>Set New Password</Heading>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="rounded-2xl border border-[#C0C0C0]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                className="rounded-2xl border border-gray-400 bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:underline"
                disabled={emailTimer > 0}
                onClick={handleResendOtp}
              >
                {isEmailResending
                  ? "Sending..."
                  : emailTimer > 0
                    ? `Resend in ${emailTimer}s`
                    : "Resend Email OTP"}
              </Button>
            </div>

            <FormItem>
              <FormLabel>Enter the OTP received on your email.</FormLabel>
              <div className="flex justify-between gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Controller
                    key={i}
                    name={`emailOtp.${i}` as const}
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        ref={(el) => {
                          emailOtpRefs.current[i] = el!;
                        }}
                        maxLength={1}
                        placeholder="*"
                        className="h-12 w-12 rounded-2xl border border-gray-300 text-center text-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                        onChange={(e) => handleOtpChange(e, i)}
                        onKeyDown={(e) => handleOtpKeyDown(e, i)}
                        onPaste={(e) => handleOtpPaste(e, i)}
                      />
                    )}
                  />
                ))}
              </div>
            </FormItem>

            <Button
              type="submit"
              className="w-full rounded-3xl bg-[#351043] py-3 text-white hover:bg-purple-950"
            >
              {!isPending ? (
                <span>Proceed</span>
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
