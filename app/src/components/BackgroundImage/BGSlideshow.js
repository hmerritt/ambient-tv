/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */

import env from '../../../env';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useInterval } from '../../hooks/useInterval';
import { getNewBackground } from '../../state/actions/bgImageActions';
import { recordEvent, recordSessionTimeSpent } from '../../utils/analytics';

import BackgroundImage from './BackgroundImage';

const BGSlideshow = () => {
	const dispatch = useDispatch();

	const backgrounds = useSelector(
		(state) => state.bgImage.render.backgrounds,
	);
	const backgroundsSeen = useRef(0);

	// New background on load
	useEffect(() => {
		dispatch(getNewBackground());
	}, []);

	// New background every `IMAGE_TIMER` seconds
	useInterval(() => {
		dispatch(getNewBackground());
		backgroundsSeen.current++;
		recordEvent('image/view');

		// Calculate the timeSpent using backgroundsSeen + IMAGE_TIMER
		const timeSpentInSeconds = backgroundsSeen.current * env.IMAGE_TIMER;
		recordSessionTimeSpent(timeSpentInSeconds);
	}, (env.IMAGE_TIMER || 120) * 1000);

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
