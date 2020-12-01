/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import IdleTimerManager from 'react-native-idle-timer';

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
            <Title />
            <BGSlideshow />
            <Overlay />
        </>
    );
};

export default AppActual;
