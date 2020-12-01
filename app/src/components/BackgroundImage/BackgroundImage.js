/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { Animated, View, StyleSheet } from 'react-native';

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
                duration: 3000,
                useNativeDriver: true,
            }).start();
        }
    };

    return (
        <View style={styles.container}>
            <Animated.Image
                source={{
                    uri: src,
                }}
                style={[styles.image, { opacity: imageOpacity }]}
                onLoad={onImageLoad}
                onLoadStart={(e) => dispatch(imageLoadingState('start'))}
                onLoadEnd={(e) => dispatch(imageLoadingState('end'))}
            />
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
        flex: 1,
        width: '100%',
        height: '100%',
        zIndex: 5,
        resizeMode: 'cover',
        backgroundColor: 'transparent',
    },
});

export default BackgroundImage;
