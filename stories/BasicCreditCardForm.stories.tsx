import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CreditCardInput, SquareForm, Props } from '../src/components';

export const Default: Story<Props> = args => (
  <SquareForm {...args}>
    <CreditCardInput />
  </SquareForm>
);

export default {
  title: 'Basic Credit Card Form',
  component: SquareForm,
  argTypes: {
    applicationId: {
      control: {
        type: 'text',
        required: true,
      },
      defaultValue: '',
      description:
        'Required for all features <br /> Identifies the calling form with a verified application ID generated from the Square Application Dashboard.',
    },
    locationId: {
      control: {
        type: 'text',
        required: true,
      },
      defaultValue: '',
      description:
        'Required for all featuresIdentifies the location of the merchant that is taking the payment. Obtained from the Square Application Dashboard - Locations tab.',
    },
    formId: {
      control: {
        type: 'text',
        required: false,
      },
      defaultValue: '',
      description: 'Identifies the DOM form element.',
    },
  },
  parameters: {
    controls: { expanded: true },
  },
} as Meta;
