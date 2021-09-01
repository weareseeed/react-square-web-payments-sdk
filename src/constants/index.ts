// Internals
import { PaymentMethodState } from '../@types';
import type { InitialStateMethods } from '../@types';

export const INITIAL_STATE_METHODS: InitialStateMethods = {
  ach: PaymentMethodState.LOADING,
  applePay: PaymentMethodState.LOADING,
  card: PaymentMethodState.LOADING,
  cashApp: PaymentMethodState.LOADING,
  googlePay: PaymentMethodState.LOADING,
  giftCard: PaymentMethodState.LOADING,
};

export const METHODS_KEY = Object.keys(INITIAL_STATE_METHODS);
