module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "airbnb",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    "react": {
      "version": "detect"
    }
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off",
    "react/display-name": "warn",
    "react/prop-types": "warn",
    "react/jsx-props-no-spreading": "warn",
    "react/jsx-one-expression-per-line": "warn",
    "react/jsx-fragments": "warn",
    "react/forbid-prop-types": "warn",
    "react/destructuring-assignment": "off",
    "react/jsx-first-prop-new-line": "off"
  }
};
