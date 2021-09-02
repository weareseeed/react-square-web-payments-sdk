// Dependencies
import * as React from 'react';
import { Meta, Story } from '@storybook/react';

// Internals
import { AchPay, SquarePaymentsForm } from '../src';
import { verificationDetails } from './utils';
import type { AchPayProps } from '../src';

export const Default: Story<AchPayProps> = ({ ...args }) => (
  <SquarePaymentsForm
    applicationId="sandbox-sq0idb-7KE3zXHZLG_X5EmLLptTYw"
    cardTokenizeResponseReceived={(token, buyer) => {
      console.info({ token, buyer });
    }}
    createVerificationDetails={verificationDetails}
    locationId="4P550BZQ0TQZA"
  >
    <AchPay {...args} />
  </SquarePaymentsForm>
);

export default {
  title: 'ACH',
  component: AchPay,
  args: {
    accountHolderName: 'John Doe',
  },
  argTypes: {
    accountHolderName: {
      description:
        '<b>Required for ACH</b> <br /><br />Given name and surname of the bank account holder',
    },
  },
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
  },
} as Meta;
