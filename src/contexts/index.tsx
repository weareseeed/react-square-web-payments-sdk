// Vendor Modules
import * as React from 'react';

// Internals
import { InitialStateMethods } from '../@types';

export interface ContextInterface extends InitialStateMethods {
  /** Unique form ID */
  formId?: string;
}

/**
 * Internal helper that the `SquareForm` uses to manage internal state and expose access to the Web Payment SDK library.
 *
 * This is available for developers who require more customization over their payment form implementation. Please refer to the
 * [customization](customization.md) page for usage details.
 */
export const FormContext = React.createContext({
  ach: 'loading',
  applePay: 'loading',
  card: 'loading',
  cashApp: 'loading',
  googlePay: 'loading',
  giftCard: 'loading',
  formId: '',
});

export default FormContext;
