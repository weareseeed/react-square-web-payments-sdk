// Vendor Modules
import { MethodType } from '@square/web-payments-sdk-types';

export type InitialStateMethods = Record<MethodType, "loading" | "ready" | "unavailable">

export type Methods = keyof { [M in keyof typeof MethodType as `${typeof MethodType[M]}`]: M };

export type ActionMethodReducer = {
  type: "CHANGE_STATE",
  payload: Record<MethodType, "loading" | "ready" | "unavailable">[]
}