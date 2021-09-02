// Dependencies
import * as React from 'react';
import useEvent from 'react-use/lib/useEvent';
import type { ApplePay as ApplePayInterface } from '@square/web-sdk';

// Internals
import { useForm } from '../../contexts';
import { ApplePayContainer } from './styles';

/**
 * Renders a Apple Pay button to use in the Square Web Payment SDK, pre-styled to meet Apple Pay's branding guidelines.
 *
 * **Remember** that you need to set `createPaymentRequest()` in `SquareForm`
 * if you going to use this Payment Method
 *
 * @example
 * ```tsx
 * <SquareForm {...props}>
 *  <ApplePay />
 * </SquareForm>
 * ```
 */
export const ApplePay = (): JSX.Element | null => {
  const [applePay, setApplePay] = React.useState<ApplePayInterface | undefined>(
    () => undefined
  );
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
   * Handle the on click of the Apple Pay button click
   *
   * @param e An event which takes place in the DOM.
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async (e: Event) => {
    e.preventDefault();

    try {
      const result = await applePay?.tokenize();

      if (result) {
        return cardTokenizeResponseReceived(result);
      }
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    /**
     * Initialize the Apple Pay instance to be used in the component
     */
    const start = async () => {
      const paymentRequest = payments?.paymentRequest(createPaymentRequest);

      try {
        // @ts-ignore - PaymentRequest is defined in the types
        await payments?.applePay(paymentRequest).then((res) => {
          setApplePay(res);

          return res;
        });
      } catch (error) {
        console.error(error);
      }
    };

    start();
  }, [createPaymentRequest, payments]);

  useEvent('click', handlePayment, document.getElementById('apple-pay-button'));

  if (!applePay) {
    return null;
  }

  return <ApplePayContainer id="apple-pay-button"></ApplePayContainer>;
};

export default ApplePay;
