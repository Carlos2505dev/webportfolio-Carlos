module.exports = {
    'root': true,
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/vue3-essential'
    ],
    'overrides': [
        {
            files: ['layouts/*.vue', 'pages/**/*.vue'],
            rules: { 'vue/multi-word-component-names': 'off' }
        },
        {
            files: ['stores/*.js', 'server/api/*.js'],
            rules: {'no-undef': 'off'}
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'vue'
    ],
    'rules': {
        'comma-dangle': ['error', 'never'],
        'linebreak-style': 0,
        'indent': [
            'error',
            4
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'vue/component-api-style': ['error',
            ['script-setup']
        ],
        'vue/no-dupe-keys': ['off'],
        'vue/v-on-style': ['error', 'shorthand'],
        'vue/v-bind-style': ['error', 'shorthand'],
        'vue/v-slot-style': ['error', 'shorthand'],
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        }],
        'vue/html-self-closing': ['error', {
            'html': {
                'void': 'always',
                'normal': 'always',
                'component': 'always'
            },
            'svg': 'always',
            'math': 'always'
        }],
        'vue/no-static-inline-styles': ['error', {
            'allowBinding': false
        }],
        'vue/attributes-order': ['error', {
            'order': [
                'DEFINITION',
                'LIST_RENDERING',
                'CONDITIONALS',
                'RENDER_MODIFIERS',
                'GLOBAL',
                ['UNIQUE', 'SLOT'],
                'TWO_WAY_BINDING',
                'OTHER_DIRECTIVES',
                'OTHER_ATTR',
                'EVENTS',
                'CONTENT'
            ],
            'alphabetical': false
        }],
        'vue/html-closing-bracket-newline': ['error', {
            'singleline': 'never',
            'multiline': 'always'
        }],
        'vue/max-attributes-per-line': ['error', {
            'singleline': {
                'max': 2
            },      
            'multiline': {
                'max': 1
            }
        }],
        'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
        'vue/no-multi-spaces': ['error', {
            'ignoreProperties': false
        }],
        'vue/mustache-interpolation-spacing': ['error', 'always'],
        'vue/html-quotes': [ 'error', 'double', { 'avoidEscape': false } ],
        'vue/no-side-effects-in-computed-properties': ['error'],
        'vue/component-definition-name-casing': ['error', 'PascalCase']
    }
}
