import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import env from "@/env";
import { getLocation } from "@/utils/location";
import { getWeather } from "@/utils/weather";

const Weather = () => {
	const [weather, setWeather] = useState(null);
	const [location, setLocation] = useState(null);

	// Get user location
	useEffect(() => {
		getLocation({ setLocation: setLocation });
	}, []);

	// Get weather
	useEffect(() => {
		if (location) {
			getWeather({ location: location, setWeather: setWeather });
		}
	}, [location]);

	// Starting opacity -> 0
	const opacity = new Animated.Value(0);

	// Once icon has loaded
	// -> animate opacity from 0 -> 1
	const onImageLoad = () => {
		Animated.timing(opacity, {
			toValue: 1,
			duration: env.ANIMATION_SHORT,
			useNativeDriver: true
		}).start();
	};

	return (
		<>
			{weather && (
				<Animated.View style={[styles.container, { opacity: opacity }]}>
					<Text style={styles.text} textAnchor="middle">
						{Math.round(weather.temp)}°
					</Text>
					<Animated.Image
						source={weather.icon}
						style={[styles.image]}
						onLoad={onImageLoad}
					/>
				</Animated.View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginTop: 18
	},
	text: {
		opacity: 0.9,
		fontFamily: "Roboto-Medium",
		fontSize: 20,
		color: "#ffffff"
	},
	image: {
		width: 28,
		height: 28,
		marginLeft: 4
	}
});

export default Weather;
