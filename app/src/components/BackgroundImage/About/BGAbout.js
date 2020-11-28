/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useSelector } from 'react-redux';

import Attribution from './Attribution';
import Description from './Description';

const BGAbout: () => React$Node = () => {
    const backgrounds = useSelector(
        (state) => state.bgImage.render.backgrounds,
    );
    const loading = useSelector(
        (state) => state.bgImage.render.current.loading,
    );

    const currentBG = backgrounds[backgrounds.length - 1];
    const previousBG = backgrounds[backgrounds.length - 2];

    const render = (background) => {
        return (
            <>
                <Description background={background} />
                <Attribution background={background} />
            </>
        );
    };

    return (
        <>
            {currentBG && !loading && render(currentBG)}
            {previousBG && loading && render(previousBG)}
        </>
    );
};

export default BGAbout;
