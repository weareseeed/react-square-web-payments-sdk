// Vendor Modules
import { ApplePay } from '@square/web-payments-sdk-types';
import * as React from 'react';
import { useEvent } from 'react-use';

// Internals
import { useForm } from '../../hooks';
import { ApplePayContainer } from './styles';

/**
 * Renders a Google Pay button to use in the Square Web Payment SDK, pre-styled to meet Google's branding guidelines.
 */
export const ApplePayButton = (): JSX.Element => {
  const [aPay, setAPay] = React.useState<ApplePay | undefined>(() => undefined);
  const { createPaymentRequest, payments } = useForm();

  if (!createPaymentRequest) {
    throw new Error(
      '`createPaymentRequest()` is required when using digital wallets'
    );
  }

  const handlePayment = async (e: Event) => {
    e.preventDefault();

    try {
      const result = await aPay?.tokenize();

      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };

  const start = async () => {
    const paymentRequest = payments?.paymentRequest(
      createPaymentRequest
    ) as PaymentRequest;
    await payments?.applePay(paymentRequest).then((res) => {
      setAPay(res);

      return res;
    });
  };

  React.useEffect(() => {
    start();
  }, [payments]);

  useEvent('click', handlePayment, document.getElementById('apple-pay-button'));

  return <ApplePayContainer id="apple-pay-button"></ApplePayContainer>;
};

export default ApplePayButton;
