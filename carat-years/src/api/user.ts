import axiosInstance from "@/lib/axiosInstance";
import type {
  TLogin,
  TLoginWithOtp,
  TLoginWithOtpVerify,
  TRegister,
  TResetPassword,
  TUser,
  TVerifyUserOtp,
} from "@/types/user";

export const registerUser = async (formData: TRegister) => {
  const res = await axiosInstance.post("/user/signup", formData);

  return res.data;
};

export const loginUser = async (formData: TLogin) => {
  const res = await axiosInstance.post("/user/login", formData);

  return res.data;
};

export const sendEmailLoginOtp = async (formData: TLoginWithOtp) => {
  const res = await axiosInstance.post("/user/login/email-otp", formData);

  return res.data;
}

export const verifyEmailLoginOtp = async (formData: TLoginWithOtpVerify) => {
  const res = await axiosInstance.post("/user/login/email-otp/verify", formData);

  return res.data;
}

export const verifyUserOtp = async (formData: TVerifyUserOtp) => {
  const res = await axiosInstance.post("/user/verify-otp", formData);
  return res.data;
};

export const resendEmailOtp = async (email: string) => {
  const res = await axiosInstance.post("/user/resend-email-otp", { email });
  return res.data;
};

export const resendMobileOtp = async (mobile: string) => {
  const res = await axiosInstance.post("/user/resend-mobile-otp", { mobile });
  return res.data;
};

export const forgotPassword = async (email: string) => {
  const res = await axiosInstance.post("/user/forgot-password", { email });
  return res.data;
};

export const verifyEmail = async (email: string, emailOtp: string) => {
  const res = await axiosInstance.post("/user/verify-email", {
    email,
    emailOtp,
  });
  return res.data;
};

export const resetPassword = async (formData: TResetPassword) => {
  const res = await axiosInstance.patch("/user/reset-password", formData);
  return res.data;
};

export const updateProfile = async (formData: Partial<TUser>) => {
  const res = await axiosInstance.patch("/user/profile", formData);

  return res.data;
};

export const delecteAccount = async () => {
  const res = await axiosInstance.delete("/user/me");

  return res.data;
};
