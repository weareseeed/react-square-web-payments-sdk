// Vendor Modules
import { CSSObject } from '@emotion/styled';
import { document } from 'browser-monads-ts';
import * as React from 'react';
import { useEvent } from 'react-use';
import type { Card, CardOptions } from '@square/web-sdk';

// Internals
import { useForm } from '../../hooks';
import { LoadingCard, PayButton } from './styles';
import { renderWithoutSupportPaymentMethod } from '../../utils';

interface Props extends CardOptions {
  overrideStyles?: CSSObject | undefined;
}

export const CreditCardInput = ({
  overrideStyles,
  ...props
}: Props): JSX.Element | null => {
  const [card, setCard] = React.useState<Card | undefined>(() => undefined);
  const { cardTokenizeResponseReceived, card: cardState, payments } = useForm();

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

  const start = async () => {
    const card = await payments.card(props).then((res) => {
      setCard(res);

      return res;
    });

    await card?.attach('#card-container');
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
        Pay
      </PayButton>
    </>
  );
};

export default CreditCardInput;
