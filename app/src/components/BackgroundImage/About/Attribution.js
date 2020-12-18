/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Attribution = ({ background }) => {
    // Render nothing if no attribution available
    if (!background.attribution || background.attribution.length === 0) {
        return <></>;
    }

    return (
        <>
            <Text style={[styles.text, styles.attribution]} numberOfLines={1}>
                <>By {background.attribution}</>
            </Text>
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        width: 350,
        marginTop: 5,
        opacity: 0.8,
        fontFamily: 'Roboto-Medium',
        fontSize: 10,
        color: '#ffffff',
        textTransform: 'capitalize',
    },
    attribution: {
        marginTop: 4,
    },
});

export default Attribution;
