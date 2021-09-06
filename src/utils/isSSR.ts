export const isSSR: boolean = !(
  typeof window !== 'undefined' && window.document?.createElement
);
