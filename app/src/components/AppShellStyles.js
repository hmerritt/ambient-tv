import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";

export default function AppShellStyles() {
    const visibility = NavigationBar.useVisibility();

    // Hide navigation bar after a few seconds
    useEffect(() => {
        if (visibility !== "visible") return;

        const interval = setTimeout(() => {
            NavigationBar.setVisibilityAsync("hidden");
        }, /* 3 Seconds */ 3000);

        return () => {
            clearTimeout(interval);
        };
    }, [visibility]);

    return (
        <StatusBar
            hidden={true}
            translucent
            style="light"
            backgroundColor="transparent"
        />
    );
}
