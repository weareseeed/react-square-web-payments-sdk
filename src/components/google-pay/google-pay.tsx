// Dependencies
import * as React from 'react';
import * as Square from '@square/web-sdk';

// Internals
import { useForm } from '~/contexts/form';
import { useEventListener } from '~/hooks/use-event-listener';
import { ButtonLoader } from './google-pay.styles';
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
  buttonSizeMode = 'fill',
  buttonType = 'long',
  id = 'rswps-google-pay-container',
  ...props
}: GooglePayProps): JSX.Element | null => {
  const [googlePay, setGooglePay] = React.useState<Square.GooglePay | undefined>(() => undefined);
  const { cardTokenizeResponseReceived, createPaymentRequest, payments } = useForm();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const options: Square.GooglePayButtonOptions = React.useMemo(() => {
    const baseOptions = {
      buttonColor,
      buttonSizeMode,
      buttonType,
    };

    // if a value from options is undefined delete it from the options object
    return Object.keys(baseOptions).reduce((acc: Record<string, unknown>, key) => {
      if (baseOptions[key as keyof typeof baseOptions] !== undefined) {
        acc[key as string] = baseOptions[key as keyof typeof baseOptions];
      }

      return acc;
    }, {});
  }, [buttonColor, buttonSizeMode, buttonType]);

  /**
   * Handle the on click of the Google Pay button click
   *
   * @param e An event which takes place in the DOM.
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async (e: Event) => {
    e.stopPropagation();

    if (!googlePay) {
      console.warn('Google Pay button was clicked, but no Google Pay instance was found.');

      return;
    }

    try {
      const result = await googlePay.tokenize();

      if (result.status === Square.TokenStatus.OK) {
        return cardTokenizeResponseReceived(result);
      }

      let message = `Tokenization failed with status: ${result.status}`;
      if (result?.errors) {
        message += ` and errors: ${JSON.stringify(result?.errors)}`;

        throw new Error(message);
      }

      console.warn(message);
    } catch (error) {
      console.error(error);
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

  useEventListener({
    listener: handlePayment,
    type: 'click',
    element: containerRef,
    options: {
      passive: true,
    },
  });

  return (
    <div {...props} id={id} ref={containerRef}>
      {!googlePay ? <ButtonLoader /> : null}
    </div>
  );
};

export default GooglePay;
export * from './google-pay.types';
