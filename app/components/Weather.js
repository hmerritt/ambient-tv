/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';

import { getWeather } from '../utils/weather';
import { getLocation } from '../utils/location';

const Weather: () => React$Node = () => {
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

    // Starting image opacity -> 0
    const imageOpacity = new Animated.Value(0);

    // Once image has loaded
    // -> animate opacity from 0 -> 1
    const onImageLoad = () => {
        Animated.timing(imageOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    return (
        <>
            {weather && (
                <View style={styles.container}>
                    <Text style={styles.text} textAnchor="middle">
                        {Math.round(weather.temp)}°
                    </Text>
                    <Animated.Image
                        source={{ uri: `asset:/icons/${weather.icon}` }}
                        style={[styles.image, { opacity: imageOpacity }]}
                        onLoad={onImageLoad}
                    />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 18,
    },
    text: {
        opacity: 0.9,
        fontFamily: 'Roboto-Bold',
        fontSize: 22,
        color: '#ffffff',
    },
    image: {
        width: 30,
        height: 30,
        marginLeft: 4,
    },
});

export default Weather;
