export default {
    plugins: ["stylelint-high-performance-animation"],
    rules: {
        "plugin/no-low-performance-animation-properties": true
    },
    extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
};
