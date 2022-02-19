const path = require('path');
const fs = require("fs");
const { merge } = require("webpack-merge");

function getPackageDir(filepath) {
  let currentDir = path.dirname(require.resolve(filepath));
  while (true) {
    if (fs.existsSync(path.join(currentDir, "package.json"))) {
      return currentDir;
    }
    const { dir, root } = path.parse(currentDir);
    if (dir === root) {
      throw new Error(
        `Could not find package.json in the parent directories starting from ${filepath}.`
      );
    }
    currentDir = dir;
  }
}

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  staticDirs: ['../public'],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config) => {
    return merge(config, {
      resolve: {
        alias: {
          ...config.resolve.alias,
          "@": path.resolve(__dirname, "../src"),
          "@emotion/core": getPackageDir("@emotion/react"),
          "@emotion/styled": getPackageDir("@emotion/styled"),
          "emotion-theming": getPackageDir("@emotion/react")
        },
      },
    });
  }
}
