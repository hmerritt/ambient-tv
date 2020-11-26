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
    const currentBG = backgrounds[backgrounds.length - 1];

    return (
        <>
            {currentBG && (
                <>
                    <Description currentBG={currentBG} />
                    <Attribution currentBG={currentBG} />
                </>
            )}
        </>
    );
};

export default BGAbout;
