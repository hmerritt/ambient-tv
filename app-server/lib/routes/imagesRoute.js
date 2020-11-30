const express = require("express");

const imagesController = require("../controllers/imagesController");
const rssController = require("../controllers/rssController");

const router = express.Router();

// Fetch images from b2
imagesController.populateImageStore();

/*
 * Returns list of images as JSON
 */
router.get("/", async (req, res, next) => {
    try {
        const images = imagesController.images() || [];

        res.json(images);
    } catch (err) {
        console.log(err);
        res.status(500).json([]);
    }
});

/*
 * Returns list of images as RSS
 */
router.get("/rss", async (req, res, next) => {
    try {
        const images = imagesController.images() || [];
        const rss = new rssController();
        rss.set("data", images);

        res.contentType("application/xml");
        res.send(rss.get());
    } catch (err) {
        console.log(err);
        res.status(500).json([]);
    }
});

module.exports = router;
