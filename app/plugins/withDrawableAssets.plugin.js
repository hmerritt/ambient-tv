const { copyFileSync } = require("fs");
const { join, basename } = require("path");
const { withDangerousMod } = require("@expo/config-plugins");

// https://stackoverflow.com/a/76773373/5446644
const withDrawableAssets = (expoConfig, files) =>
    withDangerousMod(expoConfig, [
        "android",
        (modConfig) => {
            if (modConfig.modRequest.platform === "android") {
                const androidDwarablePath = join(
                    modConfig.modRequest.platformProjectRoot,
                    "app",
                    "src",
                    "main",
                    "res",
                    "drawable"
                );

                const tvBannerFile = join(
                    modConfig.modRequest.projectRoot,
                    "assets",
                    "res",
                    "drawable",
                    "tv_banner.png"
                );

                copyFileSync(
                    tvBannerFile,
                    join(androidDwarablePath, basename(tvBannerFile))
                );
            }
            return modConfig;
        }
    ]);

module.exports = withDrawableAssets;
