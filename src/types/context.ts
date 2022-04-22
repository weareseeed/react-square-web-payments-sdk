// Dependencies
import type * as Square from '@square/web-sdk';

export type FormContextType = {
  /**
   * **Required for all features**
   *
   * Invoked when payment form receives the result of a tokenize generation request.
   * The result will be a valid credit card or wallet token, or an error.
   */
  cardTokenizeResponseReceived: (
    token: Square.TokenResult,
    verifiedBuyer?: Square.VerifyBuyerResponseDetails | null
  ) => void;
  /**
   * Returned by `Square.payments(appId, locationId)`.
   *
   * Use this object to instantiate Payment methods.
   *
   * @example
   *
   * const payments = Square.payments(appId, locationId);
   */
  payments: Square.Payments | null;
  /**
   * **Required for digital wallets**
   *
   * Invoked when a digital wallet payment button is clicked.
   */
  createPaymentRequest?: Square.PaymentRequestOptions;
};
