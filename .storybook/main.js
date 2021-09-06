// Dependencies
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

/**
 * @type {import('@storybook/react/types').StorybookConfig}
 */
module.exports = {
  stories: ['../src/**/__docs__/**/*.mdx', '../src/**/__docs__/**/*.tsx'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
  ],
  reactOptions: {
    fastRefresh: true,
  },
  typescript: {
    check: true,
  },
  webpackFinal: async (config) => {
    [].push.apply(config.resolve.plugins, [
      new TsconfigPathsPlugin({ extensions: config.resolve.extensions }),
    ]);

    return config;
  },
};
