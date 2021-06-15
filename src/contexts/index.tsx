// Vendor Modules
import * as Square from '@square/web-sdk';
import { Payments } from '@square/web-payments-sdk-types';
import * as React from 'react';

// Internals
import { ActionMethodReducer, FormContextInterface } from '../@types';
import { INITIAL_STATE_METHODS } from '../constants';
import { methodsReducer } from '../reducers';

/**
 * Internal helper that the `SquareForm` uses to manage internal state and expose access to the Web Payment SDK library.
 *
 * This is available for developers who require more customization over their payment form implementation. Please refer to the
 * [customization](customization.md) page for usage details.
 */
export const FormContext = React.createContext<FormContextInterface>({
  ach: 'loading',
  applePay: 'loading',
  card: 'loading',
  cashApp: 'loading',
  googlePay: 'loading',
  giftCard: 'loading',
  formId: '',
  payments: (null as unknown) as Payments,
  dispatchMethods: (null as unknown) as React.Dispatch<ActionMethodReducer>,
});

const FormProvider: React.FC<{ applicationId: string; locationId: string }> = ({
  children,
  ...props
}) => {
  const [loading, setLoading] = React.useState(() => true);
  const [payments, setPayments] = React.useState<null | Payments>(() => null);
  const [applicationId] = React.useState(() => props.applicationId);
  const [locationId] = React.useState(() => props.locationId);
  const [methods, dispatch] = React.useReducer(
    methodsReducer,
    INITIAL_STATE_METHODS
  );

  const getPaymentInstance = async () => {
    return (Square.payments(applicationId, locationId).then(res => {
      setLoading(false);

      return setPayments(res);
    }) as unknown) as Payments;
  };

  React.useEffect(() => {
    if (applicationId && locationId) {
      getPaymentInstance();
    }
  }, [applicationId, locationId]);

  if (loading) return null;

  const context = {
    ...methods,
    formId: '',
    payments,
    dispatchMethods: dispatch,
  };

  return (
    <FormContext.Provider value={context}>{children}</FormContext.Provider>
  );
};

export default FormProvider;
