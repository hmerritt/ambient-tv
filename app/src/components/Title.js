/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { Animated, StyleSheet, Text } from 'react-native';

const Title: () => React$Node = () => {
    const bgImageLoading = useSelector((state) => state.bgImageReducer.loading);

    // Starting overlay opacity -> 1
    const overlayOpacity = new Animated.Value(1);

    // Once bgImage has loaded
    // -> animate opacity from 1 -> 0
    if (!bgImageLoading) {
        Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }

    return (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
            <Text style={styles.text}>Ambient TV</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    text: {
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        color: '#444444',
    },
});

export default Title;
