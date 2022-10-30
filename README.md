# react-square-web-payments-sdk

`react-square-web-payments-sdk` lets you easily create PCI-compliant inputs to accept payments online with the Square Payments API. It supports the following payment methods: credit and debit cards, ACH bank transfers, Apple Pay, Google Pay, and Gift Cards.

<div style={{ textAlign: 'center' }}>

A react wrapper for [Square&apos;s Web Payments SDK](https://developer.squareup.com/docs/web-payments/overview)

[![NPM Version](https://flat.badgen.net/npm/v/react-square-web-payments-sdk)](https://www.npmjs.com/package/react-square-web-payments-sdk)
[![NPM Downloads](https://flat.badgen.net/npm/dm/react-square-web-payments-sdk)](https://www.npmjs.com/package/react-square-web-payments-sdk)
[![NPM Dependents](https://flat.badgen.net/npm/dependents/react-square-web-payments-sdk)](https://www.npmjs.com/package/react-square-web-payments-sdk)
[![Build](https://img.shields.io/github/workflow/status/weareseeed/react-square-web-payments-sdk/CI?style=flat-square)](https://github.com/weareseeed/react-square-web-payments-sdk/actions)
[![Coverage](https://flat.badgen.net/codecov/c/github/react-hookz/web)](https://app.codecov.io/gh/react-hookz/web)
[![Types](https://flat.badgen.net/npm/types/react-square-web-payments-sdk)](https://www.npmjs.com/package/react-square-web-payments-sdk)
[![Tree Shaking](https://flat.badgen.net/bundlephobia/tree-shaking/react-square-web-payments-sdk)](https://bundlephobia.com/result?p=react-square-web-payments-sdk)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-3-blue.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

📄 **[DOCS](https://react-square-payments.weareseeed.com/)**
• ✨ **[CHANGELOG](https://github.com/weareseeed/react-square-web-payments-sdk/releases)**

</div>

## Install

This one is pretty simple, everyone knows what to do:

##### NPM

```shell
npm install react-square-web-payments-sdk
```

##### Yarn

```shell
yarn add react-square-web-payments-sdk
```

## Usage

```tsx
// Dependencies
import * as React from 'react';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';

const MyPaymentForm = () => (
  <PaymentForm
    /**
     * Identifies the calling form with a verified application ID generated from
     * the Square Application Dashboard.
     */
    applicationId="sq0idp-Y0QZQ-Xx-Xx-Xx-Xx"
    /**
     * Invoked when payment form receives the result of a tokenize generation
     * request. The result will be a valid credit card or wallet token, or an error.
     */
    cardTokenizeResponseReceived={(token, buyer) => {
      console.info({ token, buyer });
    }}
    /**
     * This function enable the Strong Customer Authentication (SCA) flow
     *
     * We strongly recommend use this function to verify the buyer and reduce
     * the chance of fraudulent transactions.
     */
    createVerificationDetails={() => ({
      amount: '1.00',
      /* collected from the buyer */
      billingContact: {
        addressLines: ['123 Main Street', 'Apartment 1'],
        familyName: 'Doe',
        givenName: 'John',
        countryCode: 'GB',
        city: 'London',
      },
      currencyCode: 'GBP',
      intent: 'CHARGE',
    })}
    /**
     * Identifies the location of the merchant that is taking the payment.
     * Obtained from the Square Application Dashboard - Locations tab.
     */
    locationId="LID"
  >
    <CreditCard />
  </PaymentForm>
);

export default MyPaymentForm;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Contributors ✨

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/weareseeed/react-square-web-payments-sdk/issues). You can also take a look at the [contributing guide](https://github.com/weareseeed/react-square-web-payments-sdk/blob/main/CONTRIBUTING.md).

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://danestves.com/"><img src="https://avatars.githubusercontent.com/u/31737273?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Daniel Esteves</b></sub></a><br /><a href="https://github.com/weareseeed/react-square-web-payments-sdk/commits?author=danestves" title="Code">💻</a> <a href="https://github.com/weareseeed/react-square-web-payments-sdk/commits?author=danestves" title="Documentation">📖</a> <a href="https://react-square-web-payments-sdk.weareseeed.com/" title="Examples">💡</a> <a href="https://github.com/weareseeed/react-square-web-payments-sdk/commits?author=danestves" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/rsaer"><img src="https://avatars.githubusercontent.com/u/38730951?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rowland Saer</b></sub></a><br /><a href="https://github.com/weareseeed/react-square-web-payments-sdk/commits?author=rsaer" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/WinglessFrame"><img src="https://avatars.githubusercontent.com/u/68775653?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hleb Siamionau</b></sub></a><br /><a href="https://github.com/weareseeed/react-square-web-payments-sdk/commits?author=WinglessFrame" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/gabrielelpidio"><img src="https://avatars.githubusercontent.com/u/30420087?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gabriel De Andrade</b></sub></a><br /><a href="https://github.com/weareseeed/react-square-web-payments-sdk/commits?author=danestves" title="Code">💻</a> <a href="https://github.com/weareseeed/react-square-web-payments-sdk/commits?author=danestves" title="Documentation">📖</a> <a href="https://react-square-web-payments-sdk.weareseeed.com/" title="Examples">💡</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
