/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */

import env from '../../env';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Animated, StyleSheet, Pressable, View } from 'react-native';

import { controlsToggle, getNewBackground } from '../state/actions/bgImageActions';

const Controls = () => {
	const dispatch = useDispatch();
	const bgImageLoading = useSelector((state) => state.bgImage.loading);
	const showControls = useSelector((state) => state.bgImage.showControls);

	const overlayOpacity = new Animated.Value(0);
	console.log('showControls', showControls, overlayOpacity);

	useEffect(() => {
		Animated.timing(overlayOpacity, {
			toValue: showControls ? 1 : 0,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, [showControls]);

	const handleNext = (e) => {
		console.log('handleNext', showControls, bgImageLoading);
		if (!showControls) dispatch(controlsToggle());
		if (!showControls || bgImageLoading) return;
		dispatch(getNewBackground());
		e.stopPropagation();
	}

	return (
		<Pressable style={styles.overlay} onPress={() => !bgImageLoading && dispatch(controlsToggle())}>
			<Animated.View style={[styles.left, { opacity: overlayOpacity }]}>
				<Pressable style={styles.nested} onPress={handleNext} />
			</Animated.View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	overlay: {
		position: 'absolute',
		left: 0,
		right: 0,
		width: '100%',
		height: '100%',
		flex: 1,
		zIndex: 100,
	},
	left: {
		position: 'absolute',
		width: '20%',
		height: '100%',
		right: '0%',
		flex: 1,
		zIndex: 80,
		// backgroundColor: 'rgba(0,255,0,0.7)',
	},
	nested: {
		flex: 1,
	}
});

export default Controls;
