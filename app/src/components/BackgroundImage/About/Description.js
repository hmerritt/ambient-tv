/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Description: (props) => React$Node = ({ currentBG }) => {
    // Render nothing if no description available
    if (!currentBG.description) {
        return <></>;
    }

    return (
        <>
            <Text style={[styles.text, styles.description]} numberOfLines={1}>
                {currentBG.method === 'unsplash' && (
                    <>{currentBG.description || 'Untitled'}</>
                )}
                {currentBG.method !== 'unsplash' && (
                    <>{currentBG.description}</>
                )}
            </Text>
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        opacity: 0.8,
        fontFamily: 'Roboto-Medium',
        fontSize: 10,
        fontWeight: '900',
        color: '#ffffff',
        width: 350,
    },
    description: {
        fontSize: 13,
    },
});

export default Description;
