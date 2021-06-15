// Internals
import { InitialStateMethods } from '../@types';

export const INITIAL_STATE_METHODS: InitialStateMethods = {
  'Apple Pay': 'loading',
  'Cash App': 'loading',
  'Gift Card': 'loading',
  'Google Pay': 'loading',
  ACH: 'loading',
  Card: 'loading',
};

export const METHODS_KEY = Object.keys(INITIAL_STATE_METHODS);
