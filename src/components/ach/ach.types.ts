// Dependencies
import type * as Square from '@square/web-sdk';
import type * as Stitches from '@stitches/react';
import type * as React from 'react';

// Internals
import { PayButton, SvgIcon } from './ach.styles';

export interface PlaidLinkOnEventMetadata {
  error_type: null | string;
  error_code: null | string;
  error_message: null | string;
  exit_status: null | string;
  institution_id: null | string;
  institution_name: null | string;
  institution_search_query: null | string;
  mfa_type: null | string;
  // see possible values for view_name at https://plaid.com/docs/link/web/#link-web-onevent-view-name
  view_name: null | string;
  // see possible values for selection at https://plaid.com/docs/link/web/#link-web-onevent-selection
  selection: null | string;
  // ISO 8601 format timestamp
  timestamp: string;
  link_session_id: string;
  request_id: string;
}

// The following event names are stable and will not be deprecated or changed
export enum PlaidLinkStableEvent {
  OPEN = 'OPEN',
  EXIT = 'EXIT',
  HANDOFF = 'HANDOFF',
  SELECT_INSTITUTION = 'SELECT_INSTITUTION',
  ERROR = 'ERROR',
}

export type AchPayButtonProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'aria-disabled' | 'disabled' | 'type'
> & {
  /**
   * Sets the style for the Payment Button using a CSS object
   *
   * @example
   *
   * ```js
   * const overrideStyles = {
   *   background: 'white',
   *   '&:hover': {
   *     background: 'rgba(1, 208, 158, 0.1)',
   *   },
   * };
   * ```
   */
  css?: Stitches.ComponentProps<typeof PayButton>['css'];
  /** Control the loading state of the button a.k.a disabling the button. */
  isLoading?: boolean;
};

export type SvgProps = React.ComponentPropsWithRef<'svg'> & {
  /**
   * Sets the style for the SVG using a CSS object
   *
   * @example
   *
   * ```js
   * const overrideStyles = {
   *   background: 'white',
   *   '&:hover': {
   *     background: 'rgba(1, 208, 158, 0.1)',
   *   },
   * };
   * ```
   */
  css?: Stitches.ComponentProps<typeof SvgIcon>['css'];
};

export interface AchBase extends Square.AchOptions, Square.AchChargeTokenOptions {
  callbacks?: {
    /** The user has completed the Assets and Bank Income Insights flow. */
    bankIncomeInsightsCompleted?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /**
     * The user closed the third-party website or mobile app without completing
     * the OAuth flow.
     */
    closeOauth?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /** A recoverable error occurred in the Link flow, see the `error_code` metadata. */
    error?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /**
     * The user has exited without completing the Link flow and the
     * [onExit](https://plaid.com/docs/link/web/#onexit) callback is fired.
     */
    exit?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /** The user encountered an error while completing the third-party's OAuth login flow. */
    failOauth?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /** The user has exited Link after successfully linking an Item. */
    handoff?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /** The user selected an institution that was presented as a matched institution. */
    matchedSelectInstitution?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /** The user selected a verification method for a matched institution. */
    matchedSelectVerifyMethod?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /** The user has opened Link. */
    open?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /**
     * The user has opened my.plaid.com. This event is only sent when Link is
     * initialized with Assets as a product
     */
    openMyPlaid?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /**
     * The user has navigated to a third-party website or mobile app in order to
     * complete the OAuth login flow.
     */
    openOauth?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /** The user has searched for an institution. */
    searchInstitution?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /**
     * The user selected a brand, e.g. Bank of America. The `SELECT_BRAND` event
     * is only emitted for large financial institutions with multiple online
     * banking portals.
     */
    selectBrand?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /**
     * The user selected an instititon with a `DEGRADED` health status and were
     * shown a corresponding message.
     */
    selectDegradedInstitution?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /**
     * The user selected an instititon with a `DOWN` health status and were
     * shown a corresponding message.
     */
    selectDownInstitution?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /** The user selected an institution. */
    selectInstitution?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /** The user has submitted credentials. */
    submitCredentials?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /** The user is being prompted to submit documents for an Income verification flow. */
    submitDocuments?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /**
     * The user encountered an error when submitting documents for an Income
     * verification flow.
     */
    submitDocumentsError?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /** The user has submitted MFA. */
    submitMfa?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
    /**
     * The `TRANSITION_VIEW` event indicates that the user has moved from one
     * view to the next.
     */
    transitionView?(event: Square.SqEvent<PlaidLinkOnEventMetadata>): void;
  };
}

export interface AchWithChildrenProps extends AchBase {
  /**
   * The children of the button to override icon and text, you can put any
   * component inside the button.
   */
  children?: React.ReactNode;
}

export interface AchWithoutChildrenProps extends AchBase {
  /**
   * Props to be passed to the `<button>` element. The following props are not
   * supported: `aria-disabled`, `disabled`, `type`. Since we use that to
   * control the disabled state of the button, we don't support it.
   *
   * But in addition to this we offer a `isLoading` prop to control the loading
   * state of the button a.k.a disabling the button.
   */
  buttonProps?: AchPayButtonProps;
  /** Props to be passed to the `<svg>` element. */
  svgProps?: SvgProps;
}

export interface AchProps extends AchBase {
  /**
   * The children of the button to override icon and text, you can put any
   * component inside the button.
   */
  children?: React.ReactNode;
  /**
   * Props to be passed to the `<button>` element. The following props are not
   * supported: `aria-disabled`, `disabled`, `type`. Since we use that to
   * control the disabled state of the button, we don't support it.
   *
   * But in addition to this we offer a `isLoading` prop to control the loading
   * state of the button a.k.a disabling the button.
   */
  buttonProps?: AchPayButtonProps;
  /** Props to be passed to the `<svg>` element. */
  svgProps?: SvgProps;
}
