// Dependencies
import type {
  Payments,
  PaymentRequestOptions,
  TokenResult,
  VerifyBuyerResponseDetails,
} from '@square/web-sdk';

export type FormContextInterface = {
  /**
   * **Required for all features**
   *
   * Invoked when payment form receives the result of a tokenize generation request. The result will be a valid credit card or wallet token, or an error.
   */
  cardTokenizeResponseReceived: (
    token: TokenResult,
    verifiedBuyer?: VerifyBuyerResponseDetails | null
  ) => void;
  /**
   * **Required for digital wallets**
   *
   * Invoked when a digital wallet payment button is clicked.
   */
  createPaymentRequest?: PaymentRequestOptions;
  /**
   * Unique form ID
   */
  formId?: string;
  /**
   * Returned by `Square.payments(appId, locationId)`.
   *
   * Use this object to instantiate Payment methods.
   * @example
   * const payments = Square.payments(appId, locationId);
   */
  payments: Payments | null;
};
