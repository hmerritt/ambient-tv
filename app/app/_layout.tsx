import { Slot } from "expo-router";
import "react-native-gesture-handler";
import "react-native-reanimated";
import {
    SafeAreaProvider,
    SafeAreaView,
    initialWindowMetrics
} from "react-native-safe-area-context";

export default function Layout() {
    return (
        <SafeAreaProvider
            style={{ height: "100%" }}
            initialMetrics={initialWindowMetrics}
        >
            <SafeAreaView
                style={{ height: "100%" }}
                edges={{ top: "off", right: "off", bottom: "off", left: "off" }}
            >
                <Slot />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
