// Dependencies
import { Meta, Story } from '@storybook/react';
import * as React from 'react';

// Internals
import { AchPay, CreditCardInput, Separator, SquarePaymentsForm } from '../src';
import type { SquarePaymentsFormProps } from '../src';

export const Default: Story<
  SquarePaymentsFormProps & { accountHolderName: string }
> = ({ accountHolderName, ...args }) => (
  <SquarePaymentsForm {...args}>
    <AchPay accountHolderName={accountHolderName} />

    <Separator />

    <CreditCardInput />
  </SquarePaymentsForm>
);

export default {
  title: 'Credit Card with ACH',
  component: SquarePaymentsForm,
  args: {
    accountHolderName: 'John Doe',
  },
  argTypes: {
    accountHolderName: {
      control: {
        required: true,
        type: 'text',
      },
      description:
        '<b>Required for ACH</b> <br /><br />Given name and surname of the bank account holder',
      type: {
        summary: 'string',
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
} as Meta;
