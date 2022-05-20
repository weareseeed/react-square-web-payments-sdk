// Dependencies
import type * as Square from '@square/web-sdk';

export type CashAppPayProps = React.ComponentPropsWithoutRef<'div'> & {
  callbacks?: {
    onTokenization?(event: Square.SqEvent<Square.TokenizationEvent>): void;
  };
  redirectURL?: string;
  referenceId?: string;
  shape?: Square.CashAppPayButtonShapeValues;
  size?: Square.CashAppPayButtonSizeValues;
  values?: Square.CashAppPayButtonThemeValues;
  width?: Square.CashAppPayButtonWidthValues;
};
