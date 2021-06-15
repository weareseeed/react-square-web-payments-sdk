import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CreditCardInput, SquareForm, Props } from '../src/components';

const meta: Meta = {
  title: 'Welcome',
  component: SquareForm,
  argTypes: {
    applicationId: {
      control: {
        type: 'text',
      },
      defaultValue: 'sandbox-sq0idb-s19cHf7ytO99NeFiS_CyrA',
    },
    locationId: {
      control: {
        type: 'text',
      },
      defaultValue: '4P550BZQ0TQZA',
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = args => (
  <SquareForm {...args}>
    <CreditCardInput />
  </SquareForm>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
