/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Description: (props) => React$Node = ({ background }) => {
    // Render nothing if no description available
    if (!background.description) {
        return <></>;
    }

    return (
        <>
            <Text style={[styles.text, styles.description]} numberOfLines={1}>
                {background.method === 'unsplash' && (
                    <>{background.description || 'Untitled'}</>
                )}
                {background.method !== 'unsplash' && (
                    <>{background.description}</>
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
