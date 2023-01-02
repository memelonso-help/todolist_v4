module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        'react/jsx-indent': [2, 4],
        indent: 'off',
        'arrow-body-style': ['error', 'always'],
        'no-console': 'off',
        ' treatUndefinedAsUnspecified': 'off',
        'no-underscore-dangle': ['error', { allow: ['_id'] }],
        'no-param-reassign': [2, { props: false }],
        'react/jsx-no-duplicate-props': 0,
    },
};
