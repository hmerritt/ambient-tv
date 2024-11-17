import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useKeepAwake } from "expo-keep-awake";
import { setStatusBarHidden } from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";
import "react-native-reanimated";
import { Provider } from "react-redux";

import AppShellStyles from "@/components/AppShellStyles";
import BGSlideshow from "@/components/BackgroundImage/BGSlideshow";
import Controls from "@/components/Controls";
import Overlay from "@/components/Overlay";
import Title from "@/components/Title";
import store from "@/state";
import { recordEvent } from "@/utils/analytics";

recordEvent("pageview");

// Show splash screen until fonts are loaded
SplashScreen.preventAutoHideAsync();

// Hide navigation bar
if (Platform.OS === "android") NavigationBar.setPositionAsync("absolute");
if (Platform.OS === "android") NavigationBar.setVisibilityAsync("hidden");
if (Platform.OS === "android") NavigationBar.setBehaviorAsync("inset-swipe");
if (Platform.OS === "android") NavigationBar.setButtonStyleAsync("light");
if (Platform.OS === "android") NavigationBar.setBackgroundColorAsync("#00000080"); // `rgba(0,0,0,0.5)`
setStatusBarHidden(true, "fade");

export default function Page() {
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
