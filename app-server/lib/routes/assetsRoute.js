const express = require("express");

const assetsController = require("../controllers/assetsController");
const rssController = require("../controllers/rssController");

const router = express.Router();

// Fetch assets from b2
assetsController.populateAssetStore();
assetsController.startCronJob("0 0 * * *", assetsController.populateAssetStore);

/*
 * Returns list of assets as JSON
 */
router.get("/", async (req, res, next) => {
    try {
        const assets = assetsController.assets() || [];

        res.json(assets);
    } catch (err) {
        console.log(err);
        res.status(500).json([]);
    }
});

/*
 * Returns list of assets as RSS
 */
router.get("/rss", async (req, res, next) => {
    try {
        const assets = assetsController.assets() || [];
        const rss = new rssController();
        rss.set("data", assets);

        res.contentType("application/xml");
        res.send(rss.get());
    } catch (err) {
        console.log(err);
        res.status(500).json([]);
    }
});

module.exports = router;
