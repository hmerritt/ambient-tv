/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */

import React from 'react';

import BGSlideshow from './components/BackgroundImage/BGSlideshow';
import Controls from './components/Controls';
import Overlay from './components/Overlay';
import Title from './components/Title';

const AppActual = () => {
	return (
		<>
			<Title />
			<BGSlideshow />
			<Overlay />
			<Controls />
		</>
	);
};

export default AppActual;
