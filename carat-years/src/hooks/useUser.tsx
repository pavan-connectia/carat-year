import {
  delecteAccount,
  forgotPassword,
  loginUser,
  registerUser,
  resendEmailOtp,
  resendMobileOtp,
  resetPassword,
  sendEmailLoginOtp,
  updateProfile,
  verifyEmail,
  verifyEmailLoginOtp,
  verifyUserOtp,
} from "@/api/user";
import useUserStore from "@/store/userStore";
import type {
  TLogin,
  TRegister,
  TResetPassword,
  TUser,
  TVerifyUserOtp,
    TLoginWithOtp,
  TLoginWithOtpVerify,
} from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();

  return useMutation({
    mutationFn: (formData: TLogin) => loginUser(formData),
    onSuccess: (data) => {
      toast.success("Login successful!");

      const { name, email, mobile, token } = data?.data;
      login({ name, email, mobile, token });
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "An error occurred while logging in.",
      );
    },
  });
};

export const useSendEmailLoginOtp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: TLoginWithOtp) => sendEmailLoginOtp(formData),

    onSuccess: (_, variables) => {
      toast.success("OTP sent to your email");
      sessionStorage.setItem("loginEmail", variables.email);
      navigate("/login-otp");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to send login OTP"
      );
    },
  });
};

export const useVerifyEmailLoginOtp = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();

  return useMutation({
    mutationFn: (formData: TLoginWithOtpVerify) =>
      verifyEmailLoginOtp(formData),

    onSuccess: (data) => {
      toast.success("Login successful!");

      const { name, email, mobile, token } = data?.data;
      login({ name, email, mobile, token });

      navigate("/");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Invalid or expired OTP"
      );
    },
  });
};


export const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData: TRegister) => registerUser(formData),
    onSuccess: (data) => {
      // Invalidate user query
      queryClient.invalidateQueries({ queryKey: ["user"] });

      const { email, mobile } = data?.data;
      // Store email and mobile in sessionStorage
      sessionStorage.setItem("signupEmail", email);
      sessionStorage.setItem("signupMobile", mobile);
      toast.success("Account created successfully");
      navigate("/verify");
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message ||
          "An error occurred while creating user account.",
      );
    },
  });
};

export const useVerifyUserOtp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: TVerifyUserOtp) => verifyUserOtp(formData),
    onSuccess: () => {
      toast.success("OTP verified successfully!");
      sessionStorage.removeItem("signupEmail");
      sessionStorage.removeItem("signupMobile");
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "OTP verification failed");
    },
  });
};

export const useResendEmailOtp = () => {
  return useMutation({
    mutationFn: (email: string) => resendEmailOtp(email),
    onSuccess: () => {
      toast.success("New email OTP sent successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to resend email OTP",
      );
    },
  });
};

export const useResendMobileOtp = () => {
  return useMutation({
    mutationFn: (mobile: string) => resendMobileOtp(mobile),
    onSuccess: () => {
      toast.success("New mobile OTP sent successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to resend mobile OTP",
      );
    },
  });
};

export const useForgotPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onSuccess: () => {
      toast.success("OTP sent to your email.");
      navigate("/reset-password");
    },
    onError: (error: any) => {
      toast.error(
        error.message || "An error occurred while sending the reset link.",
      );
    },
  });
};

export const useVerifyEmail = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ email, emailOtp }: { email: string; emailOtp: string }) =>
      verifyEmail(email, emailOtp),

    onSuccess: (data) => {
      const { email } = data?.data;
      sessionStorage.setItem("email", email);
      toast.success("Email Verified");
      navigate("/reset-password");
    },

    onError: (error: any) => {
      toast.error(
        error.message || "An error occurred while sending the reset link.",
      );
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData: TResetPassword) => resetPassword(formData),
    onSuccess: () => {
      toast.success("Password reset successfully");
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to reset password");
    },
  });
};

export const useUpdateProfile = () => {
  const { login } = useUserStore();

  return useMutation({
    mutationFn: ({ formData }: { formData: Partial<TUser> }) =>
      updateProfile(formData),
    onSuccess: (data) => {
      toast.success("Profile updated successfully!");
      const { name, email, mobile, token } = data?.data;
      login({ name, email, mobile, token });
    },
    onError: (error: any) => {
      toast.error(
        error?.message || "An error occurred while updating the profile.",
      );
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useUserStore();

  return useMutation({
    mutationFn: () => delecteAccount(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Account deleted successfully");
      logout();
      navigate("/");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: ({ formData }: { formData: Partial<TUser> }) =>
      updateProfile(formData),
    onSuccess: () => {
      toast.success("Password updated successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.message || "An error occurred while updating the password.",
      );
    },
  });
};
