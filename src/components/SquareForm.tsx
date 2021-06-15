// Vendor Modules
import * as React from 'react';

// Internals
import FormProvider from '../contexts';
import { MethodsSupported } from '../@types';

export interface Props {
  /** <b>Required for all features</b><br/><br/>Identifies the calling form with a verified application ID generated from the Square Application Dashboard. */
  applicationId: string;
  /** <b>Required for all features</b><br/><br/>Identifies the location of the merchant that is taking the payment. Obtained from the Square Application Dashboard - Locations tab.*/
  locationId: string;
  /** <b>Required for all features</b><br/><br/>Identifies the DOM form element. */
  formId?: string;
  /** Enables Sandbox mode. */
  sandbox?: boolean;
  /** Square payment form components. */
  children?: React.ReactNode;

  // /** <b>Required for all features</b><br/><br/>Invoked when payment form receives the result of a nonce generation request. The result will be a valid credit card or wallet nonce, or an error. */
  // cardNonceResponseReceived: (
  //   errors: [SqError] | null,
  //   nonce: string,
  //   cardData: SqCardData,
  //   buyerVerificationToken?: string,
  //   billingContact?: BillingContact,
  //   shippingContact?: ShippingContact,
  //   shippingOption?: ShippingOption
  // ) => void;
  // /** <b>Required for digital wallets</b><br/><br/>Invoked when a digital wallet payment button is clicked. */
  // createPaymentRequest?: () => PaymentRequest;
  // /** <b>Required for SCA</b><br/><br/> */
  // createVerificationDetails?: () => SqVerificationDetails;
  /* Triggered when the page renders to decide which, if any, digital wallet button should be rendered in the payment form. */
  methodsSupported?: MethodsSupported;
  // /** Invoked when visitors interact with the iframe elements. */
  // inputEventReceived?: () => void;
  // /** Invoked when payment form is fully loaded. */
  // paymentFormLoaded?: () => void;
  // /** Invoked when requestShippingAddress is true in PaymentRequest and the buyer selects a shipping address in the Apple Pay sheet or enters a new shipping address. */
  // shippingContactChanged?: (
  //   shippingContact: SqContact,
  //   done: ({}) => {}
  // ) => void;
  // /** Invoked when the buyer selects a shipping option in the Apple Pay sheet. */
  // shippingOptionChanged?: (
  //   shippingOption: SqShippingOption,
  //   done: ({}) => {}
  // ) => void;
  // /** Invoked when the payment form is hosted in an unsupported browser. */
  // unsupportedBrowserDetected?: () => void;

  // /** Postal code to be set on paymentFormLoaded. */
  // postalCode?: () => string;
  // /** Field to be focused on paymentFormLoaded (valid values are cardNumber, postalCode, expirationDate, cvv). */
  // focusField?: () => string;
}

export const SquareForm: React.FC<Props> = ({
  applicationId,
  locationId,
  formId = 'payment-form',
  sandbox = false,
  ...props
}) => {
  // const [methods, dispatch] = React.useReducer(
  //   methodsReducer,
  //   INITIAL_STATE_METHODS
  // );
  // const [errorMessage, setErrorMessage] = React.useState('');
  // const [scriptLoaded, setScriptLoaded] = React.useState(false);

  // /**
  //  * Helper function to update the state of the form and retreive the available methods
  //  *
  //  * @param methods The methods that you want to support
  //  */
  // function methodsSupported(
  //   methods: MethodsSupported = props.methodsSupported || { card: true }
  // ): void {
  //   const keys = Object.keys(methods);

  //   const res = keys.reduce(
  //     (acc, method) => ({
  //       ...acc,
  //       [method]: METHODS_KEY.includes(method) ? 'ready' : 'unavailable',
  //     }),
  //     {}
  //   );

  //   // @ts-ignore
  //   dispatch({ type: 'CHANGE_STATE', payload: res });
  // }

  // const handleAchPayment = async (e: Event, ach: any) => {
  //   e.preventDefault();

  //   try {
  //     const result: TokenResult = await ach.tokenize({
  //       accountHolderName: 'Daniel Esteves',
  //     } as AchTokenOptions);

  //     console.log(result);
  //   } catch (error) {
  //     console.error(e);
  //   }
  // };

  // const handleGooglePayPayment = async (e: Event, googlePay: any) => {
  //   e.preventDefault();

  //   try {
  //     const result = await googlePay.tokenize();

  //     console.log(result);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // async function start() {
  //   methodsSupported();

  //   const payments: Payments = await Square.payments(applicationId, locationId);
  //   const card = await payments.card();
  //   const ach = await payments.ach();
  //   const paymentRequest = payments.paymentRequest({
  //     countryCode: 'US',
  //     currencyCode: 'USD',
  //     total: {
  //       amount: '1.00',
  //       label: 'Total',
  //     },
  //   });
  //   const googlePay = await payments.googlePay(paymentRequest);

  //   await card.attach('#card');

  //   props.methodsSupported?.googlePay &&
  //     (await googlePay.attach('#google-pay-button'));
  //   props.methodsSupported?.googlePay &&
  //     document
  //       .getElementById('google-pay-button')
  //       ?.addEventListener('click', async e =>
  //         handleGooglePayPayment(e, googlePay)
  //       );

  //   document
  //     .querySelector('#pay')
  //     ?.addEventListener('click', handleCardPayment);

  //   document
  //     .getElementById('ach-button')
  //     ?.addEventListener('click', async e => handleAchPayment(e, ach));
  // }

  // console.log(methods, errorMessage, scriptLoaded);

  // // Effects
  // React.useEffect(() => {
  //   if (applicationId && locationId) {
  //     start()
  //       .then(() => setScriptLoaded(true))
  //       .catch(e => {
  //         console.error(e);

  //         setErrorMessage('Unable to load Square payment library');
  //       });
  //   }
  // }, []);

  // if (!applicationId || !locationId) {
  //   return null;
  // }

  return (
    <FormProvider applicationId={applicationId} locationId={locationId}>
      <div id={formId}>{props.children}</div>
    </FormProvider>
  );
};

export default SquareForm;
