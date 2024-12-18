import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import env from "@/env";

import BGAbout from "./BackgroundAsset/About/BGAbout";
import BGGradient from "./BackgroundAsset/BGGradient";
import Clock from "./Clock";
import Weather from "./Weather";

const Overlay = () => {
    const bgImageLoading = useSelector((state) => state.bgImage.loading);

    // Starting overlay opacity -> 0
    const overlayOpacity = new Animated.Value(0);

    // Once bgImage has loaded
    // -> animate opacity from 0 -> 1
    if (!bgImageLoading) {
        Animated.timing(overlayOpacity, {
            toValue: 1,
            duration: env.ANIMATION_LONG,
            useNativeDriver: true
        }).start();
    }

    return (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
            <BGGradient />
            <View style={styles.bottomRight}>
                <Weather />
                <Clock />
            </View>
            <View style={styles.bottomLeft}>
                <BGAbout />
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
        flex: 1,
        zIndex: 50
    },
    bottomRight: {
        position: "absolute",
        bottom: 35,
        right: 55,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 50
    },
    bottomLeft: {
        position: "absolute",
        bottom: 45,
        left: 55,
        zIndex: 49
    }
});

export default Overlay;
