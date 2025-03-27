import { PlaidEventName } from "@square/web-sdk";

export function transformPlaidEventName(name: string) {
  return name.replace(/([A-Z])/g, '_$1').toUpperCase() as PlaidEventName;
}
