// Dependencies
import * as React from 'react';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

const useDynamicCallback = (callback: any) => {
  const ref = React.useRef(callback);

  useIsomorphicLayoutEffect(() => {
    ref.current = callback;
  }, [callback]);

  return React.useCallback((...args: any[]) => ref.current(...args), []);
};

export { useDynamicCallback };
