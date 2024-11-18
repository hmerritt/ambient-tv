import { ResizeMode, Video } from "expo-av";
import React from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import env from "@/env";
import { getNewBackground, imageLoadingState } from "@/state/actions/bgImageActions";
import { isVideo } from "@/utils/assets";

/**
@WARNING - `expo-video` kept getting cors errors (for some reason the images + `expo-av` does not have this problem).
Re-implement with below code:

import { useEventListener } from "expo";
import { VideoView, useVideoPlayer } from "expo-video";


const player = useVideoPlayer(isVideo(src) ? src : null, (player) => {
	player.loop = true;
	player.muted = true;
});

useEventListener(player, "statusChange", ({ status, error }) => {
	if (!current) return;
	if (error) console.error("video error", error);
	switch (status) {
		case "loading":
			dispatch(imageLoadingState("start"));
		case "readyToPlay":
			player.play();
			onAssetLoad();
			dispatch(imageLoadingState("end"));
		case "error":
			dispatch(getNewBackground()); // Give up and load new BG
	}
});

{isVideo(src) && (
	<VideoView
	    player={player}
	    contentFit="cover"
	    style={styles.image}
	    requiresLinearPlayback
	    nativeControls={false}
	    allowsFullscreen={false}
	    allowsPictureInPicture={false}
	    allowsVideoFrameAnalysis={false}
	/>
)}
*/

const BackgroundAsset = ({ src, current }) => {
    const dispatch = useDispatch();

    // Starting image opacity -> 0
    const assetOpacity = current ? new Animated.Value(0) : 1;

    // Once asset has loaded
    // -> animate opacity from 0 -> 1
    const onAssetLoad = () => {
        if (current) {
            Animated.timing(assetOpacity, {
                toValue: 1,
                duration: env.ANIMATION_LONG,
                useNativeDriver: true
            }).start();
        }
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.container, { opacity: assetOpacity }]}>
                {!isVideo(src) && (
                    <Image
                        source={{ uri: src }}
                        resizeMode="cover"
                        style={styles.image}
                        onLoad={onAssetLoad}
                        onLoadStart={(_) => {
                            if (!current) return;
                            dispatch(imageLoadingState("start"));
                        }}
                        onLoadEnd={(_) => {
                            if (!current) return;
                            dispatch(imageLoadingState("end"));
                        }}
                    />
                )}

                {isVideo(src) && (
                    <Video
                        style={styles.image}
                        videoStyle={styles.image}
                        source={{
                            uri: src
                        }}
                        isLooping
                        isMuted
                        shouldPlay
                        useNativeControls={false}
                        resizeMode={ResizeMode.COVER}
                        onLoad={onAssetLoad}
                        onError={(_) => {
                            if (!current) return;
                            dispatch(getNewBackground()); // Give up and load new BG
                        }}
                        onLoadStart={(_) => {
                            if (!current) return;
                            dispatch(imageLoadingState("start"));
                        }}
                        onReadyForDisplay={(_) => {
                            if (!current) return;
                            dispatch(imageLoadingState("end"));
                        }}
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

export default BackgroundAsset;
