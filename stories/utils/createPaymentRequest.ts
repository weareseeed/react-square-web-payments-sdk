// Dependencies
import { PaymentRequestOptions } from '@square/web-payments-sdk-types';

export function createPaymentRequestFunction(): PaymentRequestOptions {
  return {
    countryCode: 'US',
    currencyCode: 'USD',
    total: { amount: '1.00', label: 'Total' },
  };
}
