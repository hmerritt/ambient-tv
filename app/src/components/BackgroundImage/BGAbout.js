/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text } from 'react-native';

import Link from '../Common/Link';

const BGAbout: () => React$Node = () => {
    const backgrounds = useSelector(
        (state) => state.bgImage.render.backgrounds,
    );
    const currentBG = backgrounds[backgrounds.length - 1];

    const unsplashURL =
        'https://unsplash.com/?utm_source=Ambient_TV&utm_medium=referral';

    return (
        <>
            {currentBG && (
                <>
                    <Text style={[styles.text, styles.description]}>
                        {currentBG.description}
                    </Text>
                    <Text style={[styles.text, styles.attribution]}>
                        {currentBG.method === 'unsplash' && (
                            <>
                                By{' '}
                                <Link
                                    type="text"
                                    url={currentBG.attribution.link}>
                                    {currentBG.attribution.name}
                                </Link>{' '}
                                on{' '}
                                <Link type="text" url={unsplashURL}>
                                    Unsplash
                                </Link>
                            </>
                        )}
                        {currentBG.method !== 'unsplash' && (
                            <>By {currentBG.attribution.name}</>
                        )}
                    </Text>
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        opacity: 0.8,
        fontFamily: 'Roboto-Medium',
        fontSize: 12,
        fontWeight: '900',
        color: '#ffffff',
    },
    description: {
        fontSize: 16,
    },
    attribution: {
        marginTop: 4,
    },
});

export default BGAbout;
