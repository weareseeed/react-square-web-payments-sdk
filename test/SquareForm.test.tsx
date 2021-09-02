// Dependencies
import * as React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

// Internals
import SquarePaymentsForm from '../src';
import type { SquarePaymentsFormProps } from '../src';

describe('SquarePaymentsForm', () => {
  const renderForm = async (
    children: SquarePaymentsFormProps['children'],
    props?: SquarePaymentsFormProps
  ) => {
    cleanup();

    const view = render(
      <SquarePaymentsForm
        {...props}
        applicationId="sandbox-sq0idb-7KE3zXHZLG_X5EmLLptTYw"
        cardTokenizeResponseReceived={(props) => {
          console.info(props);
        }}
        locationId="4P550BZQ0TQZA"
      >
        {children}
      </SquarePaymentsForm>,
      { hydrate: true }
    );

    const form = await screen.findByTestId('rswps-form');

    return { view, form };
  };

  // TODO: make this test pass when rendering the component
  it('should render without crashing', async () => {
    const { form } = await renderForm(null);

    expect(form).toBeInTheDocument();
  });
});
