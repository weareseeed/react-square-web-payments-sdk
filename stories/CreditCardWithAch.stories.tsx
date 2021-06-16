import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  AchPayButton,
  CreditCardInput,
  Separator,
  SquareForm,
  Props,
} from '../src/components';

export const Default: Story<Props & { accountHolderName: string }> = ({
  accountHolderName,
  ...args
}) => (
  <SquareForm {...args}>
    <AchPayButton accountHolderName={accountHolderName} />

    <Separator />

    <CreditCardInput />
  </SquareForm>
);

export default {
  title: 'Credit Card with ACH',
  component: SquareForm,
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
  },
  parameters: {
    controls: { expanded: true },
  },
} as Meta;
