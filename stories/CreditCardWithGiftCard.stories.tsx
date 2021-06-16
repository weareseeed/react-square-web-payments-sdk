import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  CreditCardInput,
  GiftCardInput,
  Separator,
  SquareForm,
  Props,
} from '../src/components';

export const Default: Story<Props> = (args) => (
  <SquareForm {...args}>
    <GiftCardInput />

    <Separator />

    <CreditCardInput />
  </SquareForm>
);

export default {
  title: 'Credit Card with Gift Card',
  component: SquareForm,
  argTypes: {
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
        card: true,
        giftCard: true,
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
