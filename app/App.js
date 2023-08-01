/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */

import React from 'react';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { useKeepAwake } from 'expo-keep-awake';
import * as SplashScreen from 'expo-splash-screen';

import store from './src/state';

import AppActual from './src/AppActual';

SplashScreen.preventAutoHideAsync();

export default function App() {
	// Keep screen awake
	useKeepAwake();

	// Load fonts
	let [fontsLoaded] = useFonts({
		'Roboto-Medium': require('./src/assets/fonts/Roboto/Roboto-Medium.ttf'),
	});

	// Wait for fonts to load
	if (fontsLoaded) SplashScreen.hideAsync();
	else return null;

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
