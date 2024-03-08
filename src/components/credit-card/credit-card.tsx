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
  CreditCardNoButton,
  CreditCardPayButtonProps,
  CreditCardProps,
} from './credit-card.types';

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
function CreditCard(props: CreditCardNoButton): JSX.Element;
function CreditCard({
  buttonProps,
  callbacks,
  children,
  focus,
  id = 'rswps-card-container',
  includeInputLabels,
  postalCode,
  recalculateSize,
  render,
  style,
  ...props
}: CreditCardProps) {
  const { payments, card, setCard } = useForm();

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

  React.useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const start = async (signal: AbortSignal) => {
      const card = await payments?.card(options).then((res) => {
        if (!signal.aborted) {
          setCard(res);
          return res;
        }

        return null;
      });

      await card?.attach(`#${id}`);
      if (focus) {
        await card?.focus(focus);
      }

      if (signal.aborted) {
        await card?.destroy();
      }
    };

    start(signal);

    return () => {
      abortController.abort();
    };
  }, [payments, id]);

  React.useEffect(() => {
    if (card && focus) {
      card.focus(focus);
    }
  }, [card, focus]);

  if (callbacks) {
    for (const callback of Object.keys(callbacks)) {
      card?.addEventListener(
        callback as Square.CardInputEventTypes,
        (callbacks as Record<string, (event: Square.SqEvent<Square.CardInputEvent>) => void>)[callback]
      );
    }
  }

  if (recalculateSize) {
    recalculateSize(card?.recalculateSize);
  }

  return (
    <>
      <div {...props} data-testid="rswps-card-container" id={id} style={{ minHeight: 89 }}>
        {!card && <LoadingCard />}
      </div>

      {props.hideButton ? null : typeof render === 'function' ? (
        render(CreditCardButton)
      ) : (
        <CreditCardButton {...buttonProps}>{children ?? 'Pay'}</CreditCardButton>
      )}
    </>
  );
}

function CreditCardButton({ children, isLoading, render, ...props }: CreditCardPayButtonProps) {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const { cardTokenizeResponseReceived, card } = useForm();

  /**
   * Handle the on click of the Credit Card button click
   *
   * @param e An event which takes place in the DOM.
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async (e: Event) => {
    e.stopPropagation();

    if (isLoading) return;

    if (!card) {
      console.warn('Credit Card button was clicked, but no Credit Card instance was found.');

      return;
    }

    setIsSubmitting(true);

    try {
      const result = await card.tokenize();

      if (result.status === 'OK') {
        const tokenizedResult = await cardTokenizeResponseReceived(result);
        return tokenizedResult;
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

  useEventListener({
    listener: handlePayment,
    type: 'click',
    element: buttonRef,
    options: {
      passive: true,
    },
  });

  const id = 'rswp-card-button';
  const disabled = isLoading || !card || isSubmitting;

  if (render) {
    return render({ isSubmitting, handlePayment, buttonRef });
  }

  return (
    <PayButton {...props} aria-disabled={disabled} disabled={disabled} id={id} ref={buttonRef} type="button">
      {children ?? 'Pay'}
    </PayButton>
  );
}

export default CreditCard;
export { CreditCardButton };
export * from './credit-card.types';
