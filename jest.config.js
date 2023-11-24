module.exports = {
    preset: "@vue/cli-plugin-unit-jest",
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,vue}",
        "!src/firebaseConfig.js",
        "!src/main.js"
    ]
};
