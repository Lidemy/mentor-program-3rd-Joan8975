module.exports = {
    env: {
      browser: true,
      es6: true,
      node: true,
      jest: true
    },
    extends: 'airbnb',
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parser: "babel-eslint",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
    },
    plugins: [
      'react',
    ],
    rules: {
      "no-console": "off",
      "no-alert": "off",
      "import/no-unresolved": "off",
      "react/jsx-filename-extension": "off",
      "object-curly-newline": "off",
      "react/prop-types": "off",
      "react/jsx-wrap-multilines": "off",
      "react/jsx-closing-bracket-location": "off",
      "react/jsx-closing-tag-location": "off",
      "arrow-parens":"off",
      "array-callback-return":"off",
      "consistent-return": "off",
      "arrow-body-style": "off",

    },
  };