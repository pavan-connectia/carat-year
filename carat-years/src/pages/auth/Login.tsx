import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LucideLoader2, } from "lucide-react";
import { useLogin, useSendEmailLoginOtp, useVerifyEmailLoginOtp } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().optional().or(z.literal("")),
  mobile: z.string().min(10).optional().or(z.literal("")),
  password: z.string().min(6).optional().or(z.literal("")),
  otp: z.string().length(6).optional().or(z.literal("")),
});

export default function Login() {
  const [method, setMethod] = useState<"email" | "mobile">("email");
  const [authType, setAuthType] = useState<"password" | "otp">("password");
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending: isLoginPending } = useLogin();
  const { mutate: sendOtp, isPending: isSendingOtp } = useSendEmailLoginOtp();
  const { mutate: verifyOtp, isPending: isVerifyingOtp } = useVerifyEmailLoginOtp();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", mobile: "", password: "", otp: "" },
  });

  const onSubmit = (values: any) => {
    if (method === "mobile" || (method === "email" && authType === "password")) {
      login(values);
    } else {
      verifyOtp({ email: values.email, otp: values.otp });
    }
  };

  const handleSendOtp = () => {
    const email = form.getValues("email");
    if (!email) return form.setError("email", { message: "Email is required" });
    
    sendOtp({ email }, {
      onSuccess: () => setOtpSent(true)
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-r from-amber-50 to-orange-100 p-4">
      <div className="w-full max-w-xl  p-8 rounded-3xl shadow-xl">
        
        <div className="mb-10">
          <h1 className="flex items-center justify-center text-3xl font-bold text-black">
            <span className="h-0.5 grow bg-linear-to-r from-transparent to-[#FFE2A6]"></span>
            <span className="mx-4">Login</span>
            <span className="h-0.5 grow bg-linear-to-l from-transparent to-[#FFE2A6]"></span>
          </h1>
        </div>

        <div className="relative mb-8 flex h-12 w-full items-center rounded-full bg-gray-100 p-1">
          <div 
            className={cn(
              "absolute h-10 w-[49%] rounded-full bg-[#351043] shadow-md transition-all duration-300",
              method === "mobile" ? "translate-x-full" : "translate-x-0"
            )}
          />
          <button
            type="button"
            className={cn("relative z-10 w-1/2 text-sm font-medium transition-colors", method === "email" ? "text-white" : "text-gray-500")}
            onClick={() => { setMethod("email"); setOtpSent(false); }}
          >
            Email Login
          </button>
          <button
            type="button"
            className={cn("relative z-10 w-1/2 text-sm font-medium transition-colors", method === "mobile" ? "text-white" : "text-gray-500")}
            onClick={() => { setMethod("mobile"); setAuthType("password"); }}
          >
            Mobile Login
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {method === "email" ? (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#5C5C5C]">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} disabled={otpSent} className="rounded-2xl border-[#C0C0C0]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#5C5C5C]">Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter mobile number" {...field} className="rounded-2xl border-[#C0C0C0]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {method === "email" && !otpSent && (
              <div className="flex gap-4">
                <Button 
                  type="button" 
                  variant={authType === "password" ? "default" : "outline"}
                  className={cn("flex-1 rounded-xl", authType === "password" ? "bg-[#351043]" : "")}
                  onClick={() => setAuthType("password")}
                >
                  Use Password
                </Button>
                <Button 
                  type="button" 
                  variant={authType === "otp" ? "default" : "outline"}
                  className={cn("flex-1 rounded-xl", authType === "otp" ? "bg-[#351043]" : "")}
                  onClick={() => setAuthType("otp")}
                >
                  Use OTP
                </Button>
              </div>
            )}

            {(authType === "password" || method === "mobile") && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#5C5C5C]">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          {...field}
                          className="rounded-2xl border-[#C0C0C0] pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {method === "email" && authType === "otp" && otpSent && (
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#5C5C5C]">6-Digit OTP</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter OTP" {...field} className="rounded-2xl border-[#C0C0C0] text-center text-lg tracking-widest" maxLength={6} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-blue-600 cursor-pointer text-right" onClick={() => setOtpSent(false)}>Resend or Change Email?</p>
                  </FormItem>
                )}
              />
            )}

            {method === "email" && authType === "otp" && !otpSent ? (
              <Button
                type="button"
                onClick={handleSendOtp}
                disabled={isSendingOtp}
                className="w-full rounded-3xl bg-[#351043] py-6 hover:bg-purple-950"
              >
                {isSendingOtp ? <LucideLoader2 className="animate-spin" /> : "Send Login OTP"}
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoginPending || isVerifyingOtp}
                className="w-full rounded-3xl bg-[#351043] py-6 text-white hover:bg-purple-950"
              >
                {isLoginPending || isVerifyingOtp ? (
                  <LucideLoader2 className="animate-spin" />
                ) : (
                  <span>{otpSent ? "Verify & Login" : "Login"}</span>
                )}
              </Button>
            )}
          </form>
        </Form>


        <div className="mt-10 flex flex-col space-y-3 text-center">
          <Link to="/forgot-password"  className="text-sm text-[#979797] hover:underline">
            Recover your password
          </Link>
          <Link to="/signup" className="text-sm text-[#979797]">
            Don't have an account? <span className="text-blue-700 underline">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}