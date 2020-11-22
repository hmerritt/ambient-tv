/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import Clock from './components/Clock';
import Weather from './components/Weather';
import RollingBackgroundImage from './components/RollingBackgroundImage';

const App: () => React$Node = () => {
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <RollingBackgroundImage />
            <View style={styles.bottomRight}>
                <Weather />
                <Clock />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    bottomRight: {
        position: 'absolute',
        bottom: 40,
        right: 60,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 100,
    },
});

export default App;
