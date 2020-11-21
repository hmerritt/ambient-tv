/**
 * Background Viewer
 * https://github.com/hmerritt/background-viewer
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Animated, View, Image, StyleSheet } from 'react-native';

const BackgroundImage: (props) => React$Node = ({ src }) => {
    // Starting image opacity -> 0
    const imageOpacity = new Animated.Value(0);

    // Once image has loaded
    // -> animate opacity from 0 -> 1
    const onImageLoad = () => {
        Animated.timing(imageOpacity, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Animated.Image
                source={{
                    uri: src,
                }}
                style={[styles.image, { opacity: imageOpacity }]}
                onLoad={onImageLoad}
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
        zIndex: 12,
        resizeMode: 'cover',
        backgroundColor: 'transparent',
    },
});

export default BackgroundImage;
