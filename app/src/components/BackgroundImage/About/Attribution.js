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

const Attribution: (props) => React$Node = ({ background }) => {
    // Render nothing if no attribution available
    if (!background.attribution.name) {
        return <></>;
    }

    return (
        <>
            <Text style={[styles.text, styles.attribution]} numberOfLines={1}>
                {background.method === 'unsplash' && (
                    <>
                        By{' '}
                        <Link type="text" url={background.attribution.link}>
                            {background.attribution.name}
                        </Link>{' '}
                        on{' '}
                        <Link
                            type="text"
                            url={`https://unsplash.com/${background.unsplashReferal}`}>
                            Unsplash
                        </Link>
                    </>
                )}
                {background.method !== 'unsplash' && (
                    <>By {background.attribution.name}</>
                )}
            </Text>
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        width: 350,
        marginTop: 4,
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
