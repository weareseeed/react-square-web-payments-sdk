// Dependencies
import * as React from 'react';
import { payments } from '@square/web-sdk';
import type * as Square from '@square/web-sdk';

// Internals
import { ErrorScreen } from '~/components/error-screen';
import { useDynamicCallback } from '~/hooks/use-dynamic-callback';
import type { FormContextType, FormProviderProps } from './form.types';

/**
 * Internal helper that the `PaymentForm` uses to manage internal state and
 * expose access to the Web Payment SDK library.
 */
const FormContext = React.createContext<FormContextType>({
  cardTokenizeResponseReceived: null as unknown as () => Promise<void>,
  createPaymentRequest: null as unknown as Square.PaymentRequestOptions,
  payments: null as unknown as Square.Payments,
});

function FormProvider({ applicationId, locationId, children, overrides, ...props }: FormProviderProps) {
  const [instance, setInstance] = React.useState<Square.Payments>();
  const [createPaymentRequest] = React.useState<undefined | Square.PaymentRequestOptions>(() =>
    props.createPaymentRequest?.()
  );

  React.useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    async function loadPayment(signal?: AbortSignal): Promise<void> {
      await payments(applicationId, locationId, overrides).then((res) => {
        if (res === null) {
          throw new Error('Square Web Payments SDK failed to load');
        }

        if (signal?.aborted) {
          return;
        }

        setInstance(res);

        return res;
      });
    }

    if (applicationId && locationId) {
      loadPayment(signal);
    }

    return () => {
      abortController.abort();
    };
  }, [applicationId, locationId]);

  const cardTokenizeResponseReceived = async (rest: Square.TokenResult): Promise<void> => {
    if (rest.errors || !props.createVerificationDetails) {
      await props.cardTokenizeResponseReceived(rest);
      return;
    }

    const verifyBuyerResults = await instance?.verifyBuyer(String(rest.token), props.createVerificationDetails());

    await props.cardTokenizeResponseReceived(rest, verifyBuyerResults);
  };

  // Fixes stale closure issue with using React Hooks & SqPaymentForm callback functions
  // https://github.com/facebook/react/issues/16956
  const cardTokenizeResponseReceivedCallback = useDynamicCallback(cardTokenizeResponseReceived);

  if (!applicationId || !locationId) {
    return <ErrorScreen />;
  }

  if (!instance) return null;

  const context: FormContextType = {
    cardTokenizeResponseReceived: cardTokenizeResponseReceivedCallback,
    createPaymentRequest,
    payments: instance,
  };

  return <FormContext.Provider value={context}>{children}</FormContext.Provider>;
}

const useForm = (): FormContextType => {
  const context = React.useContext(FormContext);

  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }

  return context;
};

export { FormContext, useForm };
export default FormProvider;
