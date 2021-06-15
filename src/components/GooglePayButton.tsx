// Vendor Modules
import * as React from 'react';

// Internals
import FormContext from '../contexts';

interface Props {
  /** Placeholder view when the Google Pay is being initialized */
  loadingView?: React.ReactNode;
  /** Placeholder view when Google Pay is not available */
  unavailableView?: React.ReactNode;
}

/**
 * Renders a Google Pay button to use in the Square Web Payment SDK, pre-styled to meet Google's branding guidelines.
 */
export const GooglePayButton = ({
  loadingView,
  unavailableView,
}: Props): JSX.Element => {
  const { googlePay } = React.useContext(FormContext);

  return (
    <>
      <div
        id="google-pay-button"
        style={{ display: googlePay === 'ready' ? 'block' : 'none' }}
      ></div>
      {googlePay === 'loading' && loadingView}
      {googlePay === 'unavailable' && unavailableView}
    </>
  );
};

export default GooglePayButton;
