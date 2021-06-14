export interface SqPaymentFormConfiguration {
  applicationId: string;
  locationId: string;
  callbacks: {};
  inputStyles?: {}[];
  env?: string;
  autoBuild?: boolean;
  apiWrapper?: string;

  card?: SqPaymentFormInputConfiguration;

  inputClass?: string;
  cardNumber?: SqPaymentFormInputConfiguration;
  cvv?: SqPaymentFormInputConfiguration;
  expirationDate?: SqPaymentFormInputConfiguration;
  postalCode?: SqPaymentFormInputConfiguration | boolean;
  giftCard?: SqPaymentFormInputConfiguration;

  applePay?: SqPaymentFormInputConfiguration;
  googlePay?: SqPaymentFormInputConfiguration;
  masterpass?: SqPaymentFormInputConfiguration;
}

export interface SqMethods {
  applePay: boolean;
  masterpass: boolean;
  googlePay: boolean;
}

export interface SqError {
  type: string;
  message: string;
  field?: string;
}

declare enum SqCardBrand {
  americanExpress = 'americanExpress',
  discover = 'discover',
  discoverDiners = 'discoverDiners',
  JCB = 'JCB',
  masterCard = 'masterCard',
  unionPay = 'unionPay',
  unknown = 'unknown',
  visa = 'visa',
}

export interface SqCardData {
  card_brand: SqCardBrand;
  last_4: string;
  exp_month: string;
  exp_year: string;
  billing_postal_code?: string;
  digital_wallet_type: string;
}

export interface SqPaymentRequest {
  requestShippingAddress: boolean;
  requestBillingInfo: boolean;
  shippingContact?: SqContact;
  currencyCode: string;
  countryCode: string;
  total: SqLineItem;
  lineItems?: SqLineItem[];
}

export interface SqShippingOption {
  id: string;
  label: string;
  amount: string;
}

export interface SqContact {
  familyName: string;
  givenName: string;
  email: string;
  country: string;
  countryName?: string;
  region?: string;
  city: string;
  addressLines: string[];
  postalCode: string;
  phone?: string;
}

export interface SqVerificationDetails {
  billingContact: SqContact;
  amount?: string;
  currencyCode?: string;
  intent?: string;
}

export interface SqVerificationResult {
  token: string;
  userChallenged: boolean;
}

interface SqLineItem {
  label: string;
  amount: string;
  pending?: boolean;
}

interface SqPaymentFormInputConfiguration {
  elementId: string;
  placeholder?: string;
  // only for custom styling of the single-element payment form
  // https://developer.squareup.com/docs/payment-form/cookbook/customize-form-styles#an-example-1
  inputStyle?: {};
}
