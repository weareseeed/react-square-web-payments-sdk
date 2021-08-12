// Vendor Modules
import { CSSObject } from '@emotion/styled';
import { document } from 'browser-monads-ts';
import * as React from 'react';
import { useEvent } from 'react-use';
import type { Card, CardFieldNamesValues, CardOptions } from '@square/web-sdk';

// Internals
import { useForm } from '../../contexts';
import { renderWithoutSupportPaymentMethod } from '../../utils';
import { LoadingCard, PayButton } from './styles';

export interface CreditCardInputProps extends CardOptions {
  /** Sets text  in Button */
  text?: string
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
  overrideStyles?: CSSObject | undefined;
  /**
   * Sets the DOM focus of one of the input fields within the credit card form.
   *
   * For more details about the available options, see [CardFieldNames](https://developer.squareup.com/reference/sdks/web/payments/enums/CardFieldNames).
   * @throws {InvalidFieldNameError} the specified field name is invalid
   */
  focus?: CardFieldNamesValues;
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
  overrideStyles,
  focus = 'cardNumber',
  text = 'Pay',
  ...props
}: CreditCardInputProps): JSX.Element | null => {
  const [card, setCard] = React.useState<Card | undefined>(() => undefined);
  const { cardTokenizeResponseReceived, card: cardState, payments } = useForm();

  /**
   * Handle the on click of the Credit Card button click
   *
   * @param e An event which takes place in the DOM.
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async () => {
    try {
      const result = await card?.tokenize();

      if (result) {
        return cardTokenizeResponseReceived(result);
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  /**
   * Initialize the Card instance to be used in the component
   */
  const start = async () => {
    const card = await payments.card(props).then((res) => {
      setCard(res);

      return res;
    });

    await card?.attach('#card-container');
    await card?.focus(focus);
  };

  React.useEffect(() => {
    start();
  }, [payments]);

  useEvent('click', handlePayment, document.getElementById('pay-with-card'));

  if (cardState !== 'ready') {
    renderWithoutSupportPaymentMethod('Card');

    return null;
  }

  return (
    <>
      <div id="card-container" style={{ minHeight: 89 }}>
        {!card && <LoadingCard />}
      </div>

      <PayButton
        id="pay-with-card"
        type="button"
        overrideStyles={overrideStyles}
      >
        {text}
      </PayButton>
    </>
  );
};

export default CreditCardInput;
