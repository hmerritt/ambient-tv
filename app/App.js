/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { useKeepAwake } from 'expo-keep-awake';
import { useFonts } from 'expo-font';

import store from './src/state';

import AppActual from './src/AppActual';

export default function App() {
    // Keep screen awake
    useKeepAwake();

    // Load fonts
    let [fontsLoaded] = useFonts({
        'Roboto-Black': require('./src/assets/fonts/Roboto/Roboto-Black.ttf'),
        'Roboto-Bold': require('./src/assets/fonts/Roboto/Roboto-Bold.ttf'),
        'Roboto-Medium': require('./src/assets/fonts/Roboto/Roboto-Medium.ttf'),
    });

    return (
        <Provider store={store}>
            <StatusBar
                hidden={true}
                translucent
                backgroundColor="transparent"
            />
            <AppActual />
        </Provider>
    );
}
