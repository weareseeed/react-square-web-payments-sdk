import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CreditCardInput, SquareForm, Props } from '../src/components';

export const Default: Story<Props> = (args) => (
  <SquareForm
    {...args}
    cardTokenizeResponseReceived={(props) => {
      console.log(props);
    }}
  >
    <CreditCardInput />
  </SquareForm>
);

export default {
  title: 'Basic Credit Card Form',
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
