/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import IdleTimerManager from 'react-native-idle-timer';

import store from './state';

import BGSlideshow from './components/BackgroundImage/BGSlideshow';
import Overlay from './components/Overlay';
import Title from './components/Title';

const AppActual = () => {
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
                <Title />
                <BGSlideshow />
                <Overlay />
            </Provider>
        </>
    );
};

export default AppActual;
