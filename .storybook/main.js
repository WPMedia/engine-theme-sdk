module.exports = {
  stories: ['../stories/*.stories.@(js|jsx|mdx|tsx)'],
  addons: [
    '@storybook/addon-a11y/register',
    '@storybook/addon-backgrounds',
    '@storybook/addon-docs',
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs'
  ],
  typescript: {
    // also valid 'react-docgen-typescript' | false
    reactDocgen: 'react-docgen',
  },
};