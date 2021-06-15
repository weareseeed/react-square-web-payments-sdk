// Vendor Modules
import { CSSObject } from '@emotion/styled';
import { Card, CardOptions } from '@square/web-payments-sdk-types';
import { document } from 'browser-monads-ts';
import * as React from 'react';
import { useEvent } from 'react-use';

// Internals
import { useForm } from '../../hooks';
import { PayButton } from './styles';

interface Props extends CardOptions {
  overrideStyles?: CSSObject | undefined;
}

export const CreditCardInput = ({
  overrideStyles,
  ...props
}: Props): JSX.Element => {
  const [card, setCard] = React.useState<Card | undefined>(() => undefined);
  const { payments } = useForm();

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
