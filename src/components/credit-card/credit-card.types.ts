// Dependencies
import type * as Square from '@square/web-sdk';
import type * as Stitches from '@stitches/react';
import type * as React from 'react';

// Internals
import { PayButton } from './credit-card.styles';

export type CreditCardPayButtonProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'aria-disabled' | 'disabled' | 'type'
> & {
  /**
   * Sets the style for the Payment Button using a CSS object
   *
   * @example
   *
   * ```js
   * const overrideStyles = {
   *   background: 'white',
   *   '&:hover': {
   *     background: 'rgba(1, 208, 158, 0.1)',
   *   },
   * };
   * ```
   */
  css?: Stitches.ComponentProps<typeof PayButton>['css'];
  /** Control the loading state of the button a.k.a disabling the button. */
  isLoading?: boolean;
  /** Render a custom button with full control. */
  render?: (props: {
    /** If handlePayment is currently running. Use this to disable the button */
    isSubmitting: boolean;
    /**
     * Call this function onClick. Alternatively just set the `ref={buttonRef}`
     * and it will be handled for you
     */
    handlePayment: (e: Event) => void;
    /**
     * Set `ref={buttonRef}` for it to handle the payment on click. You may want
     * to use `handlePayment` instead for more control, but don't use both.
     */
    buttonRef: React.RefObject<HTMLElement>;
  }) => React.ReactElement;
};

export type CreditCardFunctionChildrenProps = {
  Button: (props: CreditCardPayButtonProps) => React.ReactElement;
};

export interface CreditCardBase
  extends Square.CardOptions,
    Omit<React.ComponentPropsWithRef<'div'>, 'style' | 'children'> {
  callbacks?: {
    /**
     * Callback function that is called when the payment form detected a new
     * likely credit card brand based on the card number.
     */
    cardBrandChanged?(event: Square.SqEvent<Square.CardInputEvent>): void;
    /**
     * Callback function that is called when a form field has an invalid value,
     * and the corresponding error CSS class was added to the element.
     */
    errorClassAdded?(event: Square.SqEvent<Square.CardInputEvent>): void;
    /**
     * Callback function that is called when an invalid value on a form field
     * was corrected, and the corresponding error CSS class was removed from the element
     */
    errorClassRemoved?(event: Square.SqEvent<Square.CardInputEvent>): void;
    /**
     * Callback function that is called when the user pressed the "Escape" key
     * while editing a field.
     */
    escape?(event: Square.SqEvent<Square.CardInputEvent>): void;
    /**
     * Callback function that is called when a form field gained focus, and the
     * corresponding focus CSS class was added to the element.
     */
    focusClassAdded?(event: Square.SqEvent<Square.CardInputEvent>): void;
    /**
     * Callback function that is called when a form field lost focus, and the
     * corresponding focus CSS class was removed from the element.
     */
    focusClassRemoved?(event: Square.SqEvent<Square.CardInputEvent>): void;
    /**
     * Callback function that is called when the current value of the postal
     * code form field changed.
     */
    postalCodeChanged?(event: Square.SqEvent<Square.CardInputEvent>): void;
    /**
     * Callback function that is called when the user has triggered submission
     * of the form by pressing "Enter" while editing a field.
     */
    submit?(event: Square.SqEvent<Square.CardInputEvent>): void;
  };
  /**
   * Sets the DOM focus of one of the input fields within the credit card form.
   *
   * For more details about the available options, see
   * [CardFieldNames](https://developer.squareup.com/reference/sdks/web/payments/enums/CardFieldNames).
   *
   * @throws {InvalidFieldNameError} The specified field name is invalid
   */
  focus?: Square.CardFieldNamesValues;
  /**
   * Recalculates the size of the card form.
   *
   * The Card component normally automatically resizes based on the size of the
   * buyer's browser, however if the Card component is contained with an element
   * that has a computed style property of "display: none", then the Card
   * component will no longer have a defined width and therefore will not
   * properly resize between mobile and desktop configurations. Upon being
   * displayed again, the Card component will not automatically update its size
   * to match the browser window.
   *
   * This method recalculateSize() can be used to handle this edge case by
   * forcing the Card component to recalculate its size and display
   * appropriately for mobile or desktop.
   *
   * @example Card.recalculateSize()
   *
   * @throws {PaymentMethodNotAttachedError} `Card` is has not been attached to
   *   a DOM element
   */
  recalculateSize?(callback: Square.Card['recalculateSize'] | undefined): void;
}

export interface CreditCardChildren extends CreditCardBase {
  /**
   * Props to be passed to the `<button>` element. The following props are not
   * supported: `aria-disabled`, `disabled`, `type`. Since we use that to
   * control the disabled state of the button, we don't support it.
   *
   * But in addition to this we offer a `isLoading` prop to control the loading
   * state of the button a.k.a disabling the button.
   */
  buttonProps?: CreditCardPayButtonProps;
  /**
   * Make it possible to put any component inside. If children is/are given then
   * `render` is not applied.
   */
  children?: React.ReactNode;
}

export interface CreditCardFunctionChildren extends CreditCardBase {
  /**
   * Make it possible to put any component inside. If render is/are given then
   * `children` and `buttonProps` is not applied.
   *
   * @param Button - The button component
   */
  render?(Button: (props: CreditCardPayButtonProps) => React.ReactElement): React.ReactNode;
}

export interface CreditCardProps extends CreditCardBase {
  /**
   * Props to be passed to the `<button>` element. The following props are not
   * supported: `aria-disabled`, `disabled`, `type`. Since we use that to
   * control the disabled state of the button, we don't support it.
   *
   * But in addition to this we offer a `isLoading` prop to control the loading
   * state of the button a.k.a disabling the button.
   */
  buttonProps?: CreditCardPayButtonProps;
  /**
   * Make it possible to put any component inside. If children is/are given then
   * `render` is not applied.
   */
  children?: React.ReactNode;
  /**
   * Make it possible to put any component inside. If render is/are given then
   * `children` and `buttonProps` is not applied.
   *
   * @param Button - The button component
   */
  render?(Button: (props: CreditCardPayButtonProps) => React.ReactElement | null): React.ReactNode;
  /**
   * Make it possible to render the button outside of the component using
   * `<CreditCardButton />` If `hideButton` is set to `true` then the button
   * will not be rendered and `render`, `children` and `buttonProps` will be ignored.
   */
  hideButton?: boolean;
}
