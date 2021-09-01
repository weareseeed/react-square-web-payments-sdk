// Vendor Modules
import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import type { GooglePayButtonOptions } from '@square/web-sdk';

// Internals
import {
  CreditCardInput,
  GooglePayButton,
  Separator,
  SquarePaymentsForm,
} from '../src';
import { createPaymentRequestFunction } from '../src/utils/storybook';
import type { SquarePaymentsFormProps } from '../src';

const buttonColorTypeDetails = `
  /** The background color of the Google Pay button */
  declare enum GooglePayButtonColor {
      /** Black background is set by default */
      DEFAULT = "default",
      /** Black background */
      BLACK = "black",
      /** White background */
      WHITE = "white"
  }

  /**
   * Union of [GooglePayButtonColor](https://developer.squareup.com/reference/sdks/web/payments/enums/GooglePayButtonColor) values.
   */
  declare type GooglePayButtonColorValues = \`\${GooglePayButtonColor}\`\;
`;
const buttonTypeDetails = `
  /**
   * The Google Pay button width choices
   */
  declare enum GooglePayButtonType {
      /** Render a long version of the Google Pay button */
      LONG = "long",
      /** Render the short version */
      SHORT = "short"
  }
  /**
   * Union of [GooglePayButtonType](https://developer.squareup.com/reference/sdks/web/payments/enums/GooglePayButtonType) values.
   */
  declare type GooglePayButtonTypeValues = \`\${GooglePayButtonType}\`\;
`;
const buttonSizeModeTypeDetails = `
  /**
   * The sizing method used by the SDK to set the size of the Google Pay button
   * when rendered
   */
  declare enum GooglePayButtonSizeMode {
      /** Set rendered size to value set in code */
      STATIC = "static",
      /** Set rendered size to a percent of form size */
      FILL = "fill"
  }

  /**
   * Union of [GooglePayButtonSizeMode](https://developer.squareup.com/reference/sdks/web/payments/enums/GooglePayButtonSizeMode) values.
   */
  declare type GooglePayButtonSizeModeValues = \`\${GooglePayButtonSizeMode}\`\;
`;
const createPaymentRequestTypeDetails = `
 The payments.paymentRequest method argument

 This object contains the details of a payment request including line items,
 shipping contact and options, and total payment request.

 Why we use a function?
 Because if you need to call all the data in an async mode,
 we call the function and get the data

 @example
 function createPaymentRequest() {
  return {
    "countryCode": "US",
    "currencyCode": "USD",
    "lineItems": [
      {
        "label": "Shipping charges",
        "amount": "15.69",
        "pending": true
      }
    ],
    "requestBillingContact": false,
    "requestShippingContact": false,
    "shippingOptions"[
      {
        "label": "Next Day",
        "amount": "15.69",
        "id": "1"
      },
      {
        "label": "Three Day",
        "amount": "2.00",
        "id": "2"
      }
    ],
    // pending is only required if it's true.
    "total": {
      "amount": "100.00",
      "label": "Total",
    },
  }
 }
`;

export const Default: Story<
  SquarePaymentsFormProps & GooglePayButtonOptions
> = ({ buttonColor, ...args }) => (
  <SquarePaymentsForm
    {...args}
    createPaymentRequest={createPaymentRequestFunction}
  >
    <GooglePayButton buttonColor={buttonColor} />

    <Separator />

    <CreditCardInput />
  </SquarePaymentsForm>
);

export default {
  title: 'Credit Card with Google Pay',
  component: SquarePaymentsForm,
  args: {
    buttonColor: 'default',
    buttonSizeMode: 'fill',
    buttonType: 'long',
  },
  argTypes: {
    buttonColor: {
      control: {
        type: 'select',
        options: ['default', 'black', 'white'],
        required: false,
      },
      defaultValue: { summary: 'default' },
      description:
        'Set the button background color to black or white. <br /> <br /> For more details about the available options, see [GooglePayButtonColor](https://developer.squareup.com/reference/sdks/web/payments/enums/GooglePayButtonColor)',
      name: 'buttonColor',
      table: {
        category: 'Google Pay Button Args',
      },
      type: {
        summary: 'GooglePayButtonColorValues',
        detail: buttonColorTypeDetails,
      },
    },
    buttonSizeMode: {
      control: {
        type: 'select',
        options: ['static', 'fill'],
        required: false,
      },
      defaultValue: { summary: 'fill' },
      description:
        'Set fitting mode to dynamically size button or fixed size. <br /> <br /> For more details about the available options, see [GooglePayButtonSizeMode](https://developer.squareup.com/reference/sdks/web/payments/enums/GooglePayButtonSizeMode)',
      name: 'buttonSizeMode',
      table: {
        category: 'Google Pay Button Args',
      },
      type: {
        summary: 'GooglePayButtonSizeModeValues',
        detail: buttonSizeModeTypeDetails,
      },
    },
    buttonType: {
      control: {
        type: 'select',
        options: ['long', 'short'],
        required: false,
      },
      defaultValue: { summary: 'long' },
      description:
        'Render a long or short button. <br /> <br /> For more details about the available options, see [GooglePayButtonType](https://developer.squareup.com/reference/sdks/web/payments/enums/GooglePayButtonType)',
      name: 'buttonType',
      table: {
        category: 'Google Pay Button Args',
      },
      type: {
        summary: 'GooglePayButtonTypeValues',
        detail: buttonTypeDetails,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    createPaymentRequest: {
      defaultValue: {
        summary: `undefined | (() => PaymentRequestOptions)`,
        detail: createPaymentRequestTypeDetails,
      },
      type: {
        summary: '(() => PaymentRequestOptions)',
        detail: createPaymentRequestTypeDetails,
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
} as Meta;
