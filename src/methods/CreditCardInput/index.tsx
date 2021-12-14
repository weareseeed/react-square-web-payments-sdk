// Dependencies
import * as React from 'react'
import type * as Square from '@square/web-sdk'
import type * as Stitches from '@stitches/react'

// Internals
import { LoadingCard, PayButton } from './styles'
import { useForm } from '../../contexts/FormContext'
import { useEventListener } from '../../hooks/useEventListener'

type PayButtonProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'aria-disabled' | 'disabled' | 'id' | 'type'
> & {
  css?: Stitches.ComponentProps<typeof PayButton>['css']
}

type CreditCardInputChildren = {
  Button: (props?: PayButtonProps) => React.ReactElement
}

interface CreditCardInputProps extends Square.CardOptions {
  /**
   * Callback function that is called when the payment form detected a new likely credit card brand
   * based on the card number.
   */
  cardBrandChanged?(event: Square.SqEvent<Square.CardInputEvent>): void
  /**
   * The ID of the element that the credit card input should be rendered into.
   */
  cardContainerId?: string
  /**
   * Make it possible to put any component inside. If children is/are given then text is not applied
   */
  children?: (
    props: CreditCardInputChildren
  ) => React.ReactElement | React.ReactNode
  /**
   * Callback function that is called when a form field has an invalid value,
   * and the corresponding error CSS class was added to the element.
   */
  errorClassAdded?(event: Square.SqEvent<Square.CardInputEvent>): void
  /**
   * Callback function that is called when an invalid value on a form field was corrected,
   * and the corresponding error CSS class was removed from the element
   */
  errorClassRemoved?(event: Square.SqEvent<Square.CardInputEvent>): void
  /**
   * Sets the DOM focus of one of the input fields within the credit card form.
   *
   * For more details about the available options, see [CardFieldNames](https://developer.squareup.com/reference/sdks/web/payments/enums/CardFieldNames).
   * @throws {InvalidFieldNameError} the specified field name is invalid
   */
  focus?: Square.CardFieldNamesValues
  /**
   * Callback function that is called when a form field gained focus,
   * and the corresponding focus CSS class was added to the element.
   */
  focusClassAdded?(event: Square.SqEvent<Square.CardInputEvent>): void
  /**
   * Callback function that is called when a form field lost focus,
   * and the corresponding focus CSS class was removed from the element.
   */
  focusClassRemoved?(event: Square.SqEvent<Square.CardInputEvent>): void
  /**
   * Sets the style for the Payment Button using a CSS object
   *
   * @example
   * ```js
   * const overrideStyles = {
   *  background: "red",
   *  "&:hover": {
   *    background: "green"
   *  }
   * }
   * ```
   */
  overrideStyles?: Stitches.ComponentProps<typeof PayButton>['css']
  /**
   * Callback function that is called when the current value of the postal code form field changed.
   */
  postalCodeChanged?(event: Square.SqEvent<Square.CardInputEvent>): void
  /**
   * Recalculates the size of the card form.
   *
   * The Card component normally automatically resizes based on the size of the buyer's browser,
   * however if the Card component is contained with an element that has a computed style property
   * of "display: none", then the Card component will no longer have a defined width and therefore
   * will not properly resize between mobile and desktop configurations. Upon being displayed again,
   * the Card component will not automatically update its size to match the browser window.
   *
   * This method recalculateSize() can be used to handle this edge case by forcing the Card
   * component to recalculate its size and display appropriately for mobile or desktop.
   *
   * @example
   * card.recalculateSize()
   *
   * @throws {PaymentMethodNotAttachedError} `Card` is has not been attached to a DOM element
   */
  recalculateSize?(callback: Square.Card['recalculateSize'] | undefined): void
  /**
   * Callback function that is called when the user pressed the "Escape" key while editing a field.
   */
  scape?(event: Square.SqEvent<Square.CardInputEvent>): void
  /**
   * Callback function that is called when the user has triggered submission of the form
   * by pressing "Enter" while editing a field.
   */
  submit?(event: Square.SqEvent<Square.CardInputEvent>): void
  /**
   * The ID of the element that the credit card submit button should be rendered trigger into.
   */
  submitButtonId?: string
  /**
   * Sets text in Button. If children is/are given then not applied
   */
  text?: string
}

