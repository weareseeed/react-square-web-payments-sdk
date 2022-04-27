// Dependencies
import * as React from 'react';
import { useEventListener } from 'usehooks-ts';
import type * as Square from '@square/web-sdk';

// Internals
import { useForm } from '~/contexts/form';
import { ApplePayContainer } from './apple-pay.styles';
import type { ApplePayProps } from './apple-pay.types';

/**
 * Renders a Apple Pay button to use in the Square Web Payment SDK, pre-styled
 * to meet Apple Pay's branding guidelines.
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
 *       <ApplePay />
 *     </SquareForm>
 *   );
 * }
 * ```
 */
function ApplePay({ id = 'rswps-apple-pay', ...props }: ApplePayProps) {
  const [applePay, setApplePay] = React.useState<Square.ApplePay | undefined>(() => undefined);
  const { cardTokenizeResponseReceived, createPaymentRequest, payments } = useForm();
  const containerRef = React.useRef<HTMLDivElement>(null);

  /**
   * Handle the on click of the Apple Pay button click
   *
   * @param e An event which takes place in the DOM.
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async (e: MouseEvent) => {
    e.preventDefault();

    try {
      const result = await applePay?.tokenize();

      if (result) {
        return cardTokenizeResponseReceived(result);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
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
        await payments?.applePay(paymentRequest).then((res) => {
          if (signal?.aborted) {
            return;
          }

          setApplePay(res);

          return res;
        });
      } catch (error) {
        console.error('Initializing Apple Pay failed', error);
      }
    };

    start(signal);

    return () => {
      abortController.abort();
    };
  }, [createPaymentRequest, payments]);

  useEventListener('click', handlePayment, containerRef);

  return (
    <ApplePayContainer
      {...props}
      // We need to make this styles to be able to use event listener
      css={{
        display: applePay ? 'block' : 'none',
        opacity: applePay ? 1 : 0.5,
        pointerEvents: applePay ? 'auto' : 'none',
        visibility: applePay ? 'visible' : 'hidden',
      }}
      id={id}
      ref={containerRef}
    ></ApplePayContainer>
  );
}

export default ApplePay;
