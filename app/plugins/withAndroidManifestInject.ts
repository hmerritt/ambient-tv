import configPlugins, { type ConfigPlugin } from "@expo/config-plugins";

const { withAndroidManifest } = configPlugins;

// https://docs.expo.dev/config-plugins/plugins-and-mods/#import-a-plugin

const withAndroidManifestInject: ConfigPlugin = (config) => {
    return withAndroidManifest(config, (config) => {
        const manifest = config.modResults.manifest;

        if (!Array.isArray(manifest["uses-feature"])) {
            manifest["uses-feature"] = [];
        }

        // Add `<uses-feature android:name="android.hardware.touchscreen" android:required="false"/>` to the AndroidManifest.xml
        manifest["uses-feature"].push({
            $: {
                "android:name": "android.hardware.touchscreen",
                "android:required": "false"
            }
        });

        // Add `<uses-feature android:name="android.software.leanback" android:required="false"/>` to the AndroidManifest.xml
        manifest["uses-feature"].push({
            $: {
                "android:name": "android.software.leanback",
                "android:required": "false"
            }
        });

        // Get the application node
        if (!manifest["application"] || !Array.isArray(manifest["application"])) {
            throw new Error("No application array in manifest?");
        }

        const application = manifest["application"]?.find(
            (item) => item.$["android:name"] === ".MainApplication"
        );
        if (!application) {
            throw new Error("No MainApplication in manifest?");
        }

        // Add TV banner
        application["$"]["android:banner"] = "@drawable/tv_banner"; // Add `<application android:banner="@drawable/tv_banner"`
        application["$"]["android:icon"] = "@mipmap/ic_launcher"; // Add `<application android:icon="@mipmap/ic_launcher">`
        application["$"]["android:roundIcon"] = "@mipmap/ic_launcher_round"; // Add `<application android:roundIcon="@mipmap/ic_launcher_round">`

        return config;
    });
};

export default withAndroidManifestInject;
