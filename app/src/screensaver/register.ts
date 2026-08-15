import { AppRegistry, Platform } from "react-native";

import ScreensaverApp from "./ScreensaverApp";

if (Platform.OS === "android") {
    AppRegistry.registerComponent("AmbientTVScreensaver", () => ScreensaverApp);
}
