// Dependencies
import * as React from 'react';
import { useEventListener } from 'usehooks-ts';
import type * as Square from '@square/web-sdk';

// Internals
import { useForm } from '~/contexts/form';
import { LoadingCard, PayButton } from './gift-card.styles';
import type { GiftCardBase, GiftCardProps, GiftCardWithChildren } from './gift-card.types';

/**
 * Renders a Gift Card Input to use in the Square Web Payment SDK, pre-styled to
 * meet Square branding guidelines.
 *
 * **_But with the option to override styles_**
 *
 * @example
 *
 * ```tsx
 * function App() {
 *   return (
 *     <SquareForm {...props}>
 *       <GiftCard />
 *     </SquareForm>
 *   );
 * }
 * ```
 */
function GiftCard(props: GiftCardBase): JSX.Element;
function GiftCard(props: GiftCardWithChildren): JSX.Element;
function GiftCard({
  buttonProps = {
    id: 'rswps-gift-card-button',
  },
  children,
  id = 'rswps-gift-card-container',
  includeInputLabels,
  style,
  ...props
}: GiftCardProps) {
  const [giftCard, setGiftCard] = React.useState<Square.GiftCard | undefined>(() => undefined);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { cardTokenizeResponseReceived, payments } = useForm();
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const options = React.useMemo(
    () => ({
      includeInputLabels,
      style,
    }),
    [includeInputLabels, style]
  );

  /**
   * Handle the on click of the Gift Card button click
   *
   * @param e An event which takes place in the DOM.
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async (e: MouseEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await giftCard?.tokenize();

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
      const gCard = await payments?.giftCard(options).then((res) => {
        if (!signal.aborted) {
          setGiftCard(res);

          return res;
        }

        return null;
      });

      await gCard?.attach(`#${id}`);
    };

    start(signal);

    return () => {
      abortController.abort();
    };
  }, [payments]);

  React.useEffect(() => {
    giftCard?.configure(options);
  }, [options]);

  useEventListener('click', handlePayment, buttonRef);

  return (
    <>
      <div {...props} id={id} style={{ minHeight: 89 }}>
        {!giftCard && <LoadingCard />}
      </div>

      <PayButton
        {...buttonProps}
        aria-disabled={!giftCard || isSubmitting}
        disabled={!giftCard || isSubmitting}
        ref={buttonRef}
        type="button"
      >
        {children ?? 'Pay with Gift Card'}
      </PayButton>
    </>
  );
}

export default GiftCard;
export * from './gift-card.types';
