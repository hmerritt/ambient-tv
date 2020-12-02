/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BGGradient = () => {
    return (
        <>
            <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']}
                style={styles.linearGradient}
            />
        </>
    );
};

const styles = StyleSheet.create({
    linearGradient: {
        position: 'absolute',
        width: '100%',
        height: '20%',
        bottom: '0%',
        flex: 1,
        zIndex: 6,
    },
});

export default BGGradient;
