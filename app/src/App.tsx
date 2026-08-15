import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useKeepAwake } from "expo-keep-awake";
import { useEffect } from "react";

import AmbientScene from "@/components/AmbientScene";
import AppShellStyles from "@/components/AppShellStyles";
import { recordEvent } from "@/utils/analytics";

recordEvent("pageview");

// Show splash screen until fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function App() {
    // Keep screen awake
    useKeepAwake();

    const [fontsLoaded] = useFonts({
        "Roboto-Medium": require("../assets/fonts/Roboto/Roboto-Medium.ttf")
    });

    useEffect(() => {
        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return (
        <>
            <AppShellStyles />
            <AmbientScene />
        </>
    );
}
