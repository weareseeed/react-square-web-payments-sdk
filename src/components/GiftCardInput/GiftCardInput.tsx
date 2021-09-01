// Dependencies
import { document } from 'browser-monads-ts';
import * as React from 'react';
import useEvent from 'react-use/lib/useEvent';
import type { CSSObject } from '@emotion/styled';
import type { GiftCard, GiftCardOptions } from '@square/web-sdk';

// Internals
import { useForm } from '../../contexts';
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
  const { cardTokenizeResponseReceived, payments } = useForm();

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

  // Avoid re-rendering the component when the gift card is not ready
  const giftCardProps = Object.keys(props).length > 1 ? props : undefined;
  React.useEffect(() => {
    /**
     * Initialize the Gift Card instance to be used in the component
     */
    const start = async () => {
      const gCard = await payments.giftCard(giftCardProps).then((res) => {
        setGCard(res);

        return res;
      });

      await gCard?.attach('#gift-card-container');
    };

    start();
  }, [payments, giftCardProps]);

  useEvent(
    'click',
    handlePayment,
    document.getElementById('pay-with-gift-card')
  );

  return (
    <>
      <div id="gift-card-container" style={{ minHeight: 89 }}>
        {!gCard && <LoadingCard />}
      </div>

      <PayButton
        id="pay-with-gift-card"
        overrideStyles={overrideStyles}
        type="button"
      >
        Pay with Gift Card
      </PayButton>
    </>
  );
};

export default GiftCardInput;
