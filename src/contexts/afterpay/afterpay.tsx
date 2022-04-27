// Dependencies
import * as React from 'react';
import type * as Square from '@square/web-sdk';

// Internals
import { useForm } from '../form';
import type { AfterpayProviderProps } from './afterpay.types';

export const AfterpayContext = React.createContext<Square.AfterpayClearpay | null | undefined>(null);

function AfterpayProvider({ children, onShippingAddressChange, onShippingOptionChange }: AfterpayProviderProps) {
  const [afterpay, setAfterpay] = React.useState<Square.AfterpayClearpay | null>(null);
  const { createPaymentRequest, payments } = useForm();

  if (!createPaymentRequest) {
    throw new Error('`createPaymentRequest()` is required when using digital wallets');
  }

  React.useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const start = async (signal: AbortSignal) => {
      const paymentRequest = payments?.paymentRequest(createPaymentRequest);

      if (!paymentRequest) {
        throw new Error('`paymentRequest` is required when using digital wallets');
      }

      if (onShippingAddressChange) {
        paymentRequest.addEventListener('afterpay_shippingaddresschanged', onShippingAddressChange);
      }
      if (onShippingOptionChange) {
        paymentRequest.addEventListener('afterpay_shippingoptionchanged', onShippingOptionChange);
      }

      await payments?.afterpayClearpay(paymentRequest).then((res) => {
        if (!signal.aborted) {
          setAfterpay(res);

          return res;
        }

        return null;
      });
    };

    start(signal);

    return () => {
      if (afterpay) {
        afterpay.destroy();
      }
    };
  }, [createPaymentRequest, payments]);

  return <AfterpayContext.Provider value={afterpay}>{children}</AfterpayContext.Provider>;
}

export function useAfterpay() {
  const context = React.useContext(AfterpayContext);

  if (context === undefined) {
    throw new Error('`useAfterpay()` must be used within an `<AfterpayProvider>`');
  }

  return context;
}

export default AfterpayProvider;