/**
 * Renders a Credit Card Input to use in the Square Web Payment SDK, pre-styled to meet Square branding guidelines.
 *
 * **_But with the option to override styles_**
 *
 * @example
 * ```tsx
 * <SquareForm {...props}>
 *  <CreditCardInput focus="cardNumber" />
 * </SquareForm>
 * ```
 */
const CreditCardInput = ({
  cardBrandChanged,
  cardContainerId = 'card-container',
  children,
  errorClassAdded,
  errorClassRemoved,
  focus = 'cardNumber',
  focusClassAdded,
  focusClassRemoved,
  includeInputLabels = false,
  overrideStyles,
  postalCode = '',
  postalCodeChanged,
  recalculateSize,
  scape,
  style,
  submit,
  submitButtonId = 'pay-with-card',
  text = 'Pay',
}: CreditCardInputProps): React.ReactElement | null => {
  const [card, setCard] = React.useState<Square.Card | undefined>(
    () => undefined
  )
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const { cardTokenizeResponseReceived, payments } = useForm()
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  /**
   * Handle the on click of the Credit Card button click
   *
   * @param e An event which takes place in the DOM.
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async () => {
    setIsSubmitting(true)

    try {
      const result = await card?.tokenize()

      if (result) {
        setIsSubmitting(false)

        return cardTokenizeResponseReceived(result)
      }
    } catch (ex) {
      setIsSubmitting(false)

      console.error(ex)
    }
  }

  // Avoid re-rendering the component when the card is not ready
  React.useEffect(() => {
    /**
     * Initialize the Card instance to be used in the component
     */
    const start = async () => {
      const card = await payments?.card().then((res) => {
        setCard(res)

        return res
      })

      await card?.configure({
        includeInputLabels,
        postalCode,
        style,
      })
      await card?.attach(`#${cardContainerId}`)
      await card?.focus(focus)
    }

    if (card) {
      card?.focus(focus)
    } else {
      start()
    }
  }, [
    focus,
    payments,
    card,
    cardContainerId,
    includeInputLabels,
    postalCode,
    style,
  ])

  useEventListener({
    listener: handlePayment,
    type: 'click',
    element: buttonRef,
    options: {
      passive: true,
    },
  })

  if (cardBrandChanged) {
    card?.addEventListener('cardBrandChanged', cardBrandChanged)
  }

  if (errorClassAdded) {
    card?.addEventListener('errorClassAdded', errorClassAdded)
  }

  if (errorClassRemoved) {
    card?.addEventListener('errorClassRemoved', errorClassRemoved)
  }

  if (scape) {
    card?.addEventListener('escape', scape)
  }

  if (focusClassAdded) {
    card?.addEventListener('focusClassAdded', focusClassAdded)
  }

  if (focusClassRemoved) {
    card?.addEventListener('focusClassRemoved', focusClassRemoved)
  }

  if (postalCodeChanged) {
    card?.addEventListener('postalCodeChanged', postalCodeChanged)
  }

  if (recalculateSize) {
    recalculateSize(card?.recalculateSize)
  }

  if (submit) {
    card?.addEventListener('submit', submit)
  }

  const Button = (props?: PayButtonProps): React.ReactElement => (
    <PayButton
      {...props}
      aria-disabled={!card || isSubmitting}
      // @ts-ignore - This is a workaround for a bug in TypeScript
      css={props?.css || overrideStyles}
      disabled={!card || isSubmitting}
      id={submitButtonId}
      ref={buttonRef}
      type="button"
    >
      {props?.children || text}
    </PayButton>
  )

  return (
    <>
      <div
        data-testid="rswps-card-container"
        id={cardContainerId}
        style={{ minHeight: 89 }}
      >
        {!card && <LoadingCard />}
      </div>

      {children && typeof children !== 'function' ? (
        <Button>{children}</Button>
      ) : typeof children === 'function' ? (
        children({
          Button,
        })
      ) : (
        <Button />
      )}
    </>
  )
}

export default CreditCardInput
export type { CreditCardInputChildren, CreditCardInputProps, PayButtonProps }
