// Dependencies
import * as React from 'react';
import { payments } from '@square/web-sdk';
import type * as Square from '@square/web-sdk';

// Internals
import { FormProvider } from '@/contexts/form';
import type { PaymentFormProps } from './payment-form.types';

function RenderPaymentForm(
  {
    applicationId,
    cardTokenizeResponseReceived,
    locationId,
    children,
    formId = 'rswps-form',
    overrides,
    ...props
  }: PaymentFormProps,
  ref: React.LegacyRef<HTMLDivElement>
) {
  const [paymentsSdk, setPaymentsSdk] = React.useState<Square.Payments>();

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

        setPaymentsSdk(res);

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

  if (!applicationId || !locationId) {
    return null;
  }

  if (!paymentsSdk) {
    return null;
  }

  return (
    <FormProvider {...props} cardTokenizeResponseReceived={cardTokenizeResponseReceived} payments={paymentsSdk}>
      <div data-testid="rswps-form" id={formId} ref={ref}>
        {children}
      </div>
    </FormProvider>
  );
}

const PaymentForm = React.forwardRef<HTMLDivElement, PaymentFormProps>(RenderPaymentForm);

export default PaymentForm;
export type { PaymentFormProps };
