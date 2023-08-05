/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */

import env from '../../../env';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useInterval } from '../../hooks/useInterval';
import { getNewBackground } from '../../state/actions/bgImageActions';
import { recordEvent, recordSessionTimeSpent } from '../../utils/bugCatch';

import BackgroundImage from './BackgroundImage';

const BGSlideshow = () => {
	const dispatch = useDispatch();

	const backgrounds = useSelector(
		(state) => state.bgImage.render.backgrounds,
	);
	const backgroundsSeen = useRef(0);

	useInterval(() => {
		dispatch(getNewBackground());
		backgroundsSeen.current++;
		recordEvent('newBackground', 'user has triggered a new background image');

		// Calculate the timeSpent using backgroundsSeen + IMAGE_TIMER
		const timeSpentInSeconds = backgroundsSeen.current * env.IMAGE_TIMER;
		recordSessionTimeSpent(timeSpentInSeconds);
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
