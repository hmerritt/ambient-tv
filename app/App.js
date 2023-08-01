/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */

import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import { useKeepAwake } from 'expo-keep-awake';
import * as SplashScreen from 'expo-splash-screen';
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar, setStatusBarHidden } from 'expo-status-bar';

import store from './src/state';

import AppActual from './src/AppActual';

// Show splash screen until fonts are loaded
SplashScreen.preventAutoHideAsync();

// Hide navigation bar
NavigationBar.setPositionAsync("absolute");
NavigationBar.setVisibilityAsync("hidden");
NavigationBar.setBehaviorAsync("inset-swipe");
NavigationBar.setBackgroundColorAsync("#00000080"); // `rgba(0,0,0,0.5)`
setStatusBarHidden(true, "fade");

export default function App() {
	// Keep screen awake
	useKeepAwake();

	const visibility = NavigationBar.useVisibility()

	// Hide navigation bar after a few seconds
	useEffect(() => {
		if (visibility !== "visible") return;

		const interval = setTimeout(() => {
			NavigationBar.setVisibilityAsync("hidden");
		}, /* 3 Seconds */ 3000);

		return () => {
			clearTimeout(interval);
		};
	}, [visibility]);

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
