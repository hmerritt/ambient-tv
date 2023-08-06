/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */

import env from '../../env';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Animated, StyleSheet, Pressable, Image, View } from 'react-native';

import assets from '../utils/assets';
import { recordEvent } from '../utils/bugCatch';
import { controlsToggle, getNewBackground } from '../state/actions/bgImageActions';

const Controls = () => {
	const dispatch = useDispatch();
	const bgImageLoading = useSelector((state) => state.bgImage.loading);
	const showControls = useSelector((state) => state.bgImage.showControls);

	const overlayOpacity = new Animated.Value(0);

	useEffect(() => {
		if (bgImageLoading) return;
		Animated.timing(overlayOpacity, {
			toValue: showControls ? 1 : 0,
			duration: env.ANIMATION_SHORT,
			useNativeDriver: true,
		}).start();
	}, [showControls]);

	const handleNext = (e) => {
		if (!showControls) dispatch(controlsToggle());
		if (!showControls || bgImageLoading) return;
		dispatch(getNewBackground());
		recordEvent('skippedBackground', 'user skipped a background image');
		e.stopPropagation();
	}

	return (
		<Pressable style={styles.overlay} onPress={() => !bgImageLoading && dispatch(controlsToggle())}>
			<Animated.View style={[styles.left, { opacity: overlayOpacity }]}>
				<Pressable style={styles.nested} onPress={handleNext}>
					<Image
						source={assets.icons.chevronRight}
						style={styles.image}
					/>
				</Pressable>
			</Animated.View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	overlay: {
		position: 'absolute',
		cursor: 'default',
		left: 0,
		right: 0,
		width: '100%',
		height: '100%',
		flex: 1,
		zIndex: 100,
	},
	left: {
		position: 'absolute',
		width: 110,
		height: '100%',
		right: '0%',
		flex: 1,
		zIndex: 80,
	},
	nested: {
		flex: 1,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 35,
		height: 35,
	},
});

export default Controls;
