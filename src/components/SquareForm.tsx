// Vendor Modules
import * as React from 'react';
import type {
  ChargeVerifyBuyerDetails,
  PaymentRequestOptions,
  StoreVerifyBuyerDetails,
  TokenResult,
} from '@square/web-sdk';

// Internals
import { MethodsSupported } from '@/@types';
import FormProvider from '@/contexts';

export interface Props {
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
  cardTokenizeResponseReceived: (props: TokenResult) => void;
  /** **Required for digital wallets**
   *
   * Invoked when a digital wallet payment button is clicked.
   */
  createPaymentRequest?: () => PaymentRequestOptions;
  /** **<b>Required for SCA** */
  createVerificationDetails?: () =>
    | ChargeVerifyBuyerDetails
    | StoreVerifyBuyerDetails;
  /** Triggered when the page renders to decide which, if any, digital wallet button should be rendered in the payment form. */
  methodsSupported?: MethodsSupported;
}

export const SquareForm = ({
  applicationId,
  locationId,
  formId = 'web-payment-sdk-form',
  ...props
}: Props): JSX.Element => {
  return (
    <FormProvider
      applicationId={applicationId}
      locationId={locationId}
      createPaymentRequest={props.createPaymentRequest}
      methodsSupported={props.methodsSupported}
      cardTokenizeResponseReceived={props.cardTokenizeResponseReceived}
      createVerificationDetails={props.createVerificationDetails}
    >
      <div id={formId}>{props.children}</div>
    </FormProvider>
  );
};

export default SquareForm;
