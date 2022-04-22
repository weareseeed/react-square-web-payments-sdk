// Dependencies
import type * as React from 'react';
import type * as Square from '@square/web-sdk';
import type * as Stitches from '@stitches/react';

// Internals
import { PayButton, SvgIcon } from './ach.styles';

export type PayButtonProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'aria-disabled' | 'disabled' | 'type'> & {
  /**
   * Sets the style for the Payment Button using a CSS object
   *
   * @example
   * ```js
   * const overrideStyles = {
   *  background: "white",
   *  "&:hover": {
   *    background: "rgba(1, 208, 158, 0.1)"
   *  }
   * }
   * ```
   */
  css?: Stitches.ComponentProps<typeof PayButton>['css'];
};

export interface AchWithChildrenProps extends Square.AchTokenOptions {
  /**
   * The children of the button to override icon and text,
   * you can put any component inside the button
   *
   * @example
   * ```tsx
   * <Ach>
   *  <MyCustomIcon />
   *  <span>Pay with ACH</span>
   * </Ach>
   * ```
   */
  children?: React.ReactNode;
}
export interface AchWithoutChildrenProps extends Square.AchTokenOptions {
  buttonProps?: PayButtonProps;
  /**
   * Sets the style for the SVG Icon using a CSS object
   *
   * @example
   * ```js
   * const overrideStyles = {
   *  width: 34,
   *  "&:hover": {
   *    width: 44
   *  }
   * }
   * ```
   */
  overrideSvgStyles?: Stitches.ComponentProps<typeof SvgIcon>['css'];
}

export interface AchProps extends Square.AchTokenOptions {
  /**
   * The children of the button to override icon and text,
   * you can put any component inside the button
   *
   * @example
   * ```tsx
   * <Ach>
   *  <MyCustomIcon />
   *  <span>Pay with ACH</span>
   * </Ach>
   * ```
   */
  children?: React.ReactNode;
  buttonProps?: PayButtonProps;
  /**
   * Sets the style for the SVG Icon using a CSS object
   *
   * @example
   * ```js
   * const overrideStyles = {
   *  width: 34,
   *  "&:hover": {
   *    width: 44
   *  }
   * }
   * ```
   */
  overrideSvgStyles?: Stitches.ComponentProps<typeof SvgIcon>['css'];
}
