/**
 * Background Viewer
 * https://github.com/hmerritt/background-viewer
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';

import Timer from './components/Timer';
import BackgroundImage from './components/BackgroundImage';
import RollingBackgroundImage from './components/RollingBackgroundImage';

const App: () => React$Node = () => {
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <RollingBackgroundImage />
            <Timer />
        </>
    );
};

export default App;
