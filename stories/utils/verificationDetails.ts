// Dependencies
import {
  ChargeVerifyBuyerDetails,
  StoreVerifyBuyerDetails,
} from '@square/web-payments-sdk-types';

export function verificationDetails():
  | ChargeVerifyBuyerDetails
  | StoreVerifyBuyerDetails {
  return {
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
  };
}
