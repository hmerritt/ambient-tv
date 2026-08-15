import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useKeepAwake } from "expo-keep-awake";
import { useEffect } from "react";
import { Provider } from "react-redux";

import AppShellStyles from "@/components/AppShellStyles";
import BGSlideshow from "@/components/BackgroundAsset/BGSlideshow";
import Controls from "@/components/Controls";
import Overlay from "@/components/Overlay";
import Title from "@/components/Title";
import store from "@/state";
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
            <Provider store={store}>
                <Title />
                <BGSlideshow />
                <Overlay />
                <Controls />
            </Provider>
        </>
    );
}
