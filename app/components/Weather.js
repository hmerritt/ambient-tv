/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { Animated, View, StyleSheet, Text } from 'react-native';

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
            useNativeDriver: true,
        }).start();
    };

    return (
        <>
            {weather && (
                <>
                    <Text style={styles.text} textAnchor="middle">
                        {Math.round(weather.temp)}°
                        <Animated.Image
                            source={{
                                uri: weather.iconUrl,
                            }}
                            style={[styles.image, { opacity: imageOpacity }]}
                            onLoad={onImageLoad}
                        />
                    </Text>
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        opacity: 0.9,
        fontFamily: 'Roboto-Bold',
        fontSize: 22,
        color: '#ffffff',
    },
    image: {
        width: 40,
        height: 40,
    },
});

export default Weather;
