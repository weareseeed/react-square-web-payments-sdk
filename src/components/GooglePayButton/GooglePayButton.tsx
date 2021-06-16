// Vendor Modules
import {
  GooglePay,
  GooglePayButtonOptions,
} from '@square/web-payments-sdk-types';
import * as React from 'react';
import { useEvent } from 'react-use';

// Internals
import { useForm } from '../../hooks';

const defaultProps: GooglePayButtonOptions = {
  buttonColor: 'black',
  buttonSizeMode: 'fill',
  buttonType: 'long',
};

/**
 * Renders a Google Pay button to use in the Square Web Payment SDK, pre-styled to meet Google's branding guidelines.
 */
export const GooglePayButton = (props: GooglePayButtonOptions): JSX.Element => {
  const [gPay, setGPay] = React.useState<GooglePay | undefined>(
    () => undefined
  );
  const { createPaymentRequest, payments } = useForm();

  if (!createPaymentRequest) {
    throw new Error(
      '`createPaymentRequest()` is required when using digital wallets'
    );
  }

  const handlePayment = async (e: Event) => {
    e.preventDefault();

    try {
      const result = await gPay?.tokenize();

      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };

  const start = async () => {
    const paymentRequest = payments.paymentRequest(createPaymentRequest);
    const googlePay = await payments.googlePay(paymentRequest).then((res) => {
      setGPay(res);

      return res;
    });

    const options = { ...defaultProps, ...props };
    await googlePay?.attach('#google-pay-button', options);
  };

  React.useEffect(() => {
    start();
  }, [payments]);

  useEvent(
    'click',
    handlePayment,
    document.getElementById('google-pay-button')
  );

  return <div id="google-pay-button" style={{ height: 40 }}></div>;
};

export default GooglePayButton;
