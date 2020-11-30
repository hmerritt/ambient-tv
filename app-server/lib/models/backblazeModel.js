const B2 = require("backblaze-b2");
require("dotenv").config();

// Setup b2 object
const b2 = new B2({
    applicationKeyId: process.env.B2_KEY_ID || "applicationKeyId", // or accountId: 'accountId'
    applicationKey: process.env.B2_KEY_APPLICATION || "applicationKey", // or masterApplicationKey
});

async function GetBucket(bucket_name) {
    await b2.authorize(); // must authorize first
    let response = await b2.getBucket({ bucketName: bucket_name });
    return response.data.buckets[0];
}

module.exports = {
    GetBucket,
};
