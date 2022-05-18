// Dependencies
import type * as Square from '@square/web-sdk';

export interface AfterpayButtonProps
  extends Omit<Square.AfterpayButtonOptions, 'useCustomButton'>,
    React.ComponentPropsWithoutRef<'div'> {
  Button?: React.ElementType;
}

export interface AfterpayMessageBaseProps extends React.ComponentPropsWithoutRef<'div'> {
  badgeTheme?: Square.AfterpayBadgeThemeValues;
  id?: string;
  modalLinkStyle?: Square.AfterpayModalLinkStyleValues;
  modalTheme?: Square.AfterpayModalThemeValues;
  size?: Square.AfterpaySizeValues;
}
export interface AfterpayMessageCustomComponentProps {
  component?: {
    Message?: React.ElementType;
  };
  modalTheme?: Square.AfterpayModalThemeValues;
}
export interface AfterpayMessageProps extends AfterpayMessageBaseProps {
  component?: {
    Message?: React.ElementType;
  };
}

export interface AfterpayWidgetProps
  extends Square.AfterpayCheckoutWidgetOptions,
    React.ComponentPropsWithoutRef<'div'> {}
