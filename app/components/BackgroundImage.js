/**
 * Background Viewer
 * https://github.com/hmerritt/background-viewer
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const BackgroundImage: (props) => React$Node = ({ src }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: src,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        zIndex: 12,
        resizeMode: 'cover',
        backgroundColor: 'transparent',
    },
});

export default BackgroundImage;
