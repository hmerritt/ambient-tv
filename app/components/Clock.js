/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';

import { useInterval } from '../hooks/useInterval';

const Clock: () => React$Node = () => {
    const [clock, setClock] = useState(moment.now());

    // Increment clock
    useInterval(() => {
        setClock(moment.now());
    }, 5000);

    return (
        <>
            <Text style={styles.text}>{moment(clock).format('hh:mm')}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        opacity: 0.9,
        fontFamily: 'Roboto-Bold',
        fontSize: 50,
        fontWeight: '900',
        color: '#ffffff',
        paddingLeft: 20,
    },
});

export default Clock;
