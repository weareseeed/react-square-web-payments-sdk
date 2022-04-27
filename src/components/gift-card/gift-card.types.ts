// Dependencies
import type * as Square from '@square/web-sdk';
import type * as Stitches from '@stitches/react';

// Internals
import { PayButton } from './gift-card.styles';

export type GiftCardPayButtonProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'aria-disabled' | 'disabled' | 'type'
> & {
  css?: Stitches.ComponentProps<typeof PayButton>['css'];
};

export interface GiftCardBase
  extends Square.GiftCardOptions,
    Omit<React.ComponentPropsWithRef<'div'>, 'style' | 'children'> {
  buttonProps?: GiftCardPayButtonProps;
}

export interface GiftCardWithChildren extends GiftCardBase {
  children?: React.ReactNode;
}

export interface GiftCardProps extends GiftCardBase {
  children?: React.ReactNode;
}
