const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
const reqAuthentication =
    process.env.REQUIRE_AUTHENTICATION === "true" || false;
const debugMode = process.env.DEBUG_MODE === "true" || false;

if (reqAuthentication) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL
        })
    });
}

const firebaseAuthMiddleware = async (req, res, next) => {
    if (!reqAuthentication) {
        return next();
    }
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const idToken = header.split("Bearer ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        if (debugMode) {
            console.log(decodedToken.email, "requested", req.path);
        }
        req.headers.email = decodedToken.email;
        next();
    } catch (error) {
        console.error("Error while verifying Firebase ID token:", error);
        return res.status(403).json({ error: "Unauthorized" });
    }
};

app.use(express.static(path.join(__dirname, "./dist")));

app.use(
    "/api",
    firebaseAuthMiddleware,
    createProxyMiddleware({
        target: `${process.env.API_PROTOCOL || "http"}://${
            process.env.API_HOST || "localhost"
        }:${process.env.API_PORT || "3000"}/api`,
        changeOrigin: true,
        logLevel: "debug"
    })
);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.listen(port, () => {
    console.info(`Server running on port ${port}`);
    console.info(
        `Proxying API requests to ${process.env.API_PROTOCOL || "http"}://${
            process.env.API_HOST || "localhost"
        }:${process.env.API_PORT || "3000"}/api`
    );
    if (reqAuthentication) {
        console.info("Authentication is enabled.");
    } else {
        console.warn(
            "Warning: Authentication is disabled. This is not recommended for production environments."
        );
    }
});
