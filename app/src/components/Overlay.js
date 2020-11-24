/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Animated, StyleSheet, View } from 'react-native';

import BGGradient from './BackgroundImage/BGGradient';
import Clock from './Clock';
import Weather from './Weather';

const Overlay: () => React$Node = () => {
    const bgImageLoading = useSelector((state) => state.bgImageReducer.loading);

    // Starting overlay opacity -> 0
    const overlayOpacity = new Animated.Value(0);

    // Once bgImage has loaded
    // -> animate opacity from 0 -> 1
    if (!bgImageLoading) {
        Animated.timing(overlayOpacity, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    }

    return (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
            <BGGradient />
            <View style={styles.bottomRight}>
                <Weather />
                <Clock />
            </View>
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
        zIndex: 50,
    },
    bottomRight: {
        position: 'absolute',
        bottom: 35,
        right: 55,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 50,
    },
});

export default Overlay;