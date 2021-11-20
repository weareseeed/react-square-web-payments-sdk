// Dependencies
import { addons } from '@storybook/addons'
import { themes } from '@storybook/theming'

addons.setConfig({
  theme: {
    ...themes.light,
    brandImage: './logo.png',
    brandTitle: 'react-square-web-payments-sdk',
    fontBase:
      '"Square Market", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
})
