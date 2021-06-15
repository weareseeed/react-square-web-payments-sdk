import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CreditCardInput, SquareForm, Props } from '../src/components';

const meta: Meta = {
  title: 'Basic Form',
  component: SquareForm,
  argTypes: {
    applicationId: {
      control: {
        type: 'text',
      },
    },
    locationId: {
      control: {
        type: 'text',
      },
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
