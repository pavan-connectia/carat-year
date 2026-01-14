export type TRegister = {
  name: string;
  email: string;
  mobile: string;
  password: string;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TLoginWithOtp = {
  email: string;
};

export type TLoginWithOtpVerify = {
  email: string;
  otp: string;
};

export type TVerifyUserOtp = {
  email: string;
  emailOtp: string;
  mobileOtp?: string;
};

export type TResetPassword = {
  email: string;
  password: string;
};

export type TUser = {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confrimPassword?: string;
};
