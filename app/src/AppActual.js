/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */

import React from 'react';
import { init as bugcatchInit } from '@bug-catch/react-native';

import env from '../env';
import { bugCatchOptions, recordEvent } from './utils/bugCatch';

import BGSlideshow from './components/BackgroundImage/BGSlideshow';
import Overlay from './components/Overlay';
import Title from './components/Title';

// Bugcatch init
// logs all errors
if (env.BUGCATCH_ENABLE) {
	bugcatchInit(bugCatchOptions);
	recordEvent('appOpen', 'user has opened the app');
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
