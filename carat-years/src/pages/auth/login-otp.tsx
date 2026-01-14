import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucideLoader2, ArrowLeft } from "lucide-react";
import { useVerifyEmailLoginOtp, useSendEmailLoginOtp } from "@/hooks/useUser";
import { toast } from "sonner";
import { z } from "zod";

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

type OTPFormData = z.infer<typeof otpSchema>;

export default function LoginOTP() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("loginEmail");

  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyEmailLoginOtp();
  const { mutate: resendOtp, isPending: isResending } = useSendEmailLoginOtp();

  useEffect(() => {
    if (!email) {
      toast.error("Session expired. Please enter your email again.");
      navigate("/login");
    }
  }, [email, navigate]);

  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const onSubmit = (values: OTPFormData) => {
    if (!email) return;
    verifyOtp({ email, otp: values.otp });
  };

  const handleResend = () => {
    if (!email) return;
    resendOtp({ email });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-r from-amber-50 to-orange-100 p-4">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-xl">
        
        {/* Back Button */}
        <Link 
          to="/login" 
          className="flex items-center text-sm text-gray-500 hover:text-[#351043] mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Login
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#351043] mb-2">Verify OTP</h1>
          <p className="text-gray-500 text-sm">
            We've sent a 6-digit code to <br />
            <span className="font-semibold text-gray-800">{email}</span>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">One-Time Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="000000"
                      className="rounded-2xl border-[#C0C0C0] h-14 text-center text-2xl tracking-[1em] font-bold focus:border-[#351043] focus:ring-[#351043]"
                      maxLength={6}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isVerifying}
              className="w-full rounded-3xl bg-[#351043] py-6 text-lg font-semibold text-white hover:bg-purple-950 transition-all"
            >
              {isVerifying ? (
                <LucideLoader2 className="animate-spin" />
              ) : (
                "Verify & Login"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Didn't receive the code?{" "}
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-blue-700 font-semibold underline disabled:text-gray-400 hover:text-blue-800 transition-colors"
            >
              {isResending ? "Sending..." : "Resend OTP"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}