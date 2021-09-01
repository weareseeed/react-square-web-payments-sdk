// Dependencies
import { payments, VerifyBuyerResponseDetails } from '@square/web-sdk';
import * as React from 'react';
import type {
  ChargeVerifyBuyerDetails,
  Payments,
  PaymentRequestOptions,
  StoreVerifyBuyerDetails,
  TokenResult,
} from '@square/web-sdk';

// Internals
import NoLocationIdOrAppId from '../components/NoLocationIdOrAppId/NoLocationIdOrAppId';
import { useDynamicCallback } from '../hooks';
import type { FormContextInterface } from '../@types';

/**
 * Export the hook here so we avoid circular dependency
 */
export const useForm = (): FormContextInterface => {
  const context = React.useContext(FormContext);

  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }

  return context;
};

/**
 * Internal helper that the `SquareForm` uses to manage internal state and expose access to the Web Payment SDK library.
 *
 * This is available for developers who require more customization over their payment form implementation. Please refer to the
 * [customization](customization.md) page for usage details.
 */
export const FormContext = React.createContext<FormContextInterface>({
  cardTokenizeResponseReceived: (null as unknown) as (
    token: TokenResult,
    verifiedBuyer?: VerifyBuyerResponseDetails | null
  ) => void,
  createPaymentRequest: (null as unknown) as PaymentRequestOptions,
  formId: '',
  payments: (null as unknown) as Payments,
});

interface ProviderProps {
  applicationId: string;
  locationId: string;
  createPaymentRequest?: () => PaymentRequestOptions;
  cardTokenizeResponseReceived: (
    token: TokenResult,
    verifiedBuyer?: VerifyBuyerResponseDetails | null
  ) => void;
  createVerificationDetails?: () =>
    | ChargeVerifyBuyerDetails
    | StoreVerifyBuyerDetails;
}

const FormProvider: React.FC<ProviderProps> = ({ children, ...props }) => {
  const [applicationId] = React.useState(() => props.applicationId);
  const [locationId] = React.useState(() => props.locationId);
  const [pay, setPay] = React.useState<Payments>();
  const [createPaymentRequest] = React.useState<
    undefined | PaymentRequestOptions
  >(() => props.createPaymentRequest?.());

  const cardTokenizeResponseReceived = async (
    rest: TokenResult
  ): Promise<void> => {
    if (rest.errors || !props.createVerificationDetails) {
      props.cardTokenizeResponseReceived(rest);
      return;
    }

    const verifyBuyerResults = await pay?.verifyBuyer(
      String(rest.token),
      props.createVerificationDetails()
    );

    props.cardTokenizeResponseReceived(rest, verifyBuyerResults);
    return;
  };

  // Fixes stale closure issue with using React Hooks & SqPaymentForm callback functions
  // https://github.com/facebook/react/issues/16956
  const cardTokenizeResponseReceivedCallback = useDynamicCallback(
    cardTokenizeResponseReceived
  );

  React.useEffect(() => {
    async function loadPayment(): Promise<void> {
      await payments(applicationId, locationId).then((res) => {
        if (res === null) {
          throw new Error('Square Web Payments SDK failed to load');
        }

        setPay(res);

        return res;
      });
    }

    loadPayment();
  }, [applicationId, locationId]);

  if (!applicationId || !locationId) {
    return <NoLocationIdOrAppId />;
  }

  if (!pay) {
    return null;
  }

  const context = {
    cardTokenizeResponseReceived:
      // @ts-ignore: Always true error
      props.cardTokenizeResponseReceived &&
      cardTokenizeResponseReceivedCallback,
    createPaymentRequest,
    formId: '',
    payments: pay,
  };

  return (
    <FormContext.Provider value={context}>{children}</FormContext.Provider>
  );
};

export default FormProvider;
