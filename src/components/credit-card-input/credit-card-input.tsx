// Dependencies
import * as React from 'react';
import { useEventListener } from 'usehooks-ts';
import type * as Square from '@square/web-sdk';

// Internals
import { useForm } from '~/contexts/form';
import { LoadingCard, PayButton } from './credit-card-input.styles';
import type {
  CreditCardInputBase,
  CreditCardInputChildren,
  CreditCardInputFunctionChildren,
  CreditCardInputProps,
  PayButtonProps,
} from './credit-card-input.types';

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
function CreditCardInput(props: CreditCardInputBase): JSX.Element;
function CreditCardInput(props: CreditCardInputChildren): JSX.Element;
function CreditCardInput(props: CreditCardInputFunctionChildren): JSX.Element;
function CreditCardInput({
  buttonProps,
  callbacks,
  children,
  focus = 'cardNumber',
  id = 'rswps-card-container',
  includeInputLabels,
  postalCode,
  recalculateSize,
  style,
  ...props
}: CreditCardInputProps) {
  const [card, setCard] = React.useState<Square.Card | undefined>(() => undefined);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const { cardTokenizeResponseReceived, payments } = useForm();

  const options: Square.CardOptions = {
    includeInputLabels,
    postalCode,
    style,
  };

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
        card?.destroy();
      }
    };

    start(signal);

    return () => {
      abortController.abort();
    };
  }, [payments, id]);

  React.useEffect(() => {
    if (card) {
      card.configure(options);
    }
  }, [card, options]);

  React.useEffect(() => {
    if (card && focus) {
      card?.focus(focus);
    }
  }, [card, focus]);

  useEventListener('click', handlePayment, buttonRef);

  if (callbacks) {
    for (const callback of Object.keys(callbacks)) {
      card?.addEventListener(
        callback as Square.CardInputEventTypes,
        // @ts-ignore - we know this is a function
        callbacks[callback]
      );
    }
  }

  if (recalculateSize) {
    recalculateSize(card?.recalculateSize);
  }

  const Button = (props?: PayButtonProps) => {
    const id = 'rswp-card-button';

    return (
      <PayButton
        {...props}
        aria-disabled={!card || isSubmitting}
        css={props?.css}
        disabled={!card || isSubmitting}
        id={id}
        ref={buttonRef}
        type="button"
      >
        {props?.children ?? 'Pay'}
      </PayButton>
    );
  };

  return (
    <>
      <div {...props} data-testid="rswps-card-container" id={id} style={{ minHeight: 89 }}>
        {!card && <LoadingCard />}
      </div>

      {typeof children === 'function' ? (
        children({
          Button,
        })
      ) : (
        <Button {...buttonProps}>{children ?? 'Pay'}</Button>
      )}
    </>
  );
}

export default CreditCardInput;
export type { CreditCardInputChildren, CreditCardInputFunctionChildren, CreditCardInputProps, PayButtonProps };
