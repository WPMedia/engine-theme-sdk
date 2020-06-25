import { addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import '@storybook/addon-console';

addDecorator(withA11y);

const parameters = {
  backgrounds: {
    default: 'white',
    values: [
      { name: 'white', value: 'white' },
      { name: 'black', value: 'black' },
      { name: 'grey', value: 'grey' },
    ],
  },
};

addParameters(parameters);