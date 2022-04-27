// Dependencies
import * as React from 'react';
import { useEventListener } from 'usehooks-ts';
import type * as Square from '@square/web-sdk';

// Internals
import { useForm } from '~/contexts/form';
import type { GooglePayProps } from './google-pay.types';

/**
 * Renders a Google Pay button to use in the Square Web Payment SDK, pre-styled
 * to meet Google's branding guidelines.
 *
 * **Remember** that you need to set `createPaymentRequest()` in `SquareForm` if
 * you going to use this Payment Method
 *
 * @example
 *
 * ```tsx
 * function App() {
 *   return (
 *     <SquareForm {...props}>
 *       <GooglePay />
 *     </SquareForm>
 *   );
 * }
 * ```
 */
const GooglePay = ({
  buttonColor,
  buttonSizeMode,
  buttonType,
  id = 'rswps-google-pay-container',
  ...props
}: GooglePayProps): JSX.Element | null => {
  const [googlePay, setGooglePay] = React.useState<Square.GooglePay | undefined>(() => undefined);
  const { cardTokenizeResponseReceived, createPaymentRequest, payments } = useForm();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const options = React.useMemo(
    () => ({
      buttonColor,
      buttonSizeMode,
      buttonType,
    }),
    [buttonColor, buttonSizeMode, buttonType]
  );

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

  React.useEffect(() => {
    if (!createPaymentRequest) {
      throw new Error('`createPaymentRequest()` is required when using digital wallets');
    }

    const abortController = new AbortController();
    const { signal } = abortController;

    const start = async (signal: AbortSignal) => {
      const paymentRequest = payments?.paymentRequest(createPaymentRequest);

      if (!paymentRequest) {
        throw new Error('`paymentRequest` is required when using digital wallets');
      }

      try {
        const gPay = await payments?.googlePay(paymentRequest).then((res) => {
          if (signal?.aborted) {
            return;
          }

          setGooglePay(res);

          return res;
        });

        await gPay?.attach(`#${id}`, options);
      } catch (error) {
        console.error('Initializing Google Pay failed', error);
      }
    };

    start(signal);

    return () => {
      abortController.abort();
    };
  }, [createPaymentRequest, payments, options]);

  useEventListener('click', handlePayment, containerRef);

  return <div style={{ height: 40 }} {...props} id={id} ref={containerRef} />;
};

export default GooglePay;
export * from './google-pay.types';
