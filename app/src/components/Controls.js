import React, { useEffect, useRef } from "react";
import { Animated, Image, Pressable, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import env from "@/env";
import {
    backgroundSkipped,
    controlsToggle,
    getNewBackground
} from "@/state/actions/bgImageActions";
import { recordEvent } from "@/utils/analytics";
import assets from "@/utils/assets";

const Controls = () => {
    const dispatch = useDispatch();
    const bgImageLoading = useSelector((state) => state.bgImage.loading);
    const showControls = useSelector((state) => state.bgImage.showControls);

    const overlayOpacity = useRef(new Animated.Value(0)).current;

    const handleNext = (e) => {
        if (bgImageLoading) return;
        if (!showControls) return dispatch(controlsToggle());
        dispatch(backgroundSkipped());
        dispatch(getNewBackground());
        recordEvent("image/skip");
        e.stopPropagation();
    };

    useEffect(() => {
        Animated.timing(overlayOpacity, {
            toValue: !!showControls ? 1 : 0,
            duration: env.ANIMATION_SHORT,
            useNativeDriver: true
        }).start();

        // Automatically hide controls after a few seconds
        resetControls = setTimeout(() => {
            dispatch(controlsToggle(false));
        }, 8000);

        return () => {
            clearTimeout(resetControls);
        };
    }, [showControls]);

    return (
        <Pressable style={styles.overlay} onPress={handleNext}>
            <Animated.View style={[styles.left, { opacity: overlayOpacity }]}>
                <View style={styles.nested}>
                    <Image source={assets.icons.chevronRight} style={styles.image} />
                </View>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        cursor: "default",
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
        flex: 1,
        zIndex: 100
    },
    left: {
        position: "absolute",
        width: 110,
        height: "100%",
        right: "0%",
        flex: 1,
        zIndex: 80
    },
    nested: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: 35,
        height: 35
    }
});

export default Controls;
