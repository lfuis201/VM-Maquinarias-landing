export interface CulqiSettings {
  title: string;
  currency: string;
  amount: number;
  order?: string;
  xculqirsaid?: string;
  rsapublickey?: string;
}

export interface CulqiClient {
  email: string;
}

export interface CulqiOptions {
  lang?: string;
  installments?: boolean;
  modal?: boolean;
  paymentMethods?: Record<string, boolean>;
  paymentMethodsSort?: string[];
}

export interface CulqiAppearance {
  theme?: string;
  hiddenCulqiLogo?: boolean;
  hiddenBannerContent?: boolean;
  hiddenBanner?: boolean;
  hiddenToolBarAmount?: boolean;
  menuType?: 'default' | 'sidebar' | 'sliderTop' | 'select';
  buttonCardPayText?: string;
  defaultStyle?: {
    bannerColor?: string;
    buttonBackground?: string;
    menuColor?: string;
    linksColor?: string;
    buttonTextColor?: string;
    priceColor?: string;
  };
}

export interface CulqiConfig {
  settings: CulqiSettings;
  client: CulqiClient;
  options: CulqiOptions;
  appearance?: CulqiAppearance;
}
