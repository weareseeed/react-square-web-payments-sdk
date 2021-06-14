// Vendor Modules
import * as React from 'react';

export const useDynamicCallback = (callback: any) => {
  const ref = React.useRef(callback);

  React.useLayoutEffect(() => {
    ref.current = callback;
  }, [callback]);

  return React.useCallback((...args) => ref.current(...args), []);
};

export default useDynamicCallback;
