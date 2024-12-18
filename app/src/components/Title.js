import React from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

import env from "@/env";

const Title = () => {
    const bgImageLoading = useSelector((state) => state.bgImage.loading);

    // Starting overlay opacity -> 1
    const overlayOpacity = new Animated.Value(1);

    // Once bgImage has loaded
    // -> animate opacity from 1 -> 0
    if (!bgImageLoading) {
        Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: env.ANIMATION_LONG / 2,
            useNativeDriver: true
        }).start();
    }

    return (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
            <Text style={styles.text}>{env.TITLE}</Text>
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
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1
    },
    text: {
        fontFamily: "Roboto-Medium",
        fontSize: 15,
        color: "#444444"
    }
});

export default Title;
