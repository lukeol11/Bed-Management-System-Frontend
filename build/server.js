const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "./dist")));

app.use(
    "/api",
    createProxyMiddleware({
        target: "http://localhost:3000/api",
        changeOrigin: true
    })
);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
