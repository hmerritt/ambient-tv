/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useInterval } from '../../hooks/useInterval';
import { getNewBackground } from '../../state/actions/bgImageActions';

import BackgroundImage from './BackgroundImage';

const BGSlideshow: () => React$Node = () => {
    const dispatch = useDispatch();

    const backgrounds = useSelector(
        (state) => state.bgImage.render.backgrounds,
    );

    useInterval(() => {
        dispatch(getNewBackground());
    }, 60000 * 2); //  1000 = 1s  //  60000 = 1m // 120000 = 2m

    useEffect(() => {
        dispatch(getNewBackground());
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

export default BGSlideshow;
