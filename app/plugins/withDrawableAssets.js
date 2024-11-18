const { withDangerousMod } = require("@expo/config-plugins");
const { copyFileSync } = require("fs");
const { basename, join } = require("path");

// https://docs.expo.dev/config-plugins/plugins-and-mods/#import-a-plugin

const withDrawableAssets = (config, { files = [] } = {}) => {
    return withDangerousMod(config, [
        "android",
        async (config) => {
            if (config.modRequest.platform === "android") {
                const androidDrawablePath = join(
                    config.modRequest.platformProjectRoot,
                    "app",
                    "src",
                    "main",
                    "res",
                    "drawable"
                );

                const tvBannerFile = join(
                    config.modRequest.projectRoot,
                    "assets",
                    "res",
                    "drawable",
                    "tv_banner.png"
                );

                // Copy the TV banner file
                copyFileSync(
                    tvBannerFile,
                    join(androidDrawablePath, basename(tvBannerFile))
                );

                // Copy any additional files if provided
                if (files.length > 0) {
                    for (const file of files) {
                        const sourcePath = join(
                            config.modRequest.projectRoot,
                            "assets",
                            "res",
                            "drawable",
                            file
                        );
                        copyFileSync(
                            sourcePath,
                            join(androidDrawablePath, basename(file))
                        );
                    }
                }
            }

            return config;
        }
    ]);
};

module.exports = withDrawableAssets;
