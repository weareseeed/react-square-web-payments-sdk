// Vendor Modules
import * as Square from '@square/web-sdk';
import { document } from 'browser-monads-ts';
import * as React from 'react';

// Internals
import { useDynamicCallback } from '@/hooks';
import {
  SqError,
  SqCardData,
  SqContact,
  SqMethods,
  SqPaymentRequest,
  SqShippingOption,
  SqPaymentFormConfiguration,
  SqVerificationResult,
  SqVerificationDetails,
} from '@/models';

declare class SqPaymentForm {
  constructor(configuration: SqPaymentFormConfiguration);

  build: () => void;
  destroy: () => void;
  recalculateSize: () => void;
  requestCardNonce: () => void;
  setPostalCode: (postal: string) => void;
  focus: (id: string) => void;
  masterpassImageUrl: () => string;
  verifyBuyer: (
    source: string,
    verificationDetails: SqVerificationDetails,
    callback: (err: SqError, verificationResult: SqVerificationResult) => void
  ) => void;
}

interface Props {
  /** <b>Required for all features</b><br/><br/>Identifies the calling form with a verified application ID generated from the Square Application Dashboard. */
  applicationId: string;
  /** <b>Required for all features</b><br/><br/>Identifies the location of the merchant that is taking the payment. Obtained from the Square Application Dashboard - Locations tab.*/
  locationId: string;
  /** <b>Required for all features</b><br/><br/>Identifies the DOM form element. */
  formId?: string;
  /** Defines the internal styles applied to the rendered iframes. */
  inputStyles?: {}[];
  /** Defines the CSS class of input iframe elements. */
  inputClass?: string;
  /** Enables Sandbox mode. */
  sandbox?: boolean;
  /** Square payment form components. */
  children?: React.ReactNode;

  /** Changes the placeholder for the CVV input. */
  placeholderCVV?: string;
  /** Changes the placeholder for the postal code input. */
  placeholderPostal?: string;
  /** Changes the placeholder for the credit card input. */
  placeholderCreditCard?: string;
  /** Changes the placeholder for the expiration date input. */
  placeholderExpiration?: string;
  /** Changes the placeholder for the gift card input. */
  placeholderGiftCard?: string;

  /** <b>Required for all features</b><br/><br/>Invoked when payment form receives the result of a nonce generation request. The result will be a valid credit card or wallet nonce, or an error. */
  cardNonceResponseReceived: (
    errors: [SqError] | null,
    nonce: string,
    cardData: SqCardData,
    buyerVerificationToken?: string,
    billingContact?: SqContact,
    shippingContact?: SqContact,
    shippingOption?: SqShippingOption
  ) => void;
  /** <b>Required for digital wallets</b><br/><br/>Invoked when a digital wallet payment button is clicked. */
  createPaymentRequest?: () => SqPaymentRequest;
  /** <b>Required for SCA</b><br/><br/> */
  createVerificationDetails?: () => SqVerificationDetails;
  /* Triggered when the page renders to decide which, if any, digital wallet button should be rendered in the payment form. */
  methodsSupported?: (methods: SqMethods) => void;
  /** Invoked when visitors interact with the iframe elements. */
  inputEventReceived?: () => void;
  /** Invoked when payment form is fully loaded. */
  paymentFormLoaded?: () => void;
  /** Invoked when requestShippingAddress is true in PaymentRequest and the buyer selects a shipping address in the Apple Pay sheet or enters a new shipping address. */
  shippingContactChanged?: (
    shippingContact: SqContact,
    done: ({}) => {}
  ) => void;
  /** Invoked when the buyer selects a shipping option in the Apple Pay sheet. */
  shippingOptionChanged?: (
    shippingOption: SqShippingOption,
    done: ({}) => {}
  ) => void;
  /** Invoked when the payment form is hosted in an unsupported browser. */
  unsupportedBrowserDetected?: () => void;

  /** Postal code to be set on paymentFormLoaded. */
  postalCode?: () => string;
  /** Field to be focused on paymentFormLoaded (valid values are cardNumber, postalCode, expirationDate, cvv). */
  focusField?: () => string;
}

