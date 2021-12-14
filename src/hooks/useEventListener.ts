// Dependencies
import * as React from 'react'

// Internals
import { getRefElement, isSSR } from '../utils'

interface UseEventListener {
  type: keyof WindowEventMap
  listener: EventListener
  element?: React.RefObject<Element> | HTMLElement | Document | Window | null
  options?: AddEventListenerOptions
}

const useEventListener = ({
  type,
  listener,
  element = isSSR ? undefined : window,
  options,
}: UseEventListener): void => {
  const savedListener = React.useRef<EventListener>()

  React.useEffect(() => {
    savedListener.current = listener
  }, [listener])

  const handleEventListener = React.useCallback((event: Event) => {
    savedListener.current?.(event)
  }, [])

  React.useEffect(() => {
    const target = getRefElement(element) as unknown as Element

    target?.addEventListener(type, handleEventListener, options)

    return () => target?.removeEventListener(type, handleEventListener)
  }, [type, element, options, handleEventListener])
}

export { useEventListener }
export type { UseEventListener }
