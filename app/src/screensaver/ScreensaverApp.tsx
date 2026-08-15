import { useFonts } from "expo-font";

import AmbientScene from "@/components/AmbientScene";

export default function ScreensaverApp() {
    const [fontsLoaded] = useFonts({
        "Roboto-Medium": require("../../assets/fonts/Roboto/Roboto-Medium.ttf")
    });

    if (!fontsLoaded) return null;

    return <AmbientScene interactive={false} requestLocationPermission={false} />;
}
