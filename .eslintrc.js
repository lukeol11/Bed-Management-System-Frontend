module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended"],
    rules: {
        "no-console": import.meta.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": import.meta.NODE_ENV === "production" ? "warn" : "off"
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)"
            ],
            env: {
                jest: true,
                es2022: true
            }
        }
    ]
};
