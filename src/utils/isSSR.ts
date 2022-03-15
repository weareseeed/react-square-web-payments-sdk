export const isSSR = !(
  typeof window !== 'undefined' && window.document?.createElement
)
