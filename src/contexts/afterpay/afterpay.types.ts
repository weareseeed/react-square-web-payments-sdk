// Dependencies
import type * as Square from '@square/web-sdk';
import type * as React from 'react';

export type AfterpayProviderProps = {
  children: React.ReactNode;
  /**
   * Occurs when a buyer chooses a shipping address in Afterpay/Clearpay.
   *
   * It is required for you to subscribe to this event if shipping if marked a required.
   *
   * @example
   *
   * ```js
   * (contact) => {
   *   return {
   *     shippingOptions: [
   *       {
   *         id: 'shippingOption1',
   *         label: 'Free Shipping',
   *         amount: '0.00',
   *         total: '27.50', // Line Items + Discounts + Taxes + Shipping
   *         taxLineItems: [
   *           {
   *             id: 'taxItem1',
   *             label: 'Taxes',
   *             amount: '2.50',
   *           },
   *         ],
   *       },
   *       {
   *         id: 'shippingOption2',
   *         label: 'Express Shipping',
   *         amount: '10.00',
   *         total: '38.50', // Line Items + Discounts + Taxes + Shipping
   *         taxLineItems: [
   *           {
   *             id: 'taxItem1',
   *             label: 'Taxes',
   *             amount: '3.50',
   *           },
   *         ],
   *       },
   *     ],
   *   };
   * };
   * ```
   */
  onShippingAddressChange?: Square.AfterpayShippingOptionCallback;
  /**
   * Occurs when a buyer chooses a shipping option in Afterpay/Clearpay.
   *
   * Subscribe to this event if you want to be alerted of shipping options
   * changes. This event if informational only, and does not update the payment request.
   *
   * @example
   *
   * ```js
   * req.addEventListener(
   *   'afterpay_shippingaoptionchanged',
   *   function (option) {
   *     // used for informational purposes only
   *   }
   * );
   * ```
   */
  onShippingOptionChange?: Square.AfterpayShippingOptionCallback;
};
