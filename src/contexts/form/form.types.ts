// Dependencies
import type * as Square from '@square/web-sdk';

export type FormContextType = {
  /**
   * **Required for all features**
   *
   * Invoked when payment form receives the result of a tokenize generation
   * request. The result will be a valid credit card or wallet token, or an error.
   */
  cardTokenizeResponseReceived: (
    token: Square.TokenResult,
    verifiedBuyer?: Square.VerifyBuyerResponseDetails | null
  ) => Promise<void>;
  /**
   * Returned by `Square.payments(appId, locationId)`.
   *
   * Use this object to instantiate Payment methods.
   *
   * @example
   *
   * ```js
   * const payments = Square.payments(appId, locationId);
   * ```
   */
  payments: Square.Payments | null;
  /**
   * **Required for digital wallets**
   *
   * Invoked when a digital wallet payment button is clicked.
   */
  createPaymentRequest?: Square.PaymentRequestOptions;
  card?: Square.Card;
  setCard: React.Dispatch<React.SetStateAction<Square.Card | undefined>>;
};

export type FormProviderProps = {
  /**
   * Identifies the calling form with a verified application ID generated from
   * the Square Application Dashboard.
   */
  applicationId: string;
  /**
   * Invoked when payment form receives the result of a tokenize generation
   * request. The result will be a valid credit card or wallet token, or an error.
   */
  cardTokenizeResponseReceived: (
    token: Square.TokenResult,
    verifiedBuyer?: Square.VerifyBuyerResponseDetails | null,
    payments?: Square.Payments
  ) => void | Promise<void>;
  children: React.ReactNode;
  /**
   * Identifies the location of the merchant that is taking the payment.
   * Obtained from the Square Application Dashboard - Locations tab.
   */
  locationId: string;
  /**
   * The payments.paymentRequest method argument
   *
   * This object contains the details of a payment request including line items,
   * shipping contact and options, and total payment request.
   *
   * @example
   *
   * ```js
   * () => ({
   *   countryCode: 'US',
   *   currencyCode: 'USD',
   *   lineItems: [
   *     {
   *       amount: '22.15',
   *       label: 'Item to be purchased',
   *       id: 'SKU-12345',
   *       imageUrl: 'https://url-cdn.com/123ABC',
   *       pending: true,
   *       productUrl: 'https://my-company.com/product-123ABC',
   *     },
   *   ],
   *   taxLineItems: [
   *     {
   *       label: 'State Tax',
   *       amount: '8.95',
   *       pending: true,
   *     },
   *   ],
   *   discounts: [
   *     {
   *       label: 'Holiday Discount',
   *       amount: '5.00',
   *       pending: true,
   *     },
   *   ],
   *   requestBillingContact: false,
   *   requestShippingContact: false,
   *   shippingOptions: [
   *     {
   *       label: 'Next Day',
   *       amount: '15.69',
   *       id: '1',
   *     },
   *     {
   *       label: 'Three Day',
   *       amount: '2.00',
   *       id: '2',
   *     },
   *   ],
   *   // pending is only required if it's true.
   *   total: {
   *     amount: '41.79',
   *     label: 'Total',
   *   },
   * });
   * ```
   */
  createPaymentRequest?: () => Square.PaymentRequestOptions;
  /**
   * Can be either a charge or a store.
   *
   * **Charge:** cases in which the buyer is being charged.
   *
   * **Store:** cases in which the card is being stored on file.
   *
   * @example
   *
   * ```js
   * const chargeVerificationDetails = {
   *   amount: '1.00',
   *   currencyCode: 'GBP',
   *   intent: 'CHARGE',
   *   billingContact: {
   *     addressLines: ['123 Main Street', 'Apartment 1'],
   *     familyName: 'Doe',
   *     givenName: 'John',
   *     email: 'jondoe@gmail.com',
   *     country: 'GB',
   *     phone: '3214563987',
   *     region: 'LND',
   *     city: 'London',
   *   },
   * };
   *
   * const storeVerificationDetails = {
   *   intent: 'STORE',
   *   billingContact: {
   *     addressLines: ['123 Main Street', 'Apartment 1'],
   *     familyName: 'Doe',
   *     givenName: 'John',
   *     email: 'jondoe@gmail.com',
   *     country: 'GB',
   *     phone: '3214563987',
   *     region: 'LND',
   *     city: 'London',
   *   },
   * };
   * ```
   */
  createVerificationDetails?: () => Square.ChargeVerifyBuyerDetails | Square.StoreVerifyBuyerDetails;
  /** Override the default payment form configuration. */
  overrides?: {
    /** The URL of the Square payment form script. */
    scriptSrc?: string;
  };
};
