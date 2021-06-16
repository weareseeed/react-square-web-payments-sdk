// Vendor Modules
import * as React from 'react';
import { useEvent } from 'react-use';
import type { ApplePay } from '@square/web-sdk';

// Internals
import { useForm } from '../../hooks';
import { ApplePayContainer, ErrorContainer } from './styles';

/**
 * Renders a Apple Pay button to use in the Square Web Payment SDK, pre-styled to meet Apple Pay's branding guidelines.
 */
export const ApplePayButton = (): JSX.Element => {
  const [aPay, setAPay] = React.useState<ApplePay | undefined>(() => undefined);
  const [error, setError] = React.useState('');
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
    const paymentRequest = payments.paymentRequest(createPaymentRequest);

    try {
      await payments?.applePay(paymentRequest).then((res) => {
        setAPay(res);

        return res;
      });
    } catch (error) {
      console.error(error);

      if (error.name === 'PaymentMethodUnsupportedError') {
        setError('Apple Pay is not supported in this browser');
      }
    }
  };

  React.useEffect(() => {
    start();
  }, [payments]);

  useEvent('click', handlePayment, document.getElementById('apple-pay-button'));

  if (error) {
    return (
      <ErrorContainer>
        <div className="flex">
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="text-container">
            <h3 className="text-sm font-medium text-red-800">{error}</h3>
          </div>
        </div>
      </ErrorContainer>
    );
  }

  return <ApplePayContainer id="apple-pay-button"></ApplePayContainer>;
};

export default ApplePayButton;
