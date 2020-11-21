/**
 * Background Viewer
 * https://github.com/hmerritt/background-viewer
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { useInterval } from '../hooks/useInterval';
import { getNewBackground } from '../utils/getNewBackground';

import BackgroundImage from './BackgroundImage';

const RollingBackgroundImage: () => React$Node = () => {
    const [backgrounds, setBackgrounds] = useState([]);
    const [imageMethod, setImageMethod] = useState('rss');

    const pushBackground = ({ src, color }) => {
        setBackgrounds([...backgrounds.slice(-3), { src: src, color: color }]);
    };

    useInterval(() => {
        getNewBackground({
            imageMethod: imageMethod,
            pushBackground: pushBackground,
        });
    }, 5000); //  1000 = 1s  //  60000 = 1m

    useEffect(() => {
        getNewBackground({
            imageMethod: imageMethod,
            pushBackground: pushBackground,
        });
    }, []);

    return (
        <>
            {backgrounds.length > 0 &&
                backgrounds.map((item, key) => {
                    const current = key === backgrounds.length - 1;

                    return (
                        <BackgroundImage
                            src={item.src}
                            color={item.color}
                            animate={current ? true : false}
                            key={key}
                        />
                    );
                })}
        </>
    );
};

export default RollingBackgroundImage;
