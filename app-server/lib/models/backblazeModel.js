const B2 = require("backblaze-b2");
require("dotenv").config();

// Setup b2 object
const b2 = new B2({
    applicationKeyId: process.env.B2_KEY_ID || "applicationKeyId", // or accountId: 'accountId'
    applicationKey: process.env.B2_KEY_APPLICATION || "applicationKey", // or masterApplicationKey
});

async function GetBucket(bucket_name) {
    await b2.authorize(); // must authorize first
    const response = await b2.getBucket({ bucketName: bucket_name });
    return response.data.buckets[0];
}

async function ListBucketFiles(bucket_id) {
    const files = [];
    let startFileName = null;

    while (true) {
        const response = await b2.listFileNames({
            bucketId: bucket_id,
            startFileName: startFileName,
            maxFileCount: 999,
            delimiter: "",
            prefix: "",
        });

        files.push(...response.data.files);

        if (response.data.nextFileName == null) break;

        startFileName = response.data.nextFileName;
    }

    return files;
}

async function GetBucketFiles(bucket_name) {
    // Fetch bucket info
    const bucket = await GetBucket(bucket_name);

    // Fetch bucket files
    const files = await ListBucketFiles(bucket.bucketId);

    return files;
}

module.exports = {
    GetBucket,
    ListBucketFiles,
    GetBucketFiles,
};
