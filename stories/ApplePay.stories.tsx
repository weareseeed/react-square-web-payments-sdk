// Dependencies
import * as React from 'react';
import { Meta, Story } from '@storybook/react';

// Internals
import { ApplePay, SquarePaymentsForm } from '../src';
import { createPaymentRequestFunction, verificationDetails } from './utils';

export const Default: Story = () => (
  <SquarePaymentsForm
    applicationId="sandbox-sq0idb-7KE3zXHZLG_X5EmLLptTYw"
    cardTokenizeResponseReceived={(token, buyer) => {
      console.info({ token, buyer });
    }}
    createPaymentRequest={createPaymentRequestFunction}
    createVerificationDetails={verificationDetails}
    locationId="4P550BZQ0TQZA"
  >
    <ApplePay />
  </SquarePaymentsForm>
);

export default {
  title: 'Apple Pay',
  component: ApplePay,
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
  },
} as Meta;
