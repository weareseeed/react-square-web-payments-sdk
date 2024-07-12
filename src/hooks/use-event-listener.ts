// Dependencies
import * as React from 'react';

export const getRefElement = <T extends object>(
  element?: React.RefObject<Element> | T | null
): Element | T | undefined | null | React.RefObject<Element> => {
  if (element && 'current' in element) {
    return element.current;
  }

  return element;
};

const isSsr = !(typeof window !== 'undefined' && window.document?.createElement);

type UseEventListenerProps = {
  type: keyof WindowEventMap;
  listener: EventListener;
  element?: React.RefObject<Element> | HTMLElement | Document | Window | null;
  options?: AddEventListenerOptions;
};

function useEventListener({ type, listener, element = isSsr ? undefined : window, options }: UseEventListenerProps) {
  const savedListener = React.useRef<EventListener>();

  React.useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  const handleEventListener = React.useCallback((event: Event) => {
    savedListener.current?.(event);
  }, []);

  React.useEffect(() => {
    const target = getRefElement(element) as unknown as Element;

    target?.addEventListener(type, handleEventListener, options);

    return () => target?.removeEventListener(type, handleEventListener);
  }, [type, element, options, handleEventListener]);
}

export { useEventListener };
export type { UseEventListenerProps };
