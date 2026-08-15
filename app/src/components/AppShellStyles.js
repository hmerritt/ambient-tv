import { NavigationBar } from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform } from "react-native";

export default function AppShellStyles() {
    return (
        <>
            <StatusBar hidden animated style="light" />
            {Platform.OS === "android" && <NavigationBar hidden style="dark" />}
        </>
    );
}
