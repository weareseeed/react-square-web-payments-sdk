// Vendor Modules
import type {
  MethodType,
  Payments,
  PaymentRequestOptions,
} from '@square/web-sdk';

type ValueOf<T> = T[keyof T];
export type Methods = ValueOf<MethodType>;

export type ActionMethodReducer = {
  type: 'CHANGE_STATE' | Methods;
  payload: Record<MethodType, 'loading' | 'ready' | 'unavailable'>[];
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
  /** Unique form ID */
  formId?: string;
  /**
   * Returned by `Square.payments(appId, locationId)`.
   *
   * Use this object to instantiate Payment methods.
   * @example
   * const payments = Square.payments(appId, locationId);
   */
  payments: Payments;
  /* Triggered when the page renders to decide which, if any, digital wallet button should be rendered in the payment form. */
  dispatchMethods: React.Dispatch<ActionMethodReducer>;
  /**
   * **Required for digital wallets**
   *
   * Invoked when a digital wallet payment button is clicked.
   */
  createPaymentRequest?: PaymentRequestOptions;
}
