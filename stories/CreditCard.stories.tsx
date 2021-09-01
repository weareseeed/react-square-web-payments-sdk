// Dependencies
import * as React from 'react';
import { Meta, Story } from '@storybook/react';

// Internals
import {
  CreditCardInput,
  CreditCardInputProps,
  SquarePaymentsForm,
} from '../src';
import { verificationDetails } from '../src/utils/storybook';

export default {
  title: 'Credit Card',
  component: CreditCardInput,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    focus: {
      defaultValue: 'cardNumber',
    },
  },
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
  },
} as Meta;

const Template: Story<CreditCardInputProps> = (args) => (
  <SquarePaymentsForm
    applicationId="sandbox-sq0idb-7KE3zXHZLG_X5EmLLptTYw"
    cardTokenizeResponseReceived={(token, buyer) => {
      console.info({ token, buyer });
    }}
    createVerificationDetails={verificationDetails}
    locationId="4P550BZQ0TQZA"
  >
    <CreditCardInput {...args} />
  </SquarePaymentsForm>
);

export const Default = Template.bind({});
Default.storyName = 'Basic Credit Card';
Default.args = {};

export const withCardBrandChanged = Template.bind({});
withCardBrandChanged.args = {
  cardBrandChanged: ({ detail, type }) => {
    console.info({ detail, type });
  },
  cardContainerId: 'card-container-cardBrandChanged',
  submitButtonId: 'pay-with-card-cardBrandChanged',
} as CreditCardInputProps;
withCardBrandChanged.story = {
  parameters: {
    docs: {
      storyDescription:
        'Callback function that is called when the payment form detected a new likely credit card brand based on the card number. <br /> **You need to open the console to see the result**',
    },
  },
};
withCardBrandChanged.storyName = 'Callback: cardBrandChanged';

export const withErrorClassAdded = Template.bind({});
withErrorClassAdded.args = {
  errorClassAdded: ({ detail, type }) => {
    console.info({ detail, type });
  },
  cardContainerId: 'card-container-errorClassAdded',
  submitButtonId: 'pay-with-card-errorClassAdded',
} as CreditCardInputProps;
withErrorClassAdded.story = {
  parameters: {
    docs: {
      storyDescription:
        'Callback function that is called when a form field has an invalid value, and the corresponding error CSS class was added to the element. <br /> **You need to open the console to see the result**',
    },
  },
};
withErrorClassAdded.storyName = 'Callback: errorClassAdded';

export const withErrorClassRemoved = Template.bind({});
withErrorClassRemoved.args = {
  errorClassRemoved: ({ detail, type }) => {
    console.info({ detail, type });
  },
  cardContainerId: 'card-container-errorClassRemoved',
  submitButtonId: 'pay-with-card-errorClassRemoved',
} as CreditCardInputProps;
withErrorClassRemoved.story = {
  parameters: {
    docs: {
      storyDescription:
        'Callback function that is called when an invalid value on a form field was corrected, and the corresponding error CSS class was removed from the element <br /> **You need to open the console to see the result**',
    },
  },
};
withErrorClassRemoved.storyName = 'Callback: errorClassRemoved';

export const withFocusClassAdded = Template.bind({});
withFocusClassAdded.args = {
  focusClassAdded: ({ detail, type }) => {
    console.info({ detail, type });
  },
  cardContainerId: 'card-container-focusClassAdded',
  submitButtonId: 'pay-with-card-focusClassAdded',
} as CreditCardInputProps;
withFocusClassAdded.story = {
  parameters: {
    docs: {
      storyDescription:
        'Callback function that is called when a form field gained focus, and the corresponding focus CSS class was added to the element. <br /> **You need to open the console to see the result**',
    },
  },
};
withFocusClassAdded.storyName = 'Callback: focusClassAdded';

export const withFocusClassRemoved = Template.bind({});
withFocusClassRemoved.args = {
  focusClassRemoved: ({ detail, type }) => {
    console.info({ detail, type });
  },
  cardContainerId: 'card-container-focusClassRemoved',
  submitButtonId: 'pay-with-card-focusClassRemoved',
} as CreditCardInputProps;
withFocusClassRemoved.story = {
  parameters: {
    docs: {
      storyDescription:
        'Callback function that is called when a form field lost focus, and the corresponding focus CSS class was removed from the element. <br /> **You need to open the console to see the result**',
    },
  },
};
withFocusClassRemoved.storyName = 'Callback: focusClassRemoved';

export const withPostalCodeChanged = Template.bind({});
withPostalCodeChanged.args = {
  postalCodeChanged: ({ detail, type }) => {
    console.info({ detail, type });
  },
  cardContainerId: 'card-container-postalCodeChanged',
  submitButtonId: 'pay-with-card-postalCodeChanged',
} as CreditCardInputProps;
withPostalCodeChanged.story = {
  parameters: {
    docs: {
      storyDescription:
        'Callback function that is called when the current value of the postal code form field changed. <br /> **You need to open the console to see the result**',
    },
  },
};
withPostalCodeChanged.storyName = 'Callback: postalCodeChanged';

export const withScape = Template.bind({});
withScape.args = {
  scape: ({ detail, type }) => {
    console.info({ detail, type });
  },
  cardContainerId: 'card-container-scape',
  submitButtonId: 'pay-with-card-scape',
} as CreditCardInputProps;
withScape.story = {
  parameters: {
    docs: {
      storyDescription:
        'Callback function that is called when the user pressed the "Escape" key while editing a field. <br /> **You need to open the console to see the result**',
    },
  },
};
withScape.storyName = 'Callback: scape';

export const withSubmit = Template.bind({});
withSubmit.args = {
  submit: ({ detail, type }) => {
    console.info({ detail, type });
  },
  cardContainerId: 'card-container-submit',
  submitButtonId: 'pay-with-card-submit',
} as CreditCardInputProps;
withSubmit.story = {
  parameters: {
    docs: {
      storyDescription:
        'Callback function that is called when the user has triggered submission of the form by pressing "Enter" while editing a field. <br /> **You need to open the console to see the result**',
    },
  },
};
withSubmit.storyName = 'Callback: submit';
