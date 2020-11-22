/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';

import { useInterval } from '../hooks/useInterval';
import { getNewBackground } from '../utils/backgroundImage';

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
    }, 60000 * 2); //  1000 = 1s  //  60000 = 1m // 120000 = 2m

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
