import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useResendEmailOtp,
  useResendMobileOtp,
  useVerifyUserOtp,
} from "@/hooks/useUser";
import { useEffect, useRef, useState } from "react";
import Heading from "@/components/ui/Heading";
import { LucideLoader2 } from "lucide-react";

type VerifyFormData = {
  email: string;
  mobile: string;
  emailOtp: string[];
  mobileOtp: string[];
};

type OtpType = "email" | "mobile";

export default function VerifyAccount() {
  const { mutate, isPending } = useVerifyUserOtp();
  const { mutate: resendEmailOtp, isPending: isEmailResending } =
    useResendEmailOtp();
  const { mutate: resendMobileOtp, isPending: isMobileResending } =
    useResendMobileOtp();
  const [emailTimer, setEmailTimer] = useState(0);
  const [mobileTimer, setMobileTimer] = useState(0);
  const emailOtpRefs = useRef<HTMLInputElement[]>([]);
  const mobileOtpRefs = useRef<HTMLInputElement[]>([]);
  const storedEmail = sessionStorage.getItem("signupEmail") || "";
  const storedMobile = sessionStorage.getItem("signupMobile") || "";

  const form = useForm<VerifyFormData>({
    defaultValues: {
      email: storedEmail,
      mobile: storedMobile,
      emailOtp: Array(6).fill(""),
      mobileOtp: Array(6).fill(""),
    },
  });

  const onSubmit = (values: VerifyFormData) => {
    const payload = {
      email: values.email,
      mobile: values.mobile,
      emailOtp: values.emailOtp.join(""),
      mobileOtp: values.mobileOtp.join(""),
    };
    mutate(payload);
  };

  useEffect(() => {
    let emailInterval: NodeJS.Timeout;
    if (emailTimer > 0) {
      emailInterval = setInterval(() => setEmailTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(emailInterval);
  }, [emailTimer]);

  useEffect(() => {
    let mobileInterval: NodeJS.Timeout;
    if (mobileTimer > 0) {
      mobileInterval = setInterval(() => setMobileTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(mobileInterval);
  }, [mobileTimer]);

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    otpType: OtpType,
  ) => {
    const value = e.target.value.replace(/\D/g, ""); // digits only

    const refs =
      otpType === "email" ? emailOtpRefs.current : mobileOtpRefs.current;

    // Type-safe access
    const otpArray =
      otpType === "email"
        ? form.getValues("emailOtp")
        : form.getValues("mobileOtp");
    otpArray[index] = value;
    form.setValue(otpType === "email" ? "emailOtp" : "mobileOtp", otpArray);

    if (value && index < 5) {
      refs[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    otpType: OtpType,
  ) => {
    const refs =
      otpType === "email" ? emailOtpRefs.current : mobileOtpRefs.current;
    const otpArray =
      otpType === "email"
        ? form.getValues("emailOtp")
        : form.getValues("mobileOtp");

    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      refs[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    startIndex: number,
    otpType: OtpType,
  ) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const refs =
      otpType === "email" ? emailOtpRefs.current : mobileOtpRefs.current;
    const otpArray =
      otpType === "email"
        ? form.getValues("emailOtp")
        : form.getValues("mobileOtp");

    pasteData.split("").forEach((char, idx) => {
      if (startIndex + idx < 6) {
        otpArray[startIndex + idx] = char;
      }
    });

    form.setValue(otpType === "email" ? "emailOtp" : "mobileOtp", otpArray);

    const lastIndex = Math.min(startIndex + pasteData.length - 1, 5);
    refs[lastIndex]?.focus();
  };

  const handleResendOtp = (type: OtpType) => {
    if (type === "email") {
      resendEmailOtp(storedEmail);
      setEmailTimer(60);
      form.setValue("emailOtp", Array(6).fill(""));
      emailOtpRefs.current[0]?.focus();
    } else {
      resendMobileOtp(storedMobile);
      setMobileTimer(60);
      form.setValue("mobileOtp", Array(6).fill(""));
      mobileOtpRefs.current[0]?.focus();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-r from-amber-50 to-orange-100">
      <div className="m-15 w-full max-w-xl p-8">
        <Heading> Verify Your Account </Heading>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-15 space-y-6"
          >
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
                      readOnly
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
                disabled={emailTimer > 0 || isEmailResending}
                onClick={() => handleResendOtp("email")}
              >
                {isEmailResending
                  ? "Sending..."
                  : emailTimer > 0
                    ? `Resend in ${emailTimer}s`
                    : "Resend Email OTP"}
              </Button>
            </div>

            <FormItem>
              <FormLabel>Email OTP</FormLabel>
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
                        onChange={(e) => handleOtpChange(e, i, "email")}
                        onKeyDown={(e) => handleOtpKeyDown(e, i, "email")}
                        onPaste={(e) => handleOtpPaste(e, i, "email")}
                      />
                    )}
                  />
                ))}
              </div>
            </FormItem>

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number"
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
                disabled={mobileTimer > 0 || isMobileResending}
                onClick={() => handleResendOtp("mobile")}
              >
                {isMobileResending
                  ? "Sending..."
                  : mobileTimer > 0
                    ? `Resend in ${mobileTimer}s`
                    : "Resend Mobile OTP"}
              </Button>
            </div>

            <FormItem>
              <FormLabel>Mobile OTP</FormLabel>
              <div className="flex justify-between gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Controller
                    key={i}
                    name={`mobileOtp.${i}` as const}
                    control={form.control}
                    rules={{
                      pattern: { value: /^[0-9]$/, message: "Digits only" },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        ref={(el) => {
                          mobileOtpRefs.current[i] = el!;
                        }}
                        maxLength={1}
                        placeholder="*"
                        className="h-12 w-12 rounded-2xl border border-gray-300 text-center text-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                        onChange={(e) => handleOtpChange(e, i, "mobile")}
                        onKeyDown={(e) => handleOtpKeyDown(e, i, "mobile")}
                        onPaste={(e) => handleOtpPaste(e, i, "mobile")}
                      />
                    )}
                  />
                ))}
              </div>
            </FormItem>

            <Button
              type="submit"
              className="w-full rounded-2xl bg-[#351043] py-3 text-white hover:bg-purple-950"
              disabled={isPending}
            >
              {!isPending ? (
                <span>Confirm</span>
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
