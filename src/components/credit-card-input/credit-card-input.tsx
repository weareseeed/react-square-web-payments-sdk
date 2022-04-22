// Dependencies
import * as React from 'react';
import { useEventListener } from 'usehooks-ts';
import type * as Square from '@square/web-sdk';

// Internals
import { useForm } from '@/contexts/form';
import { LoadingCard, PayButton } from './credit-card-input.styles';
import type { CreditCardInputChildren, CreditCardInputProps, PayButtonProps } from './credit-card-input.types';

/**
 * Renders a Credit Card Input to use in the Square Web Payment SDK, pre-styled to meet Square branding guidelines.
 *
 * **_But with the option to override styles_**
 *
 * @example
 * ```tsx
 * <SquareForm {...props}>
 *  <CreditCardInput focus="cardNumber" />
 * </SquareForm>
 * ```
 */
function RenderCreditCardInput(
  {
    cardBrandChanged,
    cardContainerId = 'rswps-card-container',
    children,
    errorClassAdded,
    errorClassRemoved,
    focus = 'cardNumber',
    focusClassAdded,
    focusClassRemoved,
    overrideStyles,
    postalCodeChanged,
    recalculateSize,
    scape,
    submit,
    submitButtonId = 'rswps-submit-button',
    text = 'Pay',
    ...props
  }: CreditCardInputProps,
  ref: React.LegacyRef<HTMLDivElement>
) {
  const [card, setCard] = React.useState<Square.Card | undefined>(() => undefined);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const { cardTokenizeResponseReceived, payments } = useForm();

  /**
   * Handle the on click of the Credit Card button click
   *
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async () => {
    setIsSubmitting(true);

    try {
      const result = await card?.tokenize();

      if (result) {
        setIsSubmitting(false);

        return cardTokenizeResponseReceived(result);
      }
    } catch (ex) {
      setIsSubmitting(false);

      console.error(ex);
    }
  };

  React.useEffect(() => {
    /**
     * Initialize the Card instance to be used in the component
     */
    const abortController = new AbortController();
    const { signal } = abortController;

    const start = async (signal: AbortSignal) => {
      const card = await payments
        ?.card({
          ...props,
        })
        .then((res) => {
          if (!signal.aborted) {
            setCard(res);
            return res;
          }

          return null;
        });

      await card?.attach(`#${cardContainerId}`);
      if (focus) {
        await card?.focus(focus);
      }

      if (signal.aborted) {
        card?.destroy();
      }
    };

    start(signal);

    return () => {
      abortController.abort();
    };
  }, [payments, cardContainerId]);

  React.useEffect(() => {
    if (card) {
      card.configure(props);
    }
  }, [card, props]);

  React.useEffect(() => {
    if (card && focus) {
      card?.focus(focus);
    }
  }, [card, focus]);

  useEventListener('click', handlePayment, buttonRef);

  if (cardBrandChanged) {
    card?.addEventListener('cardBrandChanged', cardBrandChanged);
  }

  if (errorClassAdded) {
    card?.addEventListener('errorClassAdded', errorClassAdded);
  }

  if (errorClassRemoved) {
    card?.addEventListener('errorClassRemoved', errorClassRemoved);
  }

  if (scape) {
    card?.addEventListener('escape', scape);
  }

  if (focusClassAdded) {
    card?.addEventListener('focusClassAdded', focusClassAdded);
  }

  if (focusClassRemoved) {
    card?.addEventListener('focusClassRemoved', focusClassRemoved);
  }

  if (postalCodeChanged) {
    card?.addEventListener('postalCodeChanged', postalCodeChanged);
  }

  if (recalculateSize) {
    recalculateSize(card?.recalculateSize);
  }

  if (submit) {
    card?.addEventListener('submit', submit);
  }

  const Button = (props?: PayButtonProps): React.ReactElement => (
    <PayButton
      {...props}
      aria-disabled={!card || isSubmitting}
      // @ts-ignore - This is a workaround for a bug in TypeScript
      css={props?.css || overrideStyles}
      disabled={!card || isSubmitting}
      id={submitButtonId}
      ref={buttonRef}
      type="button"
    >
      {props?.children || text}
    </PayButton>
  );

  return (
    <>
      <div data-testid="rswps-card-container" id={cardContainerId} ref={ref} style={{ minHeight: 89 }}>
        {!card && <LoadingCard />}
      </div>

      {children && typeof children !== 'function' ? (
        <Button>{children}</Button>
      ) : typeof children === 'function' ? (
        children({
          Button,
        })
      ) : (
        <Button />
      )}
    </>
  );
}

const CreditCardInput = React.forwardRef<HTMLDivElement, CreditCardInputProps>(RenderCreditCardInput);

export default CreditCardInput;
export type { CreditCardInputChildren, CreditCardInputProps, PayButtonProps };
