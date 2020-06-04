import { configure } from "@storybook/react"
import { withA11y } from '@storybook/addon-a11y';
import { addDecorator } from '@storybook/react';

const req = require.context("../stories", true, /.stories.tsx$/)
function loadStories() {
  req.keys().forEach(req)
}

addDecorator(withA11y);

configure(loadStories, module)