/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */

import env from '../../../env';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Video, ResizeMode } from 'expo-av';
import { Animated, Image, View, StyleSheet } from 'react-native';

import { isVideo } from '../../utils/assets';
import { imageLoadingState } from '../../state/actions/bgImageActions';

const BackgroundImage = ({ src, animate }) => {
    const dispatch = useDispatch();

    // Starting image opacity -> 0
    const imageOpacity = animate ? new Animated.Value(0) : 1;

    // Once image has loaded
    // -> animate opacity from 0 -> 1
    const onImageLoad = () => {
        if (animate) {
            Animated.timing(imageOpacity, {
                toValue: 1,
                duration: env.ANIMATION_LONG,
                useNativeDriver: true,
            }).start();
        }
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.container, { opacity: imageOpacity }]}>
                {!isVideo(src) && (
                    <Image
                        source={{
                            uri: src,
                        }}
                        style={styles.image}
                        onLoad={onImageLoad}
                        onLoadStart={(e) => dispatch(imageLoadingState('start'))}
                        onLoadEnd={(e) => dispatch(imageLoadingState('end'))}
                    />
                )}

                {isVideo(src) && (
                    <Video
                        style={styles.image}
                        videoStyle={styles.image}
                        source={{
                            uri: src,
                        }}
                        isLooping
                        isMuted
                        shouldPlay
                        useNativeControls={false}
                        resizeMode={ResizeMode.COVER}
                        onLoadStart={(e) => dispatch(imageLoadingState('start'))}
                        onReadyForDisplay={(e) => dispatch(imageLoadingState('end'))}
                    />
                )}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: 'transparent',
    },
    image: {
        position: 'relative',
        flex: 1,
        width: '100%',
        height: '100%',
        zIndex: 5,
        resizeMode: 'cover',
        backgroundColor: 'transparent',
    },
});

export default BackgroundImage;
