const express = require("express");
const cors = require("cors");
const pkg = require("../package.json");
const imagesRoute = require("./routes/imagesRoute");

const server = express();

server.use(cors());

server.use("/images", imagesRoute);

// Base root welcome message
server.get("/", (req, res) => {
    res.json({
        message: "hello, world!",
        description: "ambient-tv app server",
        links: { repo: "https://github.com/hmerritt/ambient-tv" },
        routes: ["/", "/images", "/images/:category"],
        version: pkg.version,
    });
});

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
