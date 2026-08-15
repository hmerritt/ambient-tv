import { useEventListener } from "expo";
import { VideoView, useVideoPlayer } from "expo-video";
import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import env from "@/env";
import { getNewBackground, imageLoadingState } from "@/state/actions/bgImageActions";
import { isVideo } from "@/utils/assets";

const BackgroundVideo = ({ src, current, onAssetLoad }) => {
    const dispatch = useDispatch();
    const currentRef = useRef(current);
    const errorHandled = useRef(false);
    const videoReady = useRef(false);
    const player = useVideoPlayer(null, (videoPlayer) => {
        videoPlayer.loop = true;
        videoPlayer.muted = true;
    });

    useEffect(() => {
        currentRef.current = current;

        if (!videoReady.current) return;

        if (current) {
            player.play();
        } else {
            player.pause();
        }
    }, [current, player]);

    useEffect(() => {
        let cancelled = false;
        errorHandled.current = false;
        videoReady.current = false;

        const loadVideo = async () => {
            try {
                await player.replaceAsync(src);

                if (cancelled) return;

                videoReady.current = true;
                if (currentRef.current) player.play();
            } catch {
                if (currentRef.current && !cancelled && !errorHandled.current) {
                    errorHandled.current = true;
                    dispatch(getNewBackground());
                }
            }
        };

        loadVideo();

        return () => {
            cancelled = true;
            videoReady.current = false;
        };
    }, [dispatch, player, src]);

    useEventListener(player, "statusChange", ({ status, error }) => {
        if (!current) return;

        if (status === "loading") {
            dispatch(imageLoadingState("start"));
        }

        if ((status === "error" || error) && !errorHandled.current) {
            errorHandled.current = true;
            dispatch(getNewBackground());
        }
    });

    const handleFirstFrameRender = () => {
        onAssetLoad();
        if (current) dispatch(imageLoadingState("end"));
    };

    return (
        <VideoView
            player={player}
            contentFit="cover"
            style={styles.image}
            surfaceType="textureView"
            nativeControls={false}
            fullscreenOptions={{ enable: false }}
            allowsPictureInPicture={false}
            allowsVideoFrameAnalysis={false}
            onFirstFrameRender={handleFirstFrameRender}
        />
    );
};

const BackgroundAsset = ({ src, current }) => {
    const dispatch = useDispatch();

    // Starting image opacity -> 0
    const assetOpacity = useRef(current ? new Animated.Value(0) : 1).current;

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
                    <BackgroundVideo
                        src={src}
                        current={current}
                        onAssetLoad={onAssetLoad}
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
