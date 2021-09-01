// Dependencies
import { Meta, Story } from '@storybook/react';
import * as React from 'react';

// Internals
import {
  CreditCardInput,
  GiftCardInput,
  Separator,
  SquarePaymentsForm,
} from '../src';
import type { SquarePaymentsFormProps } from '../src';

export const Default: Story<SquarePaymentsFormProps> = (args) => (
  <SquarePaymentsForm {...args}>
    <GiftCardInput />

    <Separator />

    <CreditCardInput />
  </SquarePaymentsForm>
);

export default {
  title: 'Credit Card with Gift Card',
  component: SquarePaymentsForm,
  argTypes: {
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
