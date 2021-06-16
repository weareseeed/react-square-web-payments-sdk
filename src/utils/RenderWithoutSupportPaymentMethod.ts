export const renderWithoutSupportPaymentMethod = (method: string) => {
  console.error(
    `RenderWithoutSupportPaymentMethod: you are trying to render ${method} without enabling it in \`\methodsSupported()\`\.`
  );
};
