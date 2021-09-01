// Vendor Modules
import * as React from 'react';
import { useEvent } from 'react-use';
import type {
  GooglePay,
  GooglePayButtonOptions,
} from '@square/web-payments-sdk-types';

// Internals
import { useForm } from '../../contexts';

const defaultProps: GooglePayButtonOptions = {
  buttonColor: 'black',
  buttonSizeMode: 'fill',
  buttonType: 'long',
};

/**
 * Renders a Google Pay button to use in the Square Web Payment SDK, pre-styled to meet Google's branding guidelines.
 *
 * **Remember** that you need to set `createPaymentRequest()` in `SquareForm`
 * if you going to use this Payment Method
 *
 * @example
 * ```tsx
 * <SquareForm {...props}>
 *  <GooglePayButton buttonColor="white" />
 * </SquareForm>
 * ```
 */
export const GooglePayButton = (
  props: GooglePayButtonOptions
): JSX.Element | null => {
  const [gPay, setGPay] = React.useState<GooglePay | undefined>(
    () => undefined
  );
  const {
    cardTokenizeResponseReceived,
    createPaymentRequest,
    enableMethod,
    methods,
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
      const result = await gPay?.tokenize();

      if (result) {
        return cardTokenizeResponseReceived(result);
      }
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    /**
     * Initialize the Google Pay instance to be used in the component
     */
    const start = async () => {
      const paymentRequest = payments.paymentRequest(createPaymentRequest);
      const googlePay = await payments.googlePay(paymentRequest).then((res) => {
        setGPay(res);

        return res;
      });

      const options = { ...defaultProps, ...props };
      await googlePay?.attach('#google-pay-button', options);
    };

    start();
  }, [createPaymentRequest, payments, props]);

  useEvent(
    'click',
    handlePayment,
    document.getElementById('google-pay-button')
  );

  if (methods.googlePay !== 'ready') {
    enableMethod('googlePay');
  }

  return <div id="google-pay-button" style={{ height: 40 }}></div>;
};

export default GooglePayButton;
