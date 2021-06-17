// Vendor Modules
import { CSSObject } from '@emotion/styled';
import { document } from 'browser-monads-ts';
import * as React from 'react';
import { useEvent } from 'react-use';
import type { GiftCard, GiftCardOptions } from '@square/web-sdk';

// Internals
import { useForm } from '../../hooks';
import { renderWithoutSupportPaymentMethod } from '../../utils';
import { LoadingCard, PayButton } from './styles';

export interface GiftCardInputProps extends GiftCardOptions {
  /**
   * Sets the style for the Gift Card Button using a CSS object
   *
   * @example
   * ```js
   * const overrideStyles = {
   *  background: "rgba(0, 0, 0, 1)",
   *  "&:hover": {
   *    background: "rgba(0, 0, 0, 0.85)"
   *  }
   * }
   * ```
   */
  overrideStyles?: CSSObject | undefined;
}

export const GiftCardInput = ({
  overrideStyles,
  ...props
}: GiftCardInputProps): JSX.Element | null => {
  const [gCard, setGCard] = React.useState<GiftCard | undefined>(
    () => undefined
  );
  const { cardTokenizeResponseReceived, giftCard, payments } = useForm();

  /**
   * Handle the on click of the Gift Card button click
   *
   * @param e An event which takes place in the DOM.
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async () => {
    try {
      const result = await gCard?.tokenize();

      if (result) {
        return cardTokenizeResponseReceived(result);
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  /**
   * Initialize the Gift Card instance to be used in the component
   */
  const start = async () => {
    const gCard = await payments.giftCard(props).then((res) => {
      setGCard(res);

      return res;
    });

    await gCard?.attach('#gift-card-container');
  };

  React.useEffect(() => {
    start();
  }, [payments]);

  useEvent(
    'click',
    handlePayment,
    document.getElementById('pay-with-gift-card')
  );

  if (giftCard !== 'ready') {
    renderWithoutSupportPaymentMethod('Gift Card');

    return null;
  }

  return (
    <>
      <div id="gift-card-container" style={{ minHeight: 89 }}>
        {!gCard && <LoadingCard />}
      </div>

      <PayButton
        id="pay-with-gift-card"
        type="button"
        overrideStyles={overrideStyles}
      >
        Pay with Gift Card
      </PayButton>
    </>
  );
};

export default GiftCardInput;
