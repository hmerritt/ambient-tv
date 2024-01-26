/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */

import React from 'react';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { useKeepAwake } from 'expo-keep-awake';
import * as SplashScreen from 'expo-splash-screen';
import * as NavigationBar from "expo-navigation-bar";
import { setStatusBarHidden } from 'expo-status-bar';

import store from './src/state';
import { recordEvent } from './src/utils/analytics';

import AppActual from './src/AppActual';
import AppShellStyles from './src/components/AppShellStyles';

recordEvent('pageview');

// Show splash screen until fonts are loaded
SplashScreen.preventAutoHideAsync();

// Hide navigation bar
NavigationBar.setPositionAsync("absolute");
NavigationBar.setVisibilityAsync("hidden");
NavigationBar.setBehaviorAsync("inset-swipe");
NavigationBar.setButtonStyleAsync("light");
NavigationBar.setBackgroundColorAsync("#00000080"); // `rgba(0,0,0,0.5)`
setStatusBarHidden(true, "fade");

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
		<>
			<AppShellStyles />
			<Provider store={store}>
				<AppActual />
			</Provider>
		</>
	);
}
