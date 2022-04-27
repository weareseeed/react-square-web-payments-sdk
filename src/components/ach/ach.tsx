// Dependencies
import * as React from 'react';
import * as Square from '@square/web-sdk';

// Internals
import { useForm } from '~/contexts/form';
import { useEventListener } from '~/hooks/use-event-listener';
import { PayButton, SvgIcon } from './ach.styles';
import { transformPlaidEventName } from './ach.utils';
import type { AchProps, AchWithChildrenProps, AchWithoutChildrenProps, PlaidLinkOnEventMetadata } from './ach.types';

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
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async () => {
    if (!ach) {
      console.warn('ACH button was clicked, but no ACH instance was found.');

      return;
    }

    setIsSubmitting(true);

    try {
      const result = await ach.tokenize({
        accountHolderName,
      });

      switch (result.status) {
        case Square.TokenStatus.ABORT:
          console.warn('ACH payment was aborted.');
          break;
        case Square.TokenStatus.CANCEL:
          console.warn('ACH payment was canceled.');
          break;
        case Square.TokenStatus.ERROR:
          console.error(result.errors);
          break;
        case Square.TokenStatus.INVALID:
          console.warn('ACH payment was invalid.');
          break;
        case Square.TokenStatus.OK:
          return cardTokenizeResponseReceived(result);
        default:
          console.warn('ACH payment was unknown.');
          break;
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const start = async (signal: AbortSignal) => {
      await payments
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
    };

    start(signal);

    return () => {
      abortController.abort();
    };
  }, [payments]);

  if (callbacks) {
    for (const callback of Object.keys(callbacks)) {
      ach?.addEventListener(
        transformPlaidEventName(callback),
        (callbacks as Record<string, (event: Square.SqEvent<PlaidLinkOnEventMetadata>) => void>)[callback]
      );
    }
  }

  useEventListener({
    listener: handlePayment,
    type: 'click',
    element: buttonRef,
    options: {
      passive: true,
    },
  });

  if (children) {
    return (
      <PayButton
        {...buttonProps}
        aria-disabled={!ach || isSubmitting}
        disabled={!ach || isSubmitting}
        ref={buttonRef}
        type="button"
      >
        {children}
      </PayButton>
    );
  }

  return (
    <PayButton
      {...buttonProps}
      aria-disabled={!ach || isSubmitting}
      disabled={!ach || isSubmitting}
      ref={buttonRef}
      type="button"
    >
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
