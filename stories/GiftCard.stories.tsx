// Dependencies
import * as React from 'react';
import { Meta, Story } from '@storybook/react';

// Internals
import { GiftCardInput, SquarePaymentsForm } from '../src';
import { GiftCardInputProps } from '../src';
import { verificationDetails } from './utils';

export const Default: Story<GiftCardInputProps> = (args) => (
  <SquarePaymentsForm
    applicationId="sandbox-sq0idb-7KE3zXHZLG_X5EmLLptTYw"
    cardTokenizeResponseReceived={(token, buyer) => {
      console.info({ token, buyer });
    }}
    createVerificationDetails={verificationDetails}
    locationId="4P550BZQ0TQZA"
  >
    <GiftCardInput {...args} />
  </SquarePaymentsForm>
);

export default {
  title: 'Gift Card',
  component: GiftCardInput,
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
  },
} as Meta;
