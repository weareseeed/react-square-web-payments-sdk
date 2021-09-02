// Dependencies
import type { Payments } from '@square/web-sdk';

export const paymentsSdk: Payments = {
  ach: jest.fn(),
  applePay: jest.fn(),
  card: jest.fn(),
  cashApp: jest.fn(),
  giftCard: jest.fn(),
  googlePay: jest.fn(),
  paymentRequest: jest.fn(),
  setLocale: jest.fn(),
  verifyBuyer: jest.fn(),
};
