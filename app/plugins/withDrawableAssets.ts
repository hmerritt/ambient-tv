import { type ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import { copyFileSync, mkdirSync } from "node:fs";
import { basename, join } from "node:path";

// https://docs.expo.dev/config-plugins/plugins-and-mods/#import-a-plugin

const withDrawableAssets: ConfigPlugin = (config) => {
    return withDangerousMod(config, [
        "android",
        async (config) => {
            if (config.modRequest.platform === "android") {
                const sourceResPath = join(
                    config.modRequest.projectRoot,
                    "assets",
                    "res"
                );
                const androidResPath = join(
                    config.modRequest.platformProjectRoot,
                    "app",
                    "src",
                    "main",
                    "res"
                );
                const androidDrawablePath = join(androidResPath, "drawable");

                // Copy the TV banner file
                copyFileSync(
                    join(sourceResPath, "drawable", "tv_banner.png"),
                    join(androidDrawablePath, basename("tv_banner.png"))
                );

                // // Copy the mipmap files (app icon)
                // const mipmapSuffixes = ["hdpi", "mdpi", "xhdpi", "xxhdpi", "xxxhdpi"];
                // const filesMipmap = ["ic_launcher.png", "ic_launcher_round.png"];
                // for (const mipmapSuffix of mipmapSuffixes) {
                //     mkdirSync(join(androidResPath, `mipmap-${mipmapSuffix}`), {
                //         recursive: true
                //     });
                //     for (const file of filesMipmap) {
                //         const sourcePath = join(
                //             sourceResPath,
                //             `mipmap-${mipmapSuffix}`,
                //             file
                //         );
                //         copyFileSync(
                //             sourcePath,
                //             join(androidResPath, `mipmap-${mipmapSuffix}`, basename(file))
                //         );
                //     }
                // }
            }

            return config;
        }
    ]);
};

export default withDrawableAssets;
