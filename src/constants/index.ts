// Internals
import { InitialStateMethods } from '../@types';

export const INITIAL_STATE_METHODS: InitialStateMethods = {
  ach: 'loading',
  applePay: 'loading',
  card: 'loading',
  cashApp: 'loading',
  googlePay: 'loading',
  giftCard: 'loading',
};

export const METHODS_KEY = Object.keys(INITIAL_STATE_METHODS);
