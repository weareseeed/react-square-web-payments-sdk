// Dependencies
import { PaymentRequestOptions } from '@square/web-payments-sdk-types';

export function createPaymentRequestFunction(): PaymentRequestOptions {
  return {
    countryCode: 'US',
    currencyCode: 'USD',
    lineItems: [
      { amount: '1.23', label: 'Cat', pending: false },
      { amount: '4.56', label: 'Dog', pending: false },
    ],
    requestBillingContact: false,
    requestShippingContact: true,
    shippingContact: {
      addressLines: ['1 Test St', ''],
      city: 'San Francisco',
      countryCode: 'US',
      email: 'test@squareup.com',
      familyName: 'First Name',
      givenName: 'Last Name',
      phone: '+12345678910',
      postalCode: '11111',
      state: 'CA',
    },
    shippingOptions: [
      { amount: '0.00', id: 'FREE', label: 'Free' },
      { amount: '9.99', id: 'XP', label: 'Express' },
    ],
    total: { amount: '5.79', label: 'Total', pending: false },
  };
}
