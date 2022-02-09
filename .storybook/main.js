const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules = [
      path.resolve(__dirname, ".."),
      "node_modules",
    ];
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/src": path.resolve(__dirname, "../src"),
    };
    return config;
  }
}
