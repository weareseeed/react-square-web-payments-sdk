// Vendor Modules
import type {
  MethodType,
  Payments,
  PaymentRequestOptions,
  TokenResult,
} from '@square/web-sdk';

type ValueOf<T> = T[keyof T];
export type Methods = ValueOf<MethodType>;

export enum PaymentMethodState {
  LOADING = 'loading',
  READY = 'ready',
  UNAVAILABLE = 'unavailable',
}

export type ActionMethodReducer = {
  type: 'CHANGE_STATE' | Methods;
  payload: Record<MethodType, PaymentMethodState>[];
};

export type MethodsSupported = {
  ach?: boolean;
  applePay?: boolean;
  card?: boolean;
  cashApp?: boolean;
  googlePay?: boolean;
  giftCard?: boolean;
};

export type InitialStateMethods = Record<
  'ach' | 'applePay' | 'card' | 'cashApp' | 'googlePay' | 'giftCard',
  'loading' | 'ready' | 'unavailable'
>;

export interface FormContextInterface extends InitialStateMethods {
  /**
   * **Required for all features**
   *
   * Invoked when payment form receives the result of a tokenize generation request. The result will be a valid credit card or wallet token, or an error.
   */
  cardTokenizeResponseReceived: (props: TokenResult) => void;
  /**
   * **Required for digital wallets**
   *
   * Invoked when a digital wallet payment button is clicked.
   */
  createPaymentRequest?: PaymentRequestOptions;
  /*
   * Triggered when the page renders to decide which, if any,
   * digital wallet button should be rendered in the payment form.
   */
  dispatchMethods: React.Dispatch<ActionMethodReducer>;
  /**
   * Handle the state of the payment methods.
   */
  enableMethod: (method: string) => void;
  /**
   * Unique form ID
   */
  formId?: string;
  /**
   * The state of the payment methods.
   */
  methods: InitialStateMethods;
  /**
   * Returned by `Square.payments(appId, locationId)`.
   *
   * Use this object to instantiate Payment methods.
   * @example
   * const payments = Square.payments(appId, locationId);
   */
  payments: Payments;
}
