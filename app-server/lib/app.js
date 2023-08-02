const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bugcatch = require("@bug-catch/server");

const pkg = require("../package.json");
const assetsRoute = require("./routes/assetsRoute");

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.use("/images", assetsRoute); // @Legacy
server.use("/assets", assetsRoute);

// Base root welcome message
server.get("/", (req, res) => {
    res.json({
        message: "hello, world!",
        description: "ambient-tv app server",
        links: { repo: "https://github.com/hmerritt/ambient-tv" },
        routes: ["/", "/images", "/images/rss"],
        version: pkg.version,
    });
});

//  Applly bug-catch as middleware
if (
    process.env.BUGCATCH_TOKEN &&
    process.env.BUGCATCH_MONGO_URI &&
    process.env.BUGCATCH_MONGO_URI.length > 5
) {
    server.use(
        "/bug-catch",
        bugcatch({
            api: {
                token: process.env.BUGCATCH_TOKEN, // Token required for viewing collected data
                rateLimit: {
                    // Rate limiter to reduce spam
                    // Default value is 1000 requests every 1 hour (per user)
                    windowMs: 60 * 60 * 1000, // 60 minutes
                    max: 1000,
                },
            },
            mongodb: {
                uri: process.env.BUGCATCH_MONGO_URI,
                database: "ambient-tv",
            },
        })
    );
}

// Fallback server error message
server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: "somthing went wrong",
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`\n=== API listening on port ${PORT} ===\n`);
});
