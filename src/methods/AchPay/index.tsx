// Dependencies
import * as React from 'react'
import type * as Square from '@square/web-sdk'
import type * as Stitches from '@stitches/react'

// Internals
import { PayButton, SvgIcon } from './styles'
import { useForm } from '../../contexts/FormContext'
import { useEventListener } from '../../hooks/useEventListener'

interface AchPayProps extends Square.AchTokenOptions {
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
  children?: React.ReactNode
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
  overrideSvgStyles?: Stitches.ComponentProps<typeof SvgIcon>['css']
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
  overrideStyles?: Stitches.ComponentProps<typeof PayButton>['css']
}

/**
 * Renders a ACH button to use in the Square Web Payment SDK, pre-styled to meet Square branding guidelines.
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
const AchPay = ({
  children,
  overrideSvgStyles,
  overrideStyles,
  ...props
}: AchPayProps): JSX.Element | null => {
  const [achPay, setAchPay] = React.useState<Square.ACH | undefined>(
    () => undefined
  )
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const { cardTokenizeResponseReceived, payments } = useForm()
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  /**
   * Handle the on click of the ACH button click
   *
   * @param e An event which takes place in the DOM.
   * @returns The data be sended to `cardTokenizeResponseReceived()` function, or an error
   */
  const handlePayment = async () => {
    setIsSubmitting(true)

    try {
      const result = await achPay?.tokenize(props)

      if (result) {
        setIsSubmitting(false)

        return cardTokenizeResponseReceived(result)
      }
    } catch (ex) {
      setIsSubmitting(false)

      console.error(ex)
    }
  }

  React.useEffect(() => {
    const start = async () => {
      await payments?.ach().then((res) => {
        setAchPay(res)

        return res
      })
    }

    start()
  }, [payments])

  useEventListener({
    listener: handlePayment,
    type: 'click',
    element: buttonRef,
    options: {
      passive: true,
    },
  })

  if (children) {
    return (
      <PayButton
        // @ts-ignore - This is a workaround for a bug in TypeScript
        css={overrideStyles}
        id="pay-with-ach"
        ref={buttonRef}
        type="button"
      >
        {children}
      </PayButton>
    )
  }

  return (
    <PayButton
      aria-disabled={!achPay || isSubmitting}
      // @ts-ignore - This is a workaround for a bug in TypeScript
      css={overrideStyles}
      disabled={!achPay || isSubmitting}
      id="pay-with-ach"
      ref={buttonRef}
      type="button"
    >
      <SvgIcon
        // @ts-ignore - This is a workaround for a bug in TypeScript
        css={overrideSvgStyles}
        fill="none"
        height="1em"
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
      <span>Pay with Direct debit (ACH)</span>
    </PayButton>
  )
}

export { AchPay }
export type { AchPayProps }
