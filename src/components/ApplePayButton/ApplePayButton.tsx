// Vendor Modules
import * as React from 'react';
import { useEvent } from 'react-use';
import type { ApplePay } from '@square/web-sdk';

// Internals
import { useForm } from '@/hooks';
import { renderWithoutSupportPaymentMethod } from '@/utils';
import { ApplePayContainer, ErrorContainer } from './styles';

/**
 * Renders a Apple Pay button to use in the Square Web Payment SDK, pre-styled to meet Apple Pay's branding guidelines.
 *
 * **Remember** that you need to set `createPaymentRequest()` in `SquareForm`
 * if you going to use this Payment Method
 *
 * @example
 * ```tsx
 * <SquareForm {...props}>
 *  <ApplePayButton />
 * </SquareForm>
 * ```
 */
export const ApplePayButton = (): JSX.Element | null => {
  const [aPay, setAPay] = React.useState<ApplePay | undefined>(() => undefined);
  const [error, setError] = React.useState('');
  const {
    applePay,
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
   * Handle the on click of the Apple Pay button click
   *
   * @param e An event which takes place in the DOM.
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async (e: Event) => {
    e.preventDefault();

    try {
      const result = await aPay?.tokenize();

      if (result) {
        return cardTokenizeResponseReceived(result);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * Initialize the Apple Pay instance to be used in the component
   */
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

  if (applePay !== 'ready') {
    renderWithoutSupportPaymentMethod('Apple Pay');

    return null;
  }

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
            <h3>{error}</h3>
          </div>
        </div>
      </ErrorContainer>
    );
  }

  return <ApplePayContainer id="apple-pay-button"></ApplePayContainer>;
};

export default ApplePayButton;
