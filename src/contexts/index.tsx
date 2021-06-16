// Vendor Modules
import * as Square from '@square/web-sdk';
import {
  Payments,
  PaymentRequestOptions,
} from '@square/web-payments-sdk-types';
import * as React from 'react';

// Internals
import {
  ActionMethodReducer,
  FormContextInterface,
  MethodsSupported,
} from '../@types';
import { LoadingForm, NoLocationIdOrAppId } from '../components';
import { INITIAL_STATE_METHODS, METHODS_KEY } from '../constants';
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
  createPaymentRequest: (null as unknown) as PaymentRequestOptions,
});

interface ProviderProps {
  applicationId: string;
  locationId: string;
  createPaymentRequest?: () => PaymentRequestOptions;
  methodsSupported?: MethodsSupported;
}

const FormProvider: React.FC<ProviderProps> = ({ children, ...props }) => {
  const [loading, setLoading] = React.useState(() => true);
  const [payments, setPayments] = React.useState<null | Payments>(() => null);
  const [applicationId] = React.useState(() => props.applicationId);
  const [locationId] = React.useState(() => props.locationId);
  const [createPaymentRequest] = React.useState<
    undefined | PaymentRequestOptions
  >(() => props.createPaymentRequest?.());
  const [methods, dispatch] = React.useReducer(
    methodsReducer,
    INITIAL_STATE_METHODS
  );

  /**
   * Helper function to update the state of the form and retreive the available methods
   *
   * @param methods The methods that you want to support
   */
  const methodsSupported = (
    methods: MethodsSupported = props.methodsSupported || {
      card: true,
    }
  ): void => {
    const keys = Object.keys(methods);

    const res = keys.reduce(
      (acc, method) => ({
        ...acc,
        [method]: METHODS_KEY.includes(method) ? 'ready' : 'unavailable',
      }),
      {}
    );

    dispatch({
      type: 'CHANGE_STATE',
      // @ts-ignore
      payload: res,
    });
  };

  const getPaymentInstance = async () => {
    methodsSupported();

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

  const context = {
    ...methods,
    formId: '',
    payments,
    dispatchMethods: dispatch,
    createPaymentRequest,
  };

  if (!applicationId || !locationId) {
    return <NoLocationIdOrAppId />;
  }

  if (loading) {
    return <LoadingForm />;
  }

  return (
    <FormContext.Provider value={context}>{children}</FormContext.Provider>
  );
};

export default FormProvider;
