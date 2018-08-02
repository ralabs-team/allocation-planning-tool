module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "parser": "babel-eslint",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "indent": [2, 2, { "SwitchCase": 1 }],
        "constructor-super": 2,
        "no-console": 0,
        "no-alert": 0,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "react/prop-types": 1,
        "react/jsx-max-props-per-line": 1,
        "react/jsx-no-bind": 1,
        "jsx-a11y/anchor-is-valid": ["error", {}],
        "no-underscore-dangle": "off",
        "react/sort-comp": "off",
        "class-methods-use-this": "off"
    }
};