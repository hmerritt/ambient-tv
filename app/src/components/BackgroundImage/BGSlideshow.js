/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import env from '../../../env';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useInterval } from '../../hooks/useInterval';
import { getNewBackground } from '../../state/actions/bgImageActions';

import BackgroundImage from './BackgroundImage';

const BGSlideshow = () => {
    const dispatch = useDispatch();

    const backgrounds = useSelector(
        (state) => state.bgImage.render.backgrounds,
    );

    useInterval(() => {
        dispatch(getNewBackground());
    }, env.IMAGE_TIMER);

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
