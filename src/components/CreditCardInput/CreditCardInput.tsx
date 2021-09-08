// Dependencies
import * as React from 'react';
import { document } from 'browser-monads-ts';
import type {
  Card,
  CardFieldNamesValues,
  CardInputEvent,
  CardOptions,
  SqEvent,
} from '@square/web-sdk';
import type { CSS } from '@stitches/react';

// Internals
import { useForm } from '@/contexts';
import { useEventListener } from '@/hooks';
import { LoadingCard, PayButton } from './styles';

export type PayButtonProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'aria-disabled' | 'disabled' | 'id' | 'type'
> & {
  css?: CSS;
};

export type ChildrenProps = {
  Button: (props?: PayButtonProps) => JSX.Element;
};

export interface CreditCardInputProps extends CardOptions {
  /**
   * Callback function that is called when the payment form detected a new likely credit card brand
   * based on the card number.
   */
  cardBrandChanged?(event: SqEvent<CardInputEvent>): void;
  /**
   * The ID of the element that the credit card input should be rendered into.
   */
  cardContainerId?: string;
  /**
   * Make it possible to put any component inside. If children is/are given then text is not applied
   */
  children?: (props: ChildrenProps) => JSX.Element | React.ReactNode;
  /**
   * Callback function that is called when a form field has an invalid value,
   * and the corresponding error CSS class was added to the element.
   */
  errorClassAdded?(event: SqEvent<CardInputEvent>): void;
  /**
   * Callback function that is called when an invalid value on a form field was corrected,
   * and the corresponding error CSS class was removed from the element
   */
  errorClassRemoved?(event: SqEvent<CardInputEvent>): void;
  /**
   * Sets the DOM focus of one of the input fields within the credit card form.
   *
   * For more details about the available options, see [CardFieldNames](https://developer.squareup.com/reference/sdks/web/payments/enums/CardFieldNames).
   * @throws {InvalidFieldNameError} the specified field name is invalid
   */
  focus?: CardFieldNamesValues;
  /**
   * Callback function that is called when a form field gained focus,
   * and the corresponding focus CSS class was added to the element.
   */
  focusClassAdded?(event: SqEvent<CardInputEvent>): void;
  /**
   * Callback function that is called when a form field lost focus,
   * and the corresponding focus CSS class was removed from the element.
   */
  focusClassRemoved?(event: SqEvent<CardInputEvent>): void;
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
  overrideStyles?: CSS | undefined;
  /**
   * Callback function that is called when the current value of the postal code form field changed.
   */
  postalCodeChanged?(event: SqEvent<CardInputEvent>): void;
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
  recalculateSize?(callback: Card['recalculateSize'] | undefined): void;
  /**
   * Callback function that is called when the user pressed the "Escape" key while editing a field.
   */
  scape?(event: SqEvent<CardInputEvent>): void;
  /**
   * Callback function that is called when the user has triggered submission of the form
   * by pressing "Enter" while editing a field.
   */
  submit?(event: SqEvent<CardInputEvent>): void;
  /**
   * The ID of the element that the credit card submit button should be rendered trigger into.
   */
  submitButtonId?: string;
  /**
   * Sets text in Button. If children is/are given then not applied
   */
  text?: string;
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
export const CreditCardInput = ({
  cardBrandChanged,
  cardContainerId = 'card-container',
  children,
  errorClassAdded,
  errorClassRemoved,
  focus = 'cardNumber',
  focusClassAdded,
  focusClassRemoved,
  overrideStyles,
  postalCodeChanged,
  recalculateSize,
  scape,
  submit,
  submitButtonId = 'pay-with-card',
  text = 'Pay',
  ...props
}: CreditCardInputProps): JSX.Element | null => {
  const [card, setCard] = React.useState<Card | undefined>(() => undefined);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { cardTokenizeResponseReceived, payments } = useForm();

  /**
   * Handle the on click of the Credit Card button click
   *
   * @param e An event which takes place in the DOM.
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async () => {
    setIsSubmitting(true);

    try {
      const result = await card?.tokenize();

      if (result) {
        setIsSubmitting(false);

        return cardTokenizeResponseReceived(result);
      }
    } catch (ex) {
      setIsSubmitting(false);

      console.error(ex);
    }
  };

  // Avoid re-rendering the component when the card is not ready
  const cardProps = Object.keys(props).length > 1 ? props : undefined;
  React.useEffect(() => {
    /**
     * Initialize the Card instance to be used in the component
     */
    const start = async () => {
      const card = await payments?.card(cardProps).then((res) => {
        setCard(res);

        return res;
      });

      await card?.attach(`#${cardContainerId}`);
      await card?.focus(focus);
    };

    if (card) {
      card?.focus(focus);
    } else {
      start();
    }
  }, [focus, payments, cardProps, card, cardContainerId]);

  useEventListener({
    listener: handlePayment,
    type: 'click',
    element: document.getElementById(submitButtonId),
    options: {
      passive: true,
    },
  });

  if (cardBrandChanged) {
    card?.addEventListener('cardBrandChanged', cardBrandChanged);
  }
  if (errorClassAdded) {
    card?.addEventListener('errorClassAdded', errorClassAdded);
  }
  if (errorClassRemoved) {
    card?.addEventListener('errorClassRemoved', errorClassRemoved);
  }
  if (scape) {
    card?.addEventListener('escape', scape);
  }
  if (focusClassAdded) {
    card?.addEventListener('focusClassAdded', focusClassAdded);
  }
  if (focusClassRemoved) {
    card?.addEventListener('focusClassRemoved', focusClassRemoved);
  }
  if (postalCodeChanged) {
    card?.addEventListener('postalCodeChanged', postalCodeChanged);
  }
  if (recalculateSize) {
    recalculateSize(card?.recalculateSize);
  }
  if (submit) {
    card?.addEventListener('submit', submit);
  }

  const Button = (props?: PayButtonProps): JSX.Element => (
    <PayButton
      {...props}
      aria-disabled={!card || isSubmitting}
      css={props?.css || overrideStyles}
      disabled={!card || isSubmitting}
      id={submitButtonId}
      type="button"
    >
      {props?.children || text}
    </PayButton>
  );

  return (
    <>
      <div
        data-testid="rswps-card-container"
        id={cardContainerId}
        style={{ minHeight: 89 }}
      >
        {!card && <LoadingCard />}
      </div>

      {!children ? (
        <Button />
      ) : typeof children === 'function' ? (
        children({
          Button,
        })
      ) : (
        <Button>{children}</Button>
      )}
    </>
  );
};

export default CreditCardInput;
