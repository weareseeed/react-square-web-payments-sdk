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
    verifiedBuyer?: Square.VerifyBuyerResponseDetails | null
  ) => void;
  children?: React.ReactNode;
  /**
   * **Required for digital wallets**
   *
   * Invoked when a digital wallet payment button is clicked.
   */
  createPaymentRequest?: () => Square.PaymentRequestOptions;
  /** **Required for SCA** */
  createVerificationDetails?: () => Square.ChargeVerifyBuyerDetails | Square.StoreVerifyBuyerDetails;
  formProps?: Omit<React.HTMLProps<HTMLDivElement>, 'role'>;
  /**
   * Identifies the location of the merchant that is taking the payment.
   * Obtained from the Square Application Dashboard - Locations tab.
   */
  locationId: string;
  /** Override the default payment form configuration. */
  overrides?: {
    /** The URL of the Square payment form script. */
    scriptSrc?: string;
  };
};
