export function transformPlaidEventName(name: string) {
  return name.replace(/([A-Z])/g, '_$1').toUpperCase();
}
