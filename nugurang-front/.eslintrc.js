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
    "jsx-a11y/img-redundant-alt": "off",
    "no-await-in-loop": "off",
    "no-plusplus": "off",
    "no-restricted-syntax": "off",
    "no-shadow": "off",
    "no-trailing-spaces": "error",
    "no-unused-vars": "warn",
    "react/destructuring-assignment": "off",
    "react/display-name": "warn",
    "react/forbid-prop-types": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-first-prop-new-line": "off",
    "react/jsx-fragments": "warn",
    "react/jsx-key": "off",
    "react/jsx-one-expression-per-line": "warn",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "sort-imports": "warn"
  }
};
