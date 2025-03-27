// Dependencies
import type * as React from 'react';
import type * as Square from '@square/web-sdk';

export type PaymentFormProps = {
  /**
   * Identifies the calling form with a verified application ID generated from
   * the Square Application Dashboard.
   */
  applicationId: string;
  /**
   * Invoked when payment form receives the result of a tokenize generation
   * request. The result will be a valid credit card or wallet token, or an error.
   */
  cardTokenizeResponseReceived: (
    props: Square.TokenResult,
    verifiedBuyer?: Square.VerifyBuyerResponseDetails | null,
    payments?: Square.Payments
  ) => void;
  children: React.ReactNode;
  /**
   * Identifies the location of the merchant that is taking the payment.
   * Obtained from the Square Application Dashboard - Locations tab.
   */
  locationId: string;
  /**
   * **Required for digital wallets**
   *
   * Encapsulates the details of an Apple Pay, Google Pay, or Afterpay/Clearpay
   * request for payment and provides a means of listening for shipping option
   * and shipping contact changes via event listeners.
   */
  createPaymentRequest?: () => Square.PaymentRequestOptions;
  /**
   * **Strong Customer Authentication**
   *
   * The verification details parameter, passed to the `payments.verifyBuyer()`
   * function, for cases in which he buyer is being charged or the card is being
   * stored on file.
   */
  createVerificationDetails?: () => Square.ChargeVerifyBuyerDetails | Square.StoreVerifyBuyerDetails;
  formProps?: Omit<React.HTMLProps<HTMLDivElement>, 'role'>;
  /** Override the default payment form configuration. */
  overrides?: {
    /** The URL of the Square payment form script. */
    scriptSrc?: string;
  };
};
