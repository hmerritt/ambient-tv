const path = require("path");
const cron = require("cron");
require("dotenv").config();

const backblaze = require("../models/backblazeModel");
const Storage = require("./storageController");

// Create image store
const imageStore = new Storage();

async function populateImageStore() {
    // Fetch all bucket files
    const files = await backblaze.GetBucketFiles(process.env.B2_BUCKET);

    // Filter non-image files
    const imageFiles = files.filter((file) =>
        file.contentType.includes("image")
    );

    // Format image object
    const imageObjects = imageFiles.map((image) => formatImageObject(image));

    // Add images to store
    imageStore.set(imageObjects);
}

async function startCronJob(cronStamp, callback) {
    // cron stamps:
    // -> 0 */12 * * * : every 12 hours
    // -> 0 0 * * *    : at 00:00
    const cronJob = new cron.CronJob(
        cronStamp,
        callback,
        null,
        true,
        "Europe/London"
    );
    cronJob.start();
}

function formatImageObject(b2File) {
    const image = {};
    image.b2 = {};

    image.b2.fileName = b2File.fileName;
    image.b2.contentType = b2File.contentType;

    const matchFileName = b2File.fileName.match(/(?<=images\/.*\/).*/);
    image.fileName = matchFileName ? matchFileName[0] : "";

    const matchCategory = b2File.fileName.match(/(?<=images\/)(.*)(?=\/)/);
    image.category = matchCategory ? matchCategory[0] : "";

    const name = path.parse(image.fileName).name;
    const nameShort = name.split("--")[0];
    image.description = nameShort.replace(/-/g, " ");

    image.link = `${process.env.B2_ACCESS_LINK}/file/${process.env.B2_BUCKET}/${b2File.fileName}`;

    return image;
}

function images() {
    return imageStore.get();
}

module.exports = {
    images,
    populateImageStore,
    formatImageObject,
    startCronJob,
};
