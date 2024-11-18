const { withAndroidManifest } = require("@expo/config-plugins");

// https://docs.expo.dev/config-plugins/plugins-and-mods/#import-a-plugin

const withAndroidManifestInject = (config) => {
	return withAndroidManifest(config, (config) => {
		if (!Array.isArray(config.modResults.manifest["uses-feature"])) {
			config.modResults.manifest["uses-feature"] = [];
		}

		// Add `<uses-feature android:name="android.hardware.touchscreen" android:required="false"/>` to the AndroidManifest.xml
		config.modResults.manifest["uses-feature"].push({
			$: {
				"android:name": "android.hardware.touchscreen",
				"android:required": "false"
			}
		});

		// Add `<uses-feature android:name="android.software.leanback" android:required="false"/>` to the AndroidManifest.xml
		config.modResults.manifest["uses-feature"].push({
			$: {
				"android:name": "android.software.leanback",
				"android:required": "false"
			}
		});

		// Add TV banner
		if (!config.modResults.manifest["application"])
			config.modResults.manifest["application"] = {};
		if (!config.modResults.manifest["application"].$)
			config.modResults.manifest["application"].$ = {};

		// Add `<application android:icon="@mipmap/ic_launcher">`
		config.modResults.manifest["application"].$["android:icon"] =
			"@mipmap/ic_launcher";

		// Add `<application android:roundIcon="@mipmap/ic_launcher_round">`
		config.modResults.manifest["application"].$["android:roundIcon"] =
			"@mipmap/ic_launcher_round";

		// Add `<application android:banner="@drawable/tv_banner"`
		config.modResults.manifest["application"].$["android:banner"] =
			"@drawable/tv_banner";

		return config;
	});
};

module.exports = withAndroidManifestInject;
