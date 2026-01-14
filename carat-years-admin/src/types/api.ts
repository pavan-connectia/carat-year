export type TLogin = {
  email: string;
  password: string;
};
export type TSignup = {
  name: string;
  email: string;
  password: string;
  role: "SuperAdmin" | "Admin";
};

export type TResetPassword = {
  otp: string;
  password: string;
};

export type TUploadImage = {
  file: File;
  folder: string;
};

export type TTestimonial = {
  _id?: string;
  image: string;
  name: string;
  role: string;
  description: string;
  star: number;
  order: number;
  publish: boolean;
};

export type TNewsletterSub = {
  _id?: string;
  name: string;
  email: string;
  createdAt?: string;
};

export type TSuperAdmin = {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: "SuperAdmin" | "Admin";
};

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  mobile: string;
  password?: string;
};

export type TFaq = {
  _id?: string;
  question: string;
  answer: string;
  order: number;
  publish: boolean;
  createdAt?: string;
};

export type TCreateUser = {
  name: string;
  mobile: string;
  email: string;
  password: string;
};

export type TProductCategory = {
  _id?: string;
  image: string;
  title: string;
  slug: string;
  order: number;
  publish: boolean;
};

export interface ICaratOption {
  carat: number;
  sizes: string[];
  diamondDimension: string;
  labourCategory: string;
  gWt: number;
  nWt: number;
  diamondCategory: string[];
  diamondWeight: number;
  metalRate: number;
  labourRate: number;
  diamondRate: number[];
  diamondAmt: number[]; //diamond rate * diamond weight
  MetalAmt: number; //metal rate * n.wt
  labourAmt: number; //labour amt * n.wt
  totalAmt: number; //diamont amt + metal amt + labour amt
}

export interface IVariationShape {
  shape: string;
  images: string[];
  carats: ICaratOption[];
}

export interface IVariation {
  metal: string;
  color: string;
  shapes: IVariationShape[];
}

export type TProduct = {
  productCode: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  variations: IVariation[];
  reviews?: {
    averageRating: number;
    numberOfReviews: number;
  };
  publish: boolean;
  designType: string;
  style: string;
  stone: string;
  order?: number;
};

export interface IPriceDetails {
  metalAmt: number;
  labourAmt: number;
  diamondAmtTotal: number;
  totalAmt: number;
  labDiscountAmt: number;
  diamondDiscountAmt: number;
  totalDiscountAmt: number;
  finalAmt: number;
}

export type TOrder = {
  _id: string;
  user: TUser;
  items: {
    product: string;
    title: string;
    slug: string;
    category: string;
    image?: string;
    metal: string;
    color: string;
    designType: string;
    style: string;
    stone: string;
    shape: string;
    carat: number;
    size: string;
    quantity: number;
    price: number;
    priceDetails: IPriceDetails;
  }[];
  address: {
    type: string;
    name: string;
    email: string;
    phone: string;
    pincode: string;
    state: string;
    city: string;
    addressLine1: string;
    addressLine2?: string;
    landmark?: string;
    isDefault: boolean;
  };
  discountInfo?: {
    code?: string | null;
    labDiscount?: number;
    diamondDiscount?: number;
    totalDiscount?: number;
  };
  subtotal: number;
  totalLabDiscount: number;
  totalDiamondDiscount: number;
  totalDiscount: number;
  finalTotal: number;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "processing" | "shipped" | "delivered" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
};

export type TRate = {
  metal: {
    "9k": number;
    "14k": number;
    "18k": number;
    silver: number;
    platinum?: number;
  };
  diamond: {
    d1: number;
    d2: number;
    d3: number;
    d4: number;
    d5: number;
    d6: number;
    d7: number;
    d8: number;
    d9: number;
    d10: number;
  };
  labour: {
    l1: number;
    l2: number;
    l3: number;
  };
};

export type TContactForm = {
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export type TDiscount = {
  _id?: string;
  code: string;
  description: string;
  labDiscount: number;
  diamondDiscount: number;
  order: number;
  publish: boolean;
};
