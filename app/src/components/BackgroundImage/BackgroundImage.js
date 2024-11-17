import { useEventListener } from "expo";
import { VideoView, useVideoPlayer } from "expo-video";
import React from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import env from "@/env";
import { imageLoadingState } from "@/state/actions/bgImageActions";
import { isVideo } from "@/utils/assets";

const BackgroundImage = ({ src, animate }) => {
    const dispatch = useDispatch();

    // Starting image opacity -> 0
    const assetOpacity = animate ? new Animated.Value(0) : 1;

    // Once asset has loaded
    // -> animate opacity from 0 -> 1
    const onAssetLoad = () => {
        if (animate) {
            Animated.timing(assetOpacity, {
                toValue: 1,
                duration: env.ANIMATION_LONG,
                useNativeDriver: true
            }).start();
        }
    };

    const player = useVideoPlayer(isVideo(src) ? src : null, (player) => {
        player.loop = true;
        player.muted = true;
    });

    useEventListener(player, "statusChange", ({ status, error }) => {
        switch (status) {
            case "loading":
                dispatch(imageLoadingState("start"));
            case "readyToPlay":
                player.play();
                onAssetLoad();
                dispatch(imageLoadingState("end"));
        }
        if (error) console.error("video error", error);
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.container, { opacity: assetOpacity }]}>
                {!isVideo(src) && (
                    <Image
                        source={{ uri: src }}
                        resizeMode="cover"
                        style={styles.image}
                        onLoad={onAssetLoad}
                        onLoadStart={(e) => dispatch(imageLoadingState("start"))}
                        onLoadEnd={(e) => dispatch(imageLoadingState("end"))}
                    />
                )}

                {isVideo(src) && (
                    <VideoView
                        player={player}
                        contentFit="cover"
                        style={styles.image}
                        allowsFullscreen={false}
                        allowsPictureInPicture={false}
                        allowsVideoFrameAnalysis={false}
                        nativeControls={false}
                    />
                )}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "transparent"
    },
    image: {
        position: "relative",
        flex: 1,
        width: "100%",
        height: "100%",
        zIndex: 5,
        backgroundColor: "transparent"
    }
});

export default BackgroundImage;
