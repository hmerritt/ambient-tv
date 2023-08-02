const path = require("path");
const cron = require("cron");
require("dotenv").config();

const backblaze = require("../models/backblazeModel");
const Storage = require("./storageController");

// Create asset store
const assetStore = new Storage();

async function populateAssetStore() {
	// Fetch all bucket files
	const files = await backblaze.GetBucketFiles(process.env.B2_BUCKET);

	// Filter non-asset files
	const assetFiles = files.filter((file) =>
		file.contentType.includes("image") || file.contentType.includes("video")
	);

	// Format asset object
	const assetObjects = assetFiles.map((asset) => formatAssetObject(asset));

	// Add assets to store
	assetStore.set(assetObjects);
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

function formatAssetObject(b2File) {
	const asset = {};
	asset.b2 = {};

	asset.b2.fileName = b2File.fileName;
	asset.b2.contentType = b2File.contentType;

	const matchFileName = b2File.fileName.match(/(?<=images|videos\/.*\/).*/);
	asset.fileName = matchFileName ? matchFileName[0] : "";

	const matchCategory = b2File.fileName.match(/(?<=images|videos\/)(.*)(?=\/)/);
	asset.category = matchCategory ? matchCategory[0] : "";

	const name = path.parse(asset.fileName).name;
	const nameShort = name.split("--")[0];
	const descAttr = nameShort.split("__");
	asset.description = descAttr[0].replace(/-/g, " ");
	asset.attribution = descAttr[1] ? descAttr[1].replace(/-/g, " ") : "";

	asset.link = `${process.env.B2_ACCESS_LINK}/file/${process.env.B2_BUCKET}/${b2File.fileName}`;

	return asset;
}

function assets() {
	return assetStore.get();
}

module.exports = {
	assets,
	populateAssetStore,
	formatAssetObject,
	startCronJob,
};