export const SquareForm: React.FC<Props> = ({
  applicationId,
  locationId,
  formId = 'payment-form',
  inputStyles = [
    {
      _mozOsxFontSmoothing: 'grayscale',
      _webkitFontSmoothing: 'antialiased',
      backgroundColor: 'transparent',
      color: '#373F4A',
      fontFamily: 'Helvetica Neue',
      fontSize: '16px',
      lineHeight: '24px',
      padding: '16px',
      placeholderColor: '#CCC',
    },
  ],
  sandbox = false,
  ...props
}): JSX.Element => {
  const [applePayState, setApplePayState] = React.useState('loading');
  const [googlePayState, setGooglePayState] = React.useState('loading');
  const [masterpassState, setMasterpassState] = React.useState('loading');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [scriptLoaded, setScriptLoaded] = React.useState(false);
  const [paymentForm, setPaymentForm] = React.useState<
    SqPaymentForm | undefined
  >(undefined);
  const [formLoaded, setFormLoaded] = React.useState(false);

  function cardNonceResponseReceived(
    errors: [SqError],
    nonce: string,
    cardData: SqCardData,
    billingContact: SqContact,
    shippingContact: SqContact,
    shippingOption: SqShippingOption
  ): void {
    if (errors || !props.createVerificationDetails) {
      props.cardNonceResponseReceived(
        errors,
        nonce,
        cardData,
        '',
        billingContact,
        shippingContact,
        shippingOption
      );
      return;
    }

    paymentForm &&
      paymentForm.verifyBuyer(
        nonce,
        props.createVerificationDetails(),
        (err: SqError | null, result: SqVerificationResult) => {
          props.cardNonceResponseReceived(
            err ? [err] : null,
            nonce,
            cardData,
            result ? result.token : undefined,
            billingContact,
            shippingContact,
            shippingOption
          );
        }
      );
  }

  // Fixes stale closure issue with using React Hooks & SqPaymentForm callback functions
  // https://github.com/facebook/react/issues/16956
  const cardNonceResponseReceivedCallback = useDynamicCallback(
    cardNonceResponseReceived
  );

  function createNonce(): void {
    paymentForm && paymentForm.requestCardNonce();
  }

  function verifyBuyer(
    source: string,
    verificationDetails: SqVerificationDetails,
    callback: (err: SqError, verificationResult: SqVerificationResult) => void
  ): void {
    paymentForm &&
      paymentForm.verifyBuyer(source, verificationDetails, callback);
  }

  function methodsSupported(methods: SqMethods): void {
    const keys = Object.keys(methods);

    if (keys.includes('masterpass')) {
      setMasterpassState(methods.masterpass === true ? 'ready' : 'unavailable');
    }
    if (keys.includes('applePay')) {
      setApplePayState(methods.applePay === true ? 'ready' : 'unavailable');
    }
    if (keys.includes('googlePay')) {
      setGooglePayState(methods.googlePay === true ? 'ready' : 'unavailable');
    }

    props.methodsSupported && props.methodsSupported(methods);
  }

  const paymentFormLoaded = () => {
    setFormLoaded(true);

    props.paymentFormLoaded && props.paymentFormLoaded();
  };

  async function start() {
    const payments = await Square.payments(applicationId, locationId);
    const card = await payments.card();

    await card.attach('#card');

    document.querySelector('#pay')?.addEventListener('click', async () => {
      try {
        const result = await card.tokenize();
        console.log(result);
        // TODO: use result.token as source_id in /v2/payments API call
      } catch (ex) {
        console.error(ex);
      }
    });
  }

  function buildSqPaymentFormConfiguration(
    props: Props
  ): SqPaymentFormConfiguration {
    const config: SqPaymentFormConfiguration = {
      applicationId: props.applicationId,
      autoBuild: false,
      callbacks: {
        // @ts-ignore: Always true error
        cardNonceResponseReceived: props.cardNonceResponseReceived
          ? cardNonceResponseReceivedCallback
          : null, // handles missing callback error
        createPaymentRequest: props.createPaymentRequest,
        inputEventReceived: props.inputEventReceived,
        methodsSupported,
        paymentFormLoaded,
        shippingContactChanged: props.shippingContactChanged,
        shippingOptionChanged: props.shippingOptionChanged,
        unsupportedBrowserDetected: props.unsupportedBrowserDetected,
      },
      locationId: props.locationId,
    };

    // "The SqPaymentForm object in single-element payment form mode does not support digital wallets."
    // https://developer.squareup.com/docs/payment-form/payment-form-walkthrough#single-element-payment-form-and-digital-wallet-support
    if (document.getElementById(`${props.formId}-sq-card`)) {
      config.card = {
        elementId: `${formId}-sq-card`,
        inputStyle: inputStyles && inputStyles[0],
      };
    } else if (document.getElementById(`${formId}-sq-gift-card`)) {
      config.giftCard = {
        elementId: `${formId}-sq-gift-card`,
        placeholder:
          props.placeholderGiftCard || '• • • •  • • • •  • • • •  • • • •',
      };
      config.inputClass = props.inputClass || 'sq-input';
      config.inputStyles = inputStyles;
    } else {
      config.inputClass = props.inputClass || 'sq-input';
      config.inputStyles = inputStyles;

      if (document.getElementById(`${formId}-sq-apple-pay`)) {
        config.applePay = { elementId: `${formId}-sq-apple-pay` };
      }
      if (document.getElementById(`${formId}-sq-google-pay`)) {
        config.googlePay = { elementId: `${formId}-sq-google-pay` };
      }
      if (document.getElementById(`${formId}-sq-masterpass`)) {
        config.masterpass = { elementId: `${formId}-sq-masterpass` };
      }

      if (document.getElementById(`${formId}-sq-card-number`)) {
        config.cardNumber = {
          elementId: `${formId}-sq-card-number`,
          placeholder:
            props.placeholderCreditCard || '• • • •  • • • •  • • • •  • • • •',
        };
      }
      if (document.getElementById(`${formId}-sq-cvv`)) {
        config.cvv = {
          elementId: `${formId}-sq-cvv`,
          placeholder: props.placeholderCVV || 'CVV ',
        };
      }
      if (document.getElementById(`${formId}-sq-postal-code`)) {
        config.postalCode = {
          elementId: `${formId}-sq-postal-code`,
          placeholder: props.placeholderPostal || '12345',
        };
      } else {
        config.postalCode = false;
      }
      if (document.getElementById(`${formId}-sq-expiration-date`)) {
        config.expirationDate = {
          elementId: `${formId}-sq-expiration-date`,
          placeholder: props.placeholderExpiration || 'MM/YY',
        };
      }
    }
    return config;
  }

  // Effects
  React.useEffect(() => {
    start()
      .then(() => setScriptLoaded(true))
      .catch(() => setErrorMessage('Unable to load Square payment library'));
  }, []);

  return <div id={formId}>{props.children}</div>;
};

export default SquareForm;
