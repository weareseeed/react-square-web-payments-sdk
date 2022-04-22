// Dependencies
import * as React from 'react';
import type * as Square from '@square/web-sdk';

// Internals
import { useDynamicCallback } from '@/hooks/use-dynamic-callback';
import type { FormContextType, FormProviderProps } from '@/types';

/**
 * Internal helper that the `SquareForm` uses to manage internal state and expose access to the Web Payment SDK library.
 *
 * This is available for developers who require more customization over their payment form implementation. Please refer to the
 * [customization](customization.md) page for usage details.
 */
const FormContext = React.createContext<FormContextType>({
  cardTokenizeResponseReceived: null as unknown as () => void,
  createPaymentRequest: null as unknown as Square.PaymentRequestOptions,
  formId: '',
  payments: null as unknown as Square.Payments,
});

function FormProvider({ children, payments, ...props }: FormProviderProps) {
  const [createPaymentRequest] = React.useState<undefined | Square.PaymentRequestOptions>(() =>
    props.createPaymentRequest?.()
  );

  const cardTokenizeResponseReceived = async (rest: Square.TokenResult): Promise<void> => {
    if (rest.errors || !props.createVerificationDetails) {
      props.cardTokenizeResponseReceived(rest);
      return;
    }

    const verifyBuyerResults = await payments?.verifyBuyer(String(rest.token), props.createVerificationDetails());

    props.cardTokenizeResponseReceived(rest, verifyBuyerResults);
  };

  // Fixes stale closure issue with using React Hooks & SqPaymentForm callback functions
  // https://github.com/facebook/react/issues/16956
  const cardTokenizeResponseReceivedCallback = useDynamicCallback(cardTokenizeResponseReceived);

  if (!payments) return null;

  const context = {
    cardTokenizeResponseReceived: cardTokenizeResponseReceivedCallback,
    createPaymentRequest,
    formId: '',
    payments,
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

export { FormContext, FormProvider, useForm };
