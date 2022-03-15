// Dependencies
import * as React from 'react'

// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect because we want
// `connect` to perform sync updates to a ref to save the latest props after
// a render is actually committed to the DOM.
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

const useDynamicCallback = (callback: any) => {
  const ref = React.useRef(callback)

  useIsomorphicLayoutEffect(() => {
    ref.current = callback
  }, [callback])

  return React.useCallback((...args) => ref.current(...args), [])
}

export { useDynamicCallback }
