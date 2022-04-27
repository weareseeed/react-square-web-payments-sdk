// Dependencies
import * as React from 'react';

// Internals
import { FormProvider } from '~/contexts/form';
import type { PaymentFormProps } from './payment-form.types';

function RenderPaymentForm(
  {
    applicationId,
    cardTokenizeResponseReceived,
    locationId,
    children,
    formProps = {
      'aria-label': 'Payment form',
      id: 'rswps-form',
    },
    overrides,
    ...props
  }: PaymentFormProps,
  ref: React.LegacyRef<HTMLDivElement>
) {
  return (
    <FormProvider
      {...props}
      applicationId={applicationId}
      cardTokenizeResponseReceived={cardTokenizeResponseReceived}
      locationId={locationId}
      overrides={overrides}
    >
      <div data-testid="rswps-form" {...formProps} ref={ref} role="form">
        {children}
      </div>
    </FormProvider>
  );
}

const PaymentForm = React.forwardRef<HTMLDivElement, PaymentFormProps>(RenderPaymentForm);

export default PaymentForm;
export * from './payment-form.types';
