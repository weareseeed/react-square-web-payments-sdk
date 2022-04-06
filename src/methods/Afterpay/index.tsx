// Dependencies
import * as React from 'react'

// Internals
import { useForm } from '../../contexts/FormContext'
import { useEventListener } from '../../hooks/useEventListener'

const defaultProps = {
  buttonColor: 'black',
  finalCtaButtonType: 'fill',
  buttonType: 'checkout_with_afterpay',
}

type AttachableCustomComponent = React.ComponentType<
  { id: string } & React.RefAttributes<any>
>

type AfterpayProps = {
  CustomButton?: AttachableCustomComponent
}

/**
 * Renders a Afterpay button to use in the Square Web Payment SDK. Rendered by default using Afterpay button styling.
 *
 * **Remember** that you need to set `createPaymentRequest()` in `SquareForm`
 * if you going to use this Payment Method
 *
 * @example
 * ```tsx
 * <SquareForm {...props}>
 *  <Afterpay buttonColor="white" />
 * </SquareForm>
 * ```
 */

const AfterpayContext = React.createContext<any>({})

const useAfterpay = () => React.useContext(AfterpayContext)

const AfterpayProvider = ({ children }: React.PropsWithChildren<any>) => {
  const { createPaymentRequest, payments } = useForm()
  const [afterpay, setAfterpay] = React.useState<any | undefined>(
    () => undefined
  )
  if (!createPaymentRequest) {
    throw new Error(
      '`createPaymentRequest()` is required when using digital wallets'
    )
  }

  React.useEffect(() => {
    /**
     * Initialize the Afterpay instance to be used in the component
     */
    const abortController = new AbortController()
    const { signal } = abortController
    const start = async (signal: AbortSignal) => {
      const paymentRequest = payments?.paymentRequest(createPaymentRequest)
      await payments
        // @ts-ignore - PaymentRequest is defined in the types
        ?.afterpayClearpay(paymentRequest)
        .then((res: any) => {
          if (!signal.aborted) {
            setAfterpay(res)

            return res
          }

          return null
        })
      // Await afterpay?.attach('#afterpay-button', options)
    }

    start(signal)

    return () => {
      if (afterpay) {
        afterpay.destroy()
      }
    }
  }, [createPaymentRequest, payments])

  return (
    <AfterpayContext.Provider value={afterpay}>
      {children}
    </AfterpayContext.Provider>
  )
}

/**
 * Renders a Afterpay button to use in the Square Web Payment SDK. Rendered by default using Afterpay button styling.
 * As it is only the button by itself it needs to be
 *
 * **Remember** that you need to set `createPaymentRequest()` in `SquareForm`
 * if you going to use this Payment Method
 *
 * @example
 * ```tsx
 * <SquareForm {...props}>
 *  <AfterpayProvider >
 *   <Afterpay buttonColor="mint" />
 *  </AfterpayProvider>
 * </SquareForm>
 * ```
 */

const AfterpayButton = ({
  CustomButton,
  ...props
}: AfterpayProps): JSX.Element | null => {
  const { cardTokenizeResponseReceived } = useForm()
  const afterpay = useAfterpay()

  const divRef = React.useRef(null)

  /**
   * Handle the on click of the Afterpay button click
   *
   * @param e An event which takes place in the DOM.
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async (e: Event) => {
    e.preventDefault()

    try {
      const result = await afterpay?.tokenize()

      if (result) {
        return cardTokenizeResponseReceived(result)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // Avoid re-rendering the component when the Afterpay is not ready
  const afterpayProps = React.useMemo(
    () => ({
      ...defaultProps,
      ...(Object.keys(props).length > 0 ? props : undefined),
      useCustomButton: Boolean(CustomButton),
    }),
    [props, CustomButton]
  )

  React.useEffect(() => {
    if (afterpay) {
      afterpay.attach('#afterpay-button', {
        ...afterpayProps,
      })
    }

    return () => {
      if (afterpay) {
        afterpay.destroy()
      }
    }
  }, [afterpayProps, afterpay])

  useEventListener({
    listener: handlePayment,
    type: 'click',
    element: divRef,
    options: {
      passive: true,
    },
  })

  if (CustomButton) {
    return (
      <CustomButton id="afterpay-button" ref={divRef} {...props}></CustomButton>
    )
  }

  return (
    <>
      <div id="afterpay-button" ref={divRef}></div>
    </>
  )
}

type AfterpayMessageProps =
  | ({
      CustomMessage: AttachableCustomComponent
      informationalModalOptions: Record<string, any>
    } & Record<string, any>)
  | Record<string, any>

const AfterpayMessage = ({ CustomMessage, ...props }: AfterpayMessageProps) => {
  const afterpay = useAfterpay()
  const divRef = React.useRef(null)
  const customRef = React.useRef(null)
  React.useEffect(() => {
    if (afterpay && !CustomMessage) {
      afterpay.attachMessaging('#afterpay-message', {
        ...props,
      })
    }
  }, [props, afterpay, CustomMessage])

  const handleMessageClick = async (e: Event) => {
    e.preventDefault()
    afterpay.displayInformationModal(props.informationalModalOptions)
  }

  useEventListener({
    listener: handleMessageClick,
    type: 'click',
    element: customRef,
    options: {
      passive: true,
    },
  })

  if (CustomMessage) {
    return (
      <CustomMessage id="#afterpay-message" ref={customRef}></CustomMessage>
    )
  }

  return (
    <>
      <div id="afterpay-message" ref={divRef}></div>
    </>
  )
}

const AfterpayWidget = ({ ...props }: Record<string, any>) => {
  const afterpay = useAfterpay()
  const divRef = React.useRef(null)
  React.useEffect(() => {
    if (afterpay) {
      afterpay.attachCheckoutWidget('#afterpay-widget', {
        ...props,
      })
    }
  }, [props, afterpay])

  return (
    <>
      <div id="afterpay-widget" ref={divRef}></div>
    </>
  )
}

/**
 * Renders a Afterpay button to use in the Square Web Payment SDK. Rendered by default using Afterpay button styling.
 *
 * **Remember** that you need to set `createPaymentRequest()` in `SquareForm`
 * if you going to use this Payment Method
 *
 * @example
 * ```tsx
 * <SquareForm {...props}>
 *  <Afterpay buttonColor="mint" />
 * </SquareForm>
 * ```
 */

const Afterpay = (props: AfterpayProps): JSX.Element | null => (
  <AfterpayProvider>
    <AfterpayButton {...props} />
  </AfterpayProvider>
)

export { AfterpayProvider, AfterpayButton, AfterpayMessage, AfterpayWidget }

export default Afterpay
export type { AfterpayProps, AfterpayMessageProps }
