export type TFaq = {
  _id: string;
  question: string;
  answer: string;
  order: number;
  publish: boolean;
};

export type TNewsletterSub = {
  name: string;
  email: string;
};

export interface TTestimonial {
  image: string;
  name: string;
  role: string;
  description: string;
  star: number;
  order: number;
  publish: boolean;
}

export type TAddress = {
  _id?: string;
  type: string;
  name: string;
  phone: string;
  email: string;
  pincode: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  isDefault: boolean;
};

export type TWishlist = {
  _id?: string;
  image: string;
  title: string;
  slug: string;
  category:
    | string
    | {
        title: string;
        slug: string;
      };
  metal?: string;
  color?: string;
  designType?: string;
  style?: string;
  stone?: string;
  shape?: string;
  carat?: number;
  size?: string;
};

export type TContactForm = {
  name: string;
  email: string;
  message: string;
};

export type TProductCategory = {
  image: string;
  title: string;
  slug: string;
  featured: boolean;
  order?: number;
  publish: boolean;
};

export type TDiscount = {
  code: string;
  description: string;
  labDiscount: number;
  diamondDiscount: number;
  order: number;
  publish: boolean;
};


export interface MegaMenuItem {
  label: string;
  href: string;
  icon?: string;
}

export interface MegaMenuColumn {
  id?: string;
  title: string;
  items: MegaMenuItem[];
  groups?: {
    title: string;
    items: MegaMenuItem[];
  }[];
}

export interface MegaMenuPromo {
  title?: string;
  image: string;
  label: string;
  href: string;
}

export interface NavItem {
  id?: string;
  name: string;
  href: string;
  hasMegaMenu?: boolean;
  megaMenuData?: {
    layoutType?: 'default' | 'split';
    columns: MegaMenuColumn[];
    promos: MegaMenuPromo[];
  };
}
