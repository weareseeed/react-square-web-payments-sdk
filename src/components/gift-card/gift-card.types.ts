// Dependencies
import type * as Square from '@square/web-sdk';
import type * as Stitches from '@stitches/react';

// Internals
import { PayButton } from './gift-card.styles';

export type GiftCardPayButtonProps = Omit<
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
};

export interface GiftCardBase
  extends Square.GiftCardOptions,
    Omit<React.ComponentPropsWithRef<'div'>, 'style' | 'children'> {
  /**
   * Props to be passed to the `<button>` element. The following props are not
   * supported: `aria-disabled`, `disabled`, `type`. Since we use that to
   * control the disabled state of the button, we don't support it.
   *
   * But in addition to this we offer a `isLoading` prop to control the loading
   * state of the button a.k.a disabling the button.
   */
  buttonProps?: GiftCardPayButtonProps;
  callbacks?: {
    /** A new gift card brand was detected, based on the gift card number. */
    cardBrandChanged?: (event: Square.SqEvent<Square.GiftCardInputEvent>) => void;
    /**
     * The gift card number field has an invalid value, and the corresponding
     * error CSS class was added to the element.
     */
    errorClassAdded?: (event: Square.SqEvent<Square.GiftCardInputEvent>) => void;
    /**
     * An invalid value on the gift card number was corrected, and the
     * corresponding error CSS class was removed from the element.
     */
    errorClassRemoved?: (event: Square.SqEvent<Square.GiftCardInputEvent>) => void;
    /** The user pressed the "Escape" key while editing the gift card number field. */
    escape?: (event: Square.SqEvent<Square.GiftCardInputEvent>) => void;
    /**
     * The gift card number field gained focus, and the corresponding focus CSS
     * class was added to the element.
     */
    focusClassAdded?: (event: Square.SqEvent<Square.GiftCardInputEvent>) => void;
    /**
     * The gift card number field lost focus, and the corresponding focus CSS
     * class was removed from the element.
     */
    focusClassRemoved?: (event: Square.SqEvent<Square.GiftCardInputEvent>) => void;
    /**
     * The user has triggered submission of the gift card by pressing "Enter"
     * while editing the gift card number field.
     */
    submit?: (event: Square.SqEvent<Square.GiftCardInputEvent>) => void;
  };
  /** Sets the DOM focus of one of the input fields within the GiftCard form. */
  focus?: Square.GiftCardFieldNamesValues;
}

export interface GiftCardWithChildren extends GiftCardBase {
  /**
   * Props to be passed to the `<button>` element. The following props are not
   * supported: `aria-disabled`, `disabled`, `type`. Since we use that to
   * control the disabled state of the button, we don't support it.
   *
   * But in addition to this we offer a `isLoading` prop to control the loading
   * state of the button a.k.a disabling the button.
   */
  buttonProps?: GiftCardPayButtonProps;
  /**
   * Make it possible to put any component inside. If children is/are given then
   * `render` is not applied.
   */
  children?: React.ReactNode;
}

export interface GiftCardFunctionChildren extends GiftCardBase {
  /**
   * Make it possible to put any component inside. If render is/are given then
   * `children` and `buttonProps` is not applied.
   *
   * @param Button - The button component
   */
  render?(Button: (props: GiftCardPayButtonProps) => React.ReactElement): React.ReactNode;
}

export interface GiftCardProps extends GiftCardBase {
  /**
   * Props to be passed to the `<button>` element. The following props are not
   * supported: `aria-disabled`, `disabled`, `type`. Since we use that to
   * control the disabled state of the button, we don't support it.
   *
   * But in addition to this we offer a `isLoading` prop to control the loading
   * state of the button a.k.a disabling the button.
   */
  buttonProps?: GiftCardPayButtonProps;
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
  render?(Button: (props: GiftCardPayButtonProps) => React.ReactElement): React.ReactNode;
}
