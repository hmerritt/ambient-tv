const { withAndroidManifest } = require("@expo/config-plugins");

// Patch output manifest.
//
// Refer: https://docs.expo.dev/config-plugins/plugins-and-mods/ | https://chafikgharbi.com/expo-android-manifest/
module.exports = function androidManifestPlugin(config) {
    return withAndroidManifest(config, async (config) => {
        let androidManifest = config.modResults.manifest;

        androidManifest["uses-feature"] = [
            ...(androidManifest["uses-feature"] || []),
            {
                $: {
                    "android:name": "android.hardware.touchscreen",
                    "android:required": false
                }
            },
            {
                $: {
                    "android:name": "android.software.leanback",
                    "android:required": false
                }
            }
        ];

        // TV banner
        if (!androidManifest.application) androidManifest.application = {};
        if (!androidManifest.application.$) androidManifest.application.$ = {};
        androidManifest.application.$["android:banner"] = "@drawable/tv_banner";

        return config;
    });
};
