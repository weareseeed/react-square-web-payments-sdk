// Vendor Modules
import { Meta, Story } from '@storybook/react';
import * as React from 'react';

// Internals
import {
  ApplePayButton,
  CreditCardInput,
  Separator,
  SquarePaymentsForm,
} from '../src/components';
import { createPaymentRequestFunction } from '../src/utils/storybook';
import type { SquarePaymentsFormProps } from '../src/components';

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

export const Default: Story<SquarePaymentsFormProps> = (args) => (
  <SquarePaymentsForm
    {...args}
    createPaymentRequest={createPaymentRequestFunction}
    methodsSupported={{ applePay: true, card: true }}
  >
    <ApplePayButton />

    <Separator />

    <CreditCardInput />
  </SquarePaymentsForm>
);

export default {
  title: 'Credit Card with Apple Pay',
  component: SquarePaymentsForm,
  argTypes: {
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
    methodsSupported: {
      control: {
        type: 'object',
        required: false,
      },
      defaultValue: {
        applePay: true,
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
