const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
    outputDir: "build/dist",
    transpileDependencies: true,
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true
            }
        }
    }
});
