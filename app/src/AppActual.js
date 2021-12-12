/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */

import React from 'react';
import { init as bugcatchInit } from '@bug-catch/browser';

import env from '../env';
import BGSlideshow from './components/BackgroundImage/BGSlideshow';
import Overlay from './components/Overlay';
import Title from './components/Title';

// Bugcatch init
// logs all errors
if (env.BUGCATCH_ENABLE) {
    bugcatchInit({
        base_url: `${env.APP_SERVER_URL}/bug-catch`,
        release: '1.1.9',
    });
}

const AppActual = () => {
    return (
        <>
            <Title />
            <BGSlideshow />
            <Overlay />
        </>
    );
};

export default AppActual;
