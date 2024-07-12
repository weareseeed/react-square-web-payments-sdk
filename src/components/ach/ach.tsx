// Dependencies
import type * as Square from '@square/web-sdk';
import * as React from 'react';

// Internals
import { useForm } from '~/contexts/form';
import { useEventListener } from '~/hooks/use-event-listener';
import { PayButton, SvgIcon } from './ach.styles';
import type { AchProps, AchWithChildrenProps, AchWithoutChildrenProps } from './ach.types';
import { transformPlaidEventName } from './ach.utils';

/**
 * Renders a ACH button to use in the Square Web Payment SDK, pre-styled to meet
 * Square branding guidelines.
 *
 * **_But with the option to override styles or use a custom children_**
 *
 * @example
 *
 * ```tsx
 * function App() {
 *   return (
 *     <SquareForm {...props}>
 *       <Ach />
 *     </SquareForm>
 *   );
 * }
 * ```
 */
export function Ach(props: AchWithChildrenProps): React.ReactElement;
export function Ach(props: AchWithoutChildrenProps): React.ReactElement;
export function Ach({
  accountHolderName,
  intent,
  total,
  redirectURI,
  transactionId,
  callbacks,
  buttonProps,
  children,
  svgProps,
}: AchProps) {
  const [ach, setAch] = React.useState<Square.ACH | undefined>(() => undefined);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { cardTokenizeResponseReceived, payments } = useForm();
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  /**
   * Handle the on click of the ACH button click
   *
   * @param e An event which takes place in the DOM.
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handleClick = async (e: Event) => {
    e.stopPropagation();

    if (!ach) {
      console.warn('ACH button was clicked, but no ACH instance was found.');

      return;
    }

    try {
      await ach.tokenize({
        accountHolderName,
        intent,
        total,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = async (e: Square.SqEvent<Square.TokenizationEvent>) => {
    setIsSubmitting(true);
    try {
      const { tokenResult: result } = e.detail;
      if (result && result.status === 'OK') {
        const tokenizedResult = await cardTokenizeResponseReceived(result);
        return tokenizedResult;
      }

      let message = `Tokenization failed with status: ${result?.status}`;
      if (result?.errors) {
        message += ` and errors: ${JSON.stringify(result?.errors)}`;

        throw new Error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    ach?.addEventListener('ontokenization' as Square.PlaidEventName, handlePayment);
    return () => {
      ach?.removeEventListener('ontokenization' as Square.PlaidEventName, handlePayment);
    };
  }, [ach]);

  React.useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const start = async (signal: AbortSignal) => {
      const ach = await payments
        ?.ach({
          redirectURI,
          transactionId,
        })
        .then((res) => {
          if (signal?.aborted) {
            return;
          }

          setAch(res);

          return res;
        });

      if (signal.aborted) {
        await ach?.destroy();
      }
    };

    start(signal);

    return () => {
      abortController.abort();
    };
  }, [payments]);

  if (callbacks) {
    for (const callback of Object.keys(callbacks)) {
      ach?.addEventListener(
        transformPlaidEventName(callback) as Square.PlaidEventName,
        (callbacks as Record<string, (event: Square.SqEvent<Square.TokenizationEvent>) => void>)[callback]
      );
    }
  }

  useEventListener({
    listener: handleClick,
    type: 'click',
    element: buttonRef,
    options: {
      passive: true,
    },
  });

  const { isLoading, ...props } = buttonProps ?? {};
  const disabled = isLoading || !ach || isSubmitting;

  if (children) {
    return (
      <PayButton {...props} aria-disabled={disabled} disabled={disabled} ref={buttonRef} type="button">
        {children}
      </PayButton>
    );
  }

  return (
    <PayButton {...props} aria-disabled={disabled} disabled={disabled} ref={buttonRef} type="button">
      <SvgIcon
        fill="none"
        height="1em"
        viewBox="0 0 36 24"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        {...svgProps}
      >
        <rect fill="url(#prefix__paint0_linear)" height={24} rx={4} width={36} />
        <path
          clipRule="evenodd"
          d="M18.509 6.16a.89.89 0 00-1.018 0l-6.124 4.285a.848.848 0 00-.325.96.873.873 0 00.833.595h1.75v4.286h-1.75a.866.866 0 00-.875.857c0 .473.392.857.875.857h12.25a.866.866 0 00.875-.857.866.866 0 00-.875-.857h-1.75V12h1.75c.38 0 .717-.24.833-.596a.848.848 0 00-.324-.959L18.509 6.16zm2.116 10.126V12h-5.25v4.286h5.25zM18 7.91l3.395 2.376h-6.79L18 7.91z"
          fill="#fff"
          fillRule="evenodd"
        />
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="prefix__paint0_linear" x1={36} x2={0} y1={12} y2={12}>
            <stop stopColor="#01D09E" />
            <stop offset={1} stopColor="#03E4AE" />
          </linearGradient>
        </defs>
      </SvgIcon>
      <span>Pay with Direct debit (ACH)</span>
    </PayButton>
  );
}

export default Ach;
export * from './ach.types';
