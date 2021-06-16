// Vendor Modules
import * as React from 'react';

// Internals
import { FormContext } from '@/contexts';

export const useForm = () => {
  const context = React.useContext(FormContext);

  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }

  return context;
};
