/**
 * Background Viewer
 * https://github.com/hmerritt/background-viewer
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';

import { useInterval } from '../hooks/useInterval';

const Timer: () => React$Node = () => {
    const [clock, setClock] = useState(moment.now());

    // Increment clock
    useInterval(() => {
        setClock(moment.now());
    }, 10000);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{moment(clock).format('hh:mm')}</Text>
            {/*<Text style={styles.text}>{moment().format('MMM DD hh:mm')}</Text>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    text: {
        position: 'absolute',
        bottom: 60,
        right: 60,
        opacity: 0.8,
        letterSpacing: 0.5,
        fontFamily: 'Roboto-Black',
        fontSize: 28,
        fontWeight: '900',
        color: '#ffffff',
    },
});

export default Timer;
