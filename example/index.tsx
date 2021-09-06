import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SquarePaymentsForm, CreditCardInput } from '../.';

const App = () => {
  return (
    <div>
      <SquarePaymentsForm
        applicationId="sandbox-sq0idb-7KE3zXHZLG_X5EmLLptTYw"
        cardTokenizeResponseReceived={(props) => {
          console.info(props);
        }}
        locationId="4P550BZQ0TQZA"
      >
        <CreditCardInput />
      </SquarePaymentsForm>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
