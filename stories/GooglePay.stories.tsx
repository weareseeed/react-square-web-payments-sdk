// Dependencies
import * as React from 'react';
import { Meta, Story } from '@storybook/react';

// Internals
import { GooglePay, SquarePaymentsForm } from '../src';
import {
  createPaymentRequestFunction,
  verificationDetails,
} from '../src/utils/storybook';
import type { GooglePayProps } from '../src';

export const Default: Story<GooglePayProps> = (args) => (
  <SquarePaymentsForm
    applicationId="sandbox-sq0idb-7KE3zXHZLG_X5EmLLptTYw"
    cardTokenizeResponseReceived={(token, buyer) => {
      console.info({ token, buyer });
    }}
    createPaymentRequest={createPaymentRequestFunction}
    createVerificationDetails={verificationDetails}
    locationId="4P550BZQ0TQZA"
  >
    <GooglePay {...args} />
  </SquarePaymentsForm>
);

export default {
  title: 'Google Pay',
  component: GooglePay,
  args: {
    buttonColor: 'black',
    buttonSizeMode: 'fill',
    buttonType: 'long',
  },
  argTypes: {
    buttonColor: {
      control: {
        type: 'select',
        required: false,
      },
      description: `Set the button background color to black or white. <br /> <br /> For more details about the available options, see [GooglePayButtonColor](https://developer.squareup.com/reference/sdks/web/payments/enums/GooglePayButtonColor)`,
      options: ['default', 'black', 'white'],
      table: {
        defaultValue: {
          summary: `black`,
        },
      },
    },
    buttonSizeMode: {
      control: {
        type: 'select',
        required: false,
      },
      description:
        'Set fitting mode to dynamically size button or fixed size. <br /> <br /> For more details about the available options, see [GooglePayButtonSizeMode](https://developer.squareup.com/reference/sdks/web/payments/enums/GooglePayButtonSizeMode)',
      options: ['static', 'fill'],
      table: {
        defaultValue: {
          summary: `fill`,
        },
      },
    },
    buttonType: {
      control: {
        type: 'select',
        required: false,
      },
      description:
        'Render a long or short button. <br /> <br /> For more details about the available options, see [GooglePayButtonType](https://developer.squareup.com/reference/sdks/web/payments/enums/GooglePayButtonType)',
      options: ['long', 'short'],
      table: {
        defaultValue: {
          summary: `long`,
        },
      },
    },
  },
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
  },
} as Meta;
