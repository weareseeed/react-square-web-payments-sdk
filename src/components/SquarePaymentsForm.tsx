// Dependencies
import * as React from 'react';
import type {
  ChargeVerifyBuyerDetails,
  PaymentRequestOptions,
  StoreVerifyBuyerDetails,
  TokenResult,
  VerifyBuyerResponseDetails,
} from '@square/web-sdk';

// Internals
import FormProvider from '../contexts';

export interface SquarePaymentsFormProps {
  /**
   * **Required for all features**
   *
   * Identifies the calling form with a verified application ID generated from the Square Application Dashboard.
   */
  applicationId: string;
  /**
   * **Required for all features**
   *
   * Identifies the location of the merchant that is taking the payment. Obtained from the Square Application Dashboard - Locations tab.
   */
  locationId: string;
  /** Identifies the DOM form element. */
  formId?: string;
  /** Square payment form components. */
  children?: React.ReactNode;

  /**
   * **Required for all features**
   *
   * Invoked when payment form receives the result of a tokenize generation request. The result will be a valid credit card or wallet token, or an error.
   */
  cardTokenizeResponseReceived: (
    props: TokenResult,
    verifiedBuyer?: VerifyBuyerResponseDetails | null
  ) => void;
  /** **Required for digital wallets**
   *
   * Invoked when a digital wallet payment button is clicked.
   */
  createPaymentRequest?: () => PaymentRequestOptions;
  /** **Required for SCA** */
  createVerificationDetails?: () =>
    | ChargeVerifyBuyerDetails
    | StoreVerifyBuyerDetails;
}

export const SquarePaymentsForm = ({
  applicationId,
  locationId,
  formId = 'web-payment-sdk-form',
  ...props
}: SquarePaymentsFormProps): JSX.Element => {
  return (
    <FormProvider
      applicationId={applicationId}
      cardTokenizeResponseReceived={props.cardTokenizeResponseReceived}
      createPaymentRequest={props.createPaymentRequest}
      createVerificationDetails={props.createVerificationDetails}
      locationId={locationId}
    >
      <div data-testid="rswps-form" id={formId}>
        {props.children}
      </div>
    </FormProvider>
  );
};

export default SquarePaymentsForm;
