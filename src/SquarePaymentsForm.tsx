// Dependencies
import * as React from 'react'
import { payments } from '@square/web-sdk'
import type * as Square from '@square/web-sdk'

// Internals
import { FormProvider } from './contexts/FormContext'
import ErrorScreen from './components/ErrorScreen'

interface SquarePaymentsFormProps {
  /**
   * **Required for all features**
   *
   * Identifies the calling form with a verified application ID generated from the Square Application Dashboard.
   */
  applicationId: string
  /**
   * **Required for all features**
   *
   * Identifies the location of the merchant that is taking the payment. Obtained from the Square Application Dashboard - Locations tab.
   */
  locationId: string
  /** Identifies the DOM form element. */
  formId?: string
  /** Square payment form components. */
  children?: React.ReactNode

  /**
   * **Required for all features**
   *
   * Invoked when payment form receives the result of a tokenize generation request. The result will be a valid credit card or wallet token, or an error.
   */
  cardTokenizeResponseReceived: (
    props: Square.TokenResult,
    verifiedBuyer?: Square.VerifyBuyerResponseDetails | null
  ) => void
  /** **Required for digital wallets**
   *
   * Invoked when a digital wallet payment button is clicked.
   */
  createPaymentRequest?: () => Square.PaymentRequestOptions
  /** **Required for SCA** */
  createVerificationDetails?: () =>
    | Square.ChargeVerifyBuyerDetails
    | Square.StoreVerifyBuyerDetails
  /**
   * Override the default payment form configuration.
   *
   * Supported overrides:
   *
   * - **`scriptSrc`**: The URL of the Square payment form script.
   */
  overrides?: {
    scriptSrc?: string
  }
}

const SquarePaymentsForm = ({
  applicationId,
  locationId,
  formId = 'web-payment-sdk-form',
  overrides,
  ...props
}: SquarePaymentsFormProps): React.ReactElement | null => {
  const [paymentsSdk, setPaymentsSdk] = React.useState<Square.Payments>()

  React.useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController
    async function loadPayment(signal?: AbortSignal): Promise<void> {
      await payments(applicationId, locationId, overrides).then((res) => {
        if (res === null) {
          throw new Error('Square Web Payments SDK failed to load')
        }

        if (signal?.aborted) {
          return
        }

        setPaymentsSdk(res)

        return res
      })
    }

    if (applicationId && locationId) {
      loadPayment(signal)
    }

    return () => {
      abortController.abort()
    }
  }, [applicationId, locationId])

  if (!applicationId || !locationId) {
    return <ErrorScreen />
  }

  if (!paymentsSdk) {
    return null
  }

  return (
    <FormProvider
      cardTokenizeResponseReceived={props.cardTokenizeResponseReceived}
      createPaymentRequest={props.createPaymentRequest}
      createVerificationDetails={props.createVerificationDetails}
      payments={paymentsSdk}
    >
      <div data-testid="rswps-form" id={formId}>
        {props.children}
      </div>
    </FormProvider>
  )
}

export default SquarePaymentsForm
export type { SquarePaymentsFormProps }
