// Dependencies
import type * as Square from '@square/web-sdk';
import * as React from 'react';

// Internals
import { useForm } from '~/contexts/form';
import type { CashAppPayProps } from './cash-app-pay.types';

function CashAppPay({
  callbacks,
  id = 'rswps-cash-app-pay',
  redirectURL,
  referenceId,
  shape = 'round',
  size = 'medium',
  values = 'dark',
  width = 'static',
  ...props
}: CashAppPayProps) {
  const [cashApp, setCashApp] = React.useState<Square.CashAppPay>();
  const { createPaymentRequest, payments } = useForm();

  const paymentRequestOptions: Square.CashAppPaymentRequestOptions = React.useMemo(
    () => ({
      redirectURL: redirectURL || window.location.href,
      referenceId,
    }),
    [redirectURL, referenceId]
  );

  const options: Square.CashAppPayButtonOptions = React.useMemo(() => {
    const baseOptions = {
      shape,
      size,
      values,
      width,
    };

    // if a value from options is undefined delete it from the options object
    return Object.keys(baseOptions).reduce((acc: Record<string, unknown>, key) => {
      if (baseOptions[key as keyof typeof baseOptions] !== undefined) {
        acc[key as string] = baseOptions[key as keyof typeof baseOptions];
      }

      return acc;
    }, {});
  }, [shape, size, values, width]);

  React.useEffect(() => {
    if (!createPaymentRequest) {
      throw new Error('`createPaymentRequest()` is required when using digital wallets');
    }

    const abortController = new AbortController();
    const { signal } = abortController;
    let cashApp: Square.CashAppPay | undefined;

    const start = async (signal: AbortSignal) => {
      const paymentRequest = payments?.paymentRequest(createPaymentRequest);

      if (!paymentRequest) {
        throw new Error('`paymentRequest` is required when using digital wallets');
      }

      try {
        cashApp = await payments?.cashAppPay(paymentRequest, paymentRequestOptions).then((res) => {
          if (signal?.aborted) {
            return;
          }

          setCashApp(res);

          return res;
        });

        await cashApp?.attach(`#${id}`, options);
      } catch (error) {
        console.error('Initializing Cash App Pay failed', error);
      }
    };

    start(signal);

    return () => {
      abortController.abort();
      cashApp?.destroy();
    };
  }, [createPaymentRequest, options, paymentRequestOptions, payments]);

  if (callbacks) {
    for (const callback of Object.keys(callbacks)) {
      cashApp?.addEventListener(
        callback.toLowerCase() as 'ontokenization',
        (callbacks as Record<string, (event: Square.SqEvent<Square.CashAppPayEventData>) => void>)[callback]
      );
    }
  }

  return <div {...props} id={id} />;
}

export default CashAppPay;
export * from './cash-app-pay.types';
