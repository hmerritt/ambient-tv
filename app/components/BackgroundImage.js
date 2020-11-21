/**
 * Background Viewer
 * https://github.com/hmerritt/background-viewer
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const BackgroundImage: () => React$Node = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri:
                        'https://merritt.es/wallpapers/my/hmerritt--021-02.jpg',
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default BackgroundImage;
