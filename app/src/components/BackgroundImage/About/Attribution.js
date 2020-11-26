/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Link from '../../Common/Link';

const Attribution: (props) => React$Node = ({ currentBG }) => {
    // Render nothing if no attribution available
    if (!currentBG.attribution.name) {
        return <></>;
    }

    return (
        <>
            <Text style={[styles.text, styles.attribution]} numberOfLines={1}>
                {currentBG.method === 'unsplash' && (
                    <>
                        By{' '}
                        <Link type="text" url={currentBG.attribution.link}>
                            {currentBG.attribution.name}
                        </Link>{' '}
                        on{' '}
                        <Link
                            type="text"
                            url={`https://unsplash.com/${currentBG.unsplashReferal}`}>
                            Unsplash
                        </Link>
                    </>
                )}
                {currentBG.method !== 'unsplash' && (
                    <>By {currentBG.attribution.name}</>
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
        marginTop: 4,
    },
    attribution: {
        marginTop: 4,
    },
});

export default Attribution;
