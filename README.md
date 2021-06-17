# react-square-web-payments-sdk

<div style="text-align: center;">
  <a href="https://github.com/weareseeed/react-square-web-payments-sdk/actions"><img alt="GitHub branch checks state" src="https://img.shields.io/github/checks-status/weareseeed/react-square-web-payments-sdk/main?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/react-square-web-payments-sdk"><img alt="npm" src="https://img.shields.io/npm/dm/react-square-web-payments-sdk?style=flat-square"></a>
  <a href="https://github.com/weareseeed/react-square-web-payments-sdk/blob/main/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/weareseeed/react-square-web-payments-sdk?style=flat-square"></a>
</div>

React Wrapper for the Web Payments SDK of Square, lets you easily create PCI-compliant inputs to accept payments online with the Square Payments API. It supports the following payment methods: credit and debit cards, ACH bank transfers, Apple Pay, Google Pay, and Gift Cards.

## Installation

[Node.js](https://nodejs.org/en/) is required to make this action.

```bash
# npm
npm i react-square-web-payments-sdk

# yarn
yarn add react-square-web-payments-sdk
```

## Usage

```tsx
// Vendor Modules
import * as React from 'react';
import {
  SquarePaymentsForm,
  CreditCardInput,
} from 'react-square-web-payments-sdk';

const applicationId = '<APPLICATION_ID_FROM_SQUARE_DASHBOARD>';
const locationId = '<LOCATION_ID_FROM_SQUARE_DASHBOARD>';

const MyComponent = () => {
  return (
    <SquarePaymentsForm applicationId={applicationId} locationId={locationId}>
      <CreditCardInput />
    </SquarePaymentsForm>
  );
};

export default MyComponent;
```

## Props

We provide a set of properties to be passed in the `SquarePaymentsForm` and here are some on them:

```tsx
export interface SquarePaymentsFormProps {
  /**
   * **Required for all features**
   *
   * Identifies the calling form with a verified application ID generated from the Square Application Dashboard.
   */
  applicationId: string;
  /**
   * **Required for all features**
   *
   * Identifies the location of the merchant that is taking the payment. Obtained from the Square Application Dashboard - Locations tab.
   */
  locationId: string;
  /** Identifies the DOM form element. */
  formId?: string;
  /** Square payment form components. */
  children?: React.ReactNode;

  /**
   * **Required for all features**
   *
   * Invoked when payment form receives the result of a tokenize generation request. The result will be a valid credit card or wallet token, or an error.
   */
  cardTokenizeResponseReceived: (props: TokenResult) => void;
  /** **Required for digital wallets**
   *
   * Invoked when a digital wallet payment button is clicked.
   */
  createPaymentRequest?: () => PaymentRequestOptions;
  /** **Required for SCA** */
  createVerificationDetails?: () =>
    | ChargeVerifyBuyerDetails
    | StoreVerifyBuyerDetails;
  /** Triggered when the page renders to decide which, if any, digital wallet button should be rendered in the payment form. */
  methodsSupported?: MethodsSupported;
}
```

Most of the components are commented, the interfaces with each of the commented fields also so that you have a better development experience when implementing your payment form anywhere.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://github.com/weareseeed/react-square-web-payments-sdk/blob/main/LICENSE)
