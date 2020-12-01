/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';

import store from './src/state';

import AppActual from './src/AppActual';

export default function App() {
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
