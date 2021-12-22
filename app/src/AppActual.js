/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */

import React from 'react';
import { init as bugcatchInit, recordEvent } from '@bug-catch/react-native';

import env from '../env';
import { bugCatchOptions } from './utils/bugCatch';

import BGSlideshow from './components/BackgroundImage/BGSlideshow';
import Overlay from './components/Overlay';
import Title from './components/Title';

// Bugcatch init
// logs all errors
if (env.BUGCATCH_ENABLE) {
    bugcatchInit(bugCatchOptions);
    recordEvent('appOpen', 'user has opened the app', bugCatchOptions);
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
