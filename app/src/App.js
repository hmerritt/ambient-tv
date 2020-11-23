/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StatusBar, StyleSheet, View } from 'react-native';
import IdleTimerManager from 'react-native-idle-timer';

import store from './state';

import Clock from './components/Clock';
import Weather from './components/Weather';
import BGSlideshow from './components/BackgroundImage/BGSlideshow';
import BGGradient from './components/BackgroundImage/BGGradient';

const App: () => React$Node = () => {
    // Keep screen awake
    useEffect(() => {
        IdleTimerManager.setIdleTimerDisabled(true);

        return () => {
            IdleTimerManager.setIdleTimerDisabled(false);
        };
    }, []);

    return (
        <>
            <Provider store={store}>
                <StatusBar translucent backgroundColor="transparent" />
                <BGSlideshow />
                <BGGradient />
                <View style={styles.bottomRight}>
                    <Weather />
                    <Clock />
                </View>
            </Provider>
        </>
    );
};

const styles = StyleSheet.create({
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

export default App;
