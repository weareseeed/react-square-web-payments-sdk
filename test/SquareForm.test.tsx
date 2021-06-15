import React from 'react';
import * as ReactDOM from 'react-dom';

describe('SquareForm', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<>Hello world</>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
