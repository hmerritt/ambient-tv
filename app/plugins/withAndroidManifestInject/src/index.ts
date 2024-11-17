import { AndroidConfig, ConfigPlugin, withAndroidManifest } from "expo/config-plugins";

const withAndroidManifestInject: ConfigPlugin = (config) => {
    return withAndroidManifest(config, (config) => {
        // Add `<uses-feature android:name="android.hardware.bluetooth_le" android:required="true"/>` to the AndroidManifest.xml
        if (!Array.isArray(config.modResults.manifest["uses-feature"])) {
            config.modResults.manifest["uses-feature"] = [];
        }

        config.modResults.manifest["uses-feature"].push({
            $: {
                "android:name": "android.hardware.touchscreen",
                "android:required": "false"
            }
        });

        config.modResults.manifest["uses-feature"].push({
            $: {
                "android:name": "android.software.leanback",
                "android:required": "false"
            }
        });

        // Add TV banner
        const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
            config.modResults
        );
        mainApplication.$["android:banner"] = "@drawable/tv_banner";

        return config;
    });
};

export default withAndroidManifestInject;
