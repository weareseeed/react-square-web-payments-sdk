// Dependencies
import * as React from 'react';
import useEvent from 'react-use/lib/useEvent';
import type {
  GooglePay as GooglePayInterface,
  GooglePayButtonOptions,
} from '@square/web-payments-sdk-types';

// Internals
import { useForm } from '../../contexts';

const defaultProps: GooglePayButtonOptions = {
  buttonColor: 'black',
  buttonSizeMode: 'fill',
  buttonType: 'long',
};

export interface GooglePayProps extends GooglePayButtonOptions {}

/**
 * Renders a Google Pay button to use in the Square Web Payment SDK, pre-styled to meet Google's branding guidelines.
 *
 * **Remember** that you need to set `createPaymentRequest()` in `SquareForm`
 * if you going to use this Payment Method
 *
 * @example
 * ```tsx
 * <SquareForm {...props}>
 *  <GooglePay buttonColor="white" />
 * </SquareForm>
 * ```
 */
export const GooglePay = (props: GooglePayProps): JSX.Element | null => {
  const [googlePay, setGooglePay] = React.useState<
    GooglePayInterface | undefined
  >(() => undefined);
  const {
    cardTokenizeResponseReceived,
    createPaymentRequest,
    payments,
  } = useForm();

  if (!createPaymentRequest) {
    throw new Error(
      '`createPaymentRequest()` is required when using digital wallets'
    );
  }

  /**
   * Handle the on click of the Google Pay button click
   *
   * @param e An event which takes place in the DOM.
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async (e: Event) => {
    e.preventDefault();

    try {
      const result = await googlePay?.tokenize();

      if (result) {
        return cardTokenizeResponseReceived(result);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Avoid re-rendering the component when the google pay is not ready
  const googlePayProps = Object.keys(props).length > 1 ? props : undefined;
  React.useEffect(() => {
    /**
     * Initialize the Google Pay instance to be used in the component
     */
    const start = async () => {
      const paymentRequest = payments?.paymentRequest(createPaymentRequest);
      const googlePay = await payments
        // @ts-ignore - PaymentRequest is defined in the types
        ?.googlePay(paymentRequest)
        .then((res) => {
          setGooglePay(res);

          return res;
        });

      const options = { ...defaultProps, ...googlePayProps };
      await googlePay?.attach('#google-pay-button', options);
    };

    start();
  }, [createPaymentRequest, payments, googlePayProps]);

  useEvent(
    'click',
    handlePayment,
    document.getElementById('google-pay-button')
  );

  return <div id="google-pay-button" style={{ height: 40 }}></div>;
};

export default GooglePay;
