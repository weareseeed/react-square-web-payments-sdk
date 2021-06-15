// Vendor Modules
import { Card, CardOptions } from '@square/web-payments-sdk-types';
import { document } from 'browser-monads-ts';
import * as React from 'react';
import { useEvent } from 'react-use';

// Internals
import { FormContext } from '../contexts';

export const CreditCardInput = (props: CardOptions): JSX.Element => {
  const [card, setCard] = React.useState<Card | undefined>(() => undefined);
  const { payments } = React.useContext(FormContext);

  const handlePayment = async () => {
    try {
      const result = await card?.tokenize();

      console.log(result);
      // TODO: use result.token as source_id in /v2/payments API call
    } catch (ex) {
      console.error(ex);
    }
  };

  const start = async () => {
    const card = await payments?.card(props).then(res => {
      setCard(res);

      return res;
    });

    await card?.attach('#card-container');
  };

  React.useEffect(() => {
    start();
  }, [payments]);

  useEvent('click', handlePayment, document.getElementById('pay-with-card'));

  return (
    <>
      <div id="card-container"></div>

      <button id="pay-with-card" type="button">
        Pay
      </button>
    </>
  );
};

export default CreditCardInput;
