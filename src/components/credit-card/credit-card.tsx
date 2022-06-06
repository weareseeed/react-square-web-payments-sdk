// Dependencies
import * as React from 'react';
import type * as Square from '@square/web-sdk';

// Internals
import { useForm } from '~/contexts/form';
import { useEventListener } from '~/hooks/use-event-listener';
import { LoadingCard, PayButton } from './credit-card.styles';
import type {
  CreditCardBase,
  CreditCardChildren,
  CreditCardFunctionChildren,
  CreditCardPayButtonProps,
  CreditCardProps,
} from './credit-card.types';

const Button = React.forwardRef<HTMLButtonElement, CreditCardPayButtonProps>(
  ({ children, isLoading, ...props }, buttonRef) => {
    const id = 'rswp-card-button';

    return (
      <PayButton
        {...props}
        aria-disabled={isLoading}
        css={props?.css}
        disabled={isLoading}
        id={id}
        ref={buttonRef}
        type="button"
      >
        {children ?? 'Pay'}
      </PayButton>
    );
  }
);

Button.displayName = 'PaymentButton';

/**
 * Renders a Credit Card Input to use in the Square Web Payment SDK, pre-styled
 * to meet Square branding guidelines.
 *
 * **_But with the option to override styles_**
 *
 * @example
 *
 * ```tsx
 * function App() {
 *   return (
 *     <SquareForm {...props}>
 *       <CreditCard />
 *     </SquareForm>
 *   );
 * }
 * ```
 */
function CreditCard(props: CreditCardBase): JSX.Element;
function CreditCard(props: CreditCardChildren): JSX.Element;
function CreditCard(props: CreditCardFunctionChildren): JSX.Element;
function CreditCard({
  buttonProps,
  callbacks,
  children,
  focus = 'cardNumber',
  id = 'rswps-card-container',
  includeInputLabels,
  postalCode,
  recalculateSize,
  render,
  style,
  ...props
}: CreditCardProps) {
  const card = React.useRef<Square.Card | undefined>(undefined);
  const [loadingCard, setLoadingCard] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const { cardTokenizeResponseReceived, payments } = useForm();

  const options: Square.CardOptions = React.useMemo(() => {
    const baseOptions = {
      includeInputLabels,
      postalCode,
      style,
    };

    // if a value from options is undefined delete it from the options object
    return Object.keys(baseOptions).reduce((acc: Record<string, unknown>, key) => {
      if (baseOptions[key as keyof typeof baseOptions] !== undefined) {
        acc[key as string] = baseOptions[key as keyof typeof baseOptions];
      }

      return acc;
    }, {});
  }, [includeInputLabels, postalCode, style]);

  /**
   * Handle the on click of the Credit Card button click
   *
   * @param e An event which takes place in the DOM.
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async (e: Event) => {
    e.stopPropagation();

    if (buttonProps?.isLoading) return;

    if (!card.current) {
      console.warn('Credit Card button was clicked, but no Credit Card instance was found.');

      return;
    }

    setIsSubmitting(true);

    try {
      const result = await card.current.tokenize();

      if (result.status === 'OK') {
        const tokenizedResult = await cardTokenizeResponseReceived(result);
        return tokenizedResult
      }

      let message = `Tokenization failed with status: ${result.status}`;
      if (result?.errors) {
        message += ` and errors: ${JSON.stringify(result?.errors)}`;

        throw new Error(message);
      }

      console.warn(message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const start = async (signal: AbortSignal) => {
      setLoadingCard(true);
      const cardResponse = await payments
        ?.card(options)
        .then((res) => {
          if (!signal.aborted) {
            card.current = res;
            return res;
          }
          return null;
        })
        .finally(() => {
          setLoadingCard(false);
        });

      await cardResponse?.attach(`#${id}`).then(() => {
        if (callbacks) {
          for (const callback of Object.keys(callbacks)) {
            cardResponse?.addEventListener(
              callback as Square.CardInputEventTypes,
              (callbacks as Record<string, (event: Square.SqEvent<Square.CardInputEvent>) => void>)[callback]
            );
          }
        }
        if (recalculateSize) {
          recalculateSize(cardResponse?.recalculateSize);
        }
        cardResponse?.focus(focus);
      });
      if (focus) {
        await cardResponse?.focus(focus);
      }

      if (signal.aborted) {
        await cardResponse?.destroy();
      }
    };

    start(signal);

    return () => {
      abortController.abort();
      card.current?.destroy();
    };
  }, [payments, id]);

  React.useEffect(() => {
    if (card.current && focus) {
      card.current.focus(focus);
    }
  }, [focus]);

  useEventListener({
    listener: handlePayment,
    type: 'click',
    element: buttonRef,
    options: {
      passive: true,
    },
  });

  return (
    <>
      <div {...props} data-testid="rswps-card-container" id={id} style={{ minHeight: 89 }}>
        <>
          {console.log(loadingCard)}
          {loadingCard && <LoadingCard />}
        </>
      </div>

      {typeof render === 'function' ? (
        render(Button)
      ) : (
        <Button {...buttonProps} isLoading={isSubmitting || buttonProps?.isLoading} ref={buttonRef}>
          {children ?? 'Pay'}
        </Button>
      )}
    </>
  );
}

export default CreditCard;
export * from './credit-card.types';
