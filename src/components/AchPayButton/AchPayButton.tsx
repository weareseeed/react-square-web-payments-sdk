// Vendor Modules
import { CSSObject } from '@emotion/styled';
import { document } from 'browser-monads-ts';
import * as React from 'react';
import { useEvent } from 'react-use';
import type { ACH, AchTokenOptions } from '@square/web-sdk';

// Internals
import { useForm } from '../../hooks';
import { PayButton } from './styles';

interface Props extends AchTokenOptions {
  overrideStyles?: CSSObject | undefined;
}

export const AchPayButton = ({
  overrideStyles,
  ...props
}: Props): JSX.Element => {
  const [ach, setAch] = React.useState<ACH | undefined>(() => undefined);
  const { payments } = useForm();

  const handlePayment = async () => {
    try {
      const result = await ach?.tokenize(props);

      console.log(result);
    } catch (ex) {
      console.error(ex);
    }
  };

  const start = async () => {
    await payments.ach().then((res) => {
      setAch(res);

      return res;
    });
  };

  React.useEffect(() => {
    start();
  }, [payments]);

  useEvent('click', handlePayment, document.getElementById('pay-with-ach'));

  return (
    <PayButton id="pay-with-ach" type="button" overrideStyles={overrideStyles}>
      Pay with Direct debit (ACH)
    </PayButton>
  );
};

export default AchPayButton;
