// Dependencies
import { CSSObject } from '@emotion/styled';
import { document } from 'browser-monads-ts';
import * as React from 'react';
import { useEvent } from 'react-use';
import type { ACH, AchTokenOptions } from '@square/web-sdk';

// Internals
import { useForm } from '../../contexts';
import { PayButton, SvgIcon } from './styles';

export interface AchPayProps extends AchTokenOptions {
  /**
   * The children of the button to override icon and text,
   * you can put any component inside the button
   *
   * @example
   * ```tsx
   * <AchPay>
   *  <MyCustomIcon />
   *  <span>Pay with ACH</span>
   * </AchPay>
   * ```
   */
  children?: React.ReactNode;
  /**
   * Sets the style for the SVG Icon using a CSS object
   *
   * @example
   * ```js
   * const overrideStyles = {
   *  width: 34,
   *  "&:hover": {
   *    width: 44
   *  }
   * }
   * ```
   */
  overrideSvgStyles?: CSSObject | undefined;
  /**
   * Sets the style for the Payment Button using a CSS object
   *
   * @example
   * ```js
   * const overrideStyles = {
   *  background: "white",
   *  "&:hover": {
   *    background: "rgba(1, 208, 158, 0.1)"
   *  }
   * }
   * ```
   */
  overrideStyles?: CSSObject | undefined;
}

/**
 * Renders a Credit Card Input to use in the Square Web Payment SDK, pre-styled to meet Square branding guidelines.
 *
 * **_But with the option to override styles_**
 *
 * @example
 * ```tsx
 * <SquareForm {...props}>
 *  <AchPay />
 * </SquareForm>
 * ```
 */
export const AchPay = ({
  children,
  overrideSvgStyles,
  overrideStyles,
  ...props
}: AchPayProps): JSX.Element | null => {
  const [ach, setAch] = React.useState<ACH | undefined>(() => undefined);
  const {
    cardTokenizeResponseReceived,
    enableMethod,
    methods,
    payments,
  } = useForm();

  /**
   * Handle the on click of the ACH button click
   *
   * @param e An event which takes place in the DOM.
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async () => {
    try {
      const result = await ach?.tokenize(props);

      if (result) {
        return cardTokenizeResponseReceived(result);
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  React.useEffect(() => {
    const start = async () => {
      await payments.ach().then((res) => {
        setAch(res);

        return res;
      });
    };

    start();
  }, [payments]);

  useEvent('click', handlePayment, document.getElementById('pay-with-ach'));

  if (methods.ach !== 'ready') {
    enableMethod('ach');
  }

  if (children) {
    return (
      <PayButton
        id="pay-with-ach"
        overrideStyles={overrideStyles}
        type="button"
      >
        {children}
      </PayButton>
    );
  }

  return (
    <PayButton id="pay-with-ach" overrideStyles={overrideStyles} type="button">
      <SvgIcon
        fill="none"
        height="1em"
        overrideStyles={overrideSvgStyles}
        viewBox="0 0 36 24"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          fill="url(#prefix__paint0_linear)"
          height={24}
          rx={4}
          width={36}
        />
        <path
          clipRule="evenodd"
          d="M18.509 6.16a.89.89 0 00-1.018 0l-6.124 4.285a.848.848 0 00-.325.96.873.873 0 00.833.595h1.75v4.286h-1.75a.866.866 0 00-.875.857c0 .473.392.857.875.857h12.25a.866.866 0 00.875-.857.866.866 0 00-.875-.857h-1.75V12h1.75c.38 0 .717-.24.833-.596a.848.848 0 00-.324-.959L18.509 6.16zm2.116 10.126V12h-5.25v4.286h5.25zM18 7.91l3.395 2.376h-6.79L18 7.91z"
          fill="#fff"
          fillRule="evenodd"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="prefix__paint0_linear"
            x1={36}
            x2={0}
            y1={12}
            y2={12}
          >
            <stop stopColor="#01D09E" />
            <stop offset={1} stopColor="#03E4AE" />
          </linearGradient>
        </defs>
      </SvgIcon>
      Pay with Direct debit (ACH)
    </PayButton>
  );
};

export default AchPay;
