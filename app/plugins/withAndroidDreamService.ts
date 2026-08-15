import {
    type ConfigPlugin,
    withAndroidManifest,
    withDangerousMod
} from "@expo/config-plugins";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SERVICE_CLASS_NAME = "AmbientDreamService";
const REACT_COMPONENT_NAME = "AmbientTVScreensaver";

const withAndroidDreamService: ConfigPlugin = (config) => {
    const packageName = config.android?.package;
    if (!packageName) {
        throw new Error("An Android package is required to generate the dream service");
    }

    config = withAndroidManifest(config, (config) => {
        const application = config.modResults.manifest.application?.[0];
        if (!application) {
            throw new Error("No application node found in AndroidManifest.xml");
        }

        if (!Array.isArray(application.service)) {
            application.service = [];
        }

        const service = {
            $: {
                "android:name": `.${SERVICE_CLASS_NAME}`,
                "android:exported": "true" as const,
                "android:icon": "@mipmap/ic_launcher",
                "android:label": "@string/app_name",
                "android:permission": "android.permission.BIND_DREAM_SERVICE"
            },
            "intent-filter": [
                {
                    action: [
                        {
                            $: {
                                "android:name": "android.service.dreams.DreamService"
                            }
                        }
                    ],
                    category: [
                        {
                            $: {
                                "android:name": "android.intent.category.DEFAULT"
                            }
                        }
                    ]
                }
            ]
        };

        const existingServiceIndex = application.service.findIndex(
            (item) => item.$?.["android:name"] === `.${SERVICE_CLASS_NAME}`
        );

        if (existingServiceIndex === -1) {
            application.service.push(service);
        } else {
            application.service[existingServiceIndex] = service;
        }

        return config;
    });

    return withDangerousMod(config, [
        "android",
        async (config) => {
            const packagePath = packageName.split(".");
            const sourceDirectory = join(
                config.modRequest.platformProjectRoot,
                "app",
                "src",
                "main",
                "java",
                ...packagePath
            );

            mkdirSync(sourceDirectory, { recursive: true });
            writeFileSync(
                join(sourceDirectory, `${SERVICE_CLASS_NAME}.kt`),
                createDreamServiceSource(packageName)
            );

            return config;
        }
    ]);
};

const createDreamServiceSource = (packageName: string) => `package ${packageName}

import android.service.dreams.DreamService
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.interfaces.fabric.ReactSurface

class ${SERVICE_CLASS_NAME} : DreamService() {
  private var reactSurface: ReactSurface? = null

  private val reactHost: ReactHost
    get() = checkNotNull((application as ReactApplication).reactHost)

  override fun onAttachedToWindow() {
    super.onAttachedToWindow()

    isInteractive = false
    isFullscreen = true

    reactHost.onHostResume(null)

    val surface = reactHost.createSurface(this, REACT_COMPONENT_NAME, null)
    reactSurface = surface
    setContentView(checkNotNull(surface.view))
    surface.start()
  }

  override fun onDetachedFromWindow() {
    reactSurface?.stop()
    reactSurface = null

    reactHost.onHostPause()
    reactHost.onHostDestroy()

    super.onDetachedFromWindow()
  }

  private companion object {
    const val REACT_COMPONENT_NAME = "${REACT_COMPONENT_NAME}"
  }
}
`;

export default withAndroidDreamService;
