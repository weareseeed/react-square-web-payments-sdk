// Vendor Modules
import { Meta, Story } from '@storybook/react';
import * as React from 'react';

// Internals
import {
  AchPayButton,
  CreditCardInput,
  Separator,
  SquarePaymentsForm,
} from '../src';
import type { SquarePaymentsFormProps } from '../src';

export const Default: Story<
  SquarePaymentsFormProps & { accountHolderName: string }
> = ({ accountHolderName, ...args }) => (
  <SquarePaymentsForm {...args}>
    <AchPayButton accountHolderName={accountHolderName} />

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
      defaultValue: {
        summary: '',
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
    methodsSupported: {
      control: {
        type: 'object',
        required: false,
      },
      defaultValue: {
        ach: true,
        card: true,
      },
      type: {
        summary: 'MethodsSupported',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
} as Meta;
