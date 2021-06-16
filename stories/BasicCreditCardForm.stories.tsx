import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CreditCardInput, SquareForm, Props } from '../src/components';

export const Default: Story<Props> = (args) => (
  <SquareForm {...args}>
    <CreditCardInput />
  </SquareForm>
);

export default {
  title: 'Basic Credit Card Form',
  component: SquareForm,
  parameters: {
    controls: { expanded: true },
  },
} as Meta;
