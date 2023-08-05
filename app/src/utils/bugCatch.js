/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */
import { init as bugcatchInit } from '@bug-catch/react-native';

import env from '../../env';

// Bugcatch init (records all errors)
export const bugCatch = bugcatchInit({
	baseUrl: `${env.APP_SERVER_URL}/bug-catch`,
	release: '1.2.18',
	logEvents: true,
	disableExceptionHandler: !env.BUGCATCH_ENABLE,
});

export const recordEvent = (name, data) => {
	if (!env.BUGCATCH_ENABLE) return;
	bugCatch.recordEvent(name, data);
};

export const recordSessionTimeSpent = (timeSpentInSeconds = 0) => {
	if (!env.BUGCATCH_ENABLE || !timeSpentInSeconds) return;

	const timersToRecord = [
		[60000 * 5, '5m'],
		[60000 * 10, '10m'],
		[60000 * 30, '30m'],
		[60000 * 60 * 1, '1h'],
		[60000 * 60 * 6, '6h'],
		[60000 * 60 * 12, '12h'],
		[60000 * 60 * 24, '24h'],
	];

	timersToRecord.forEach(([seconds, friendly]) => {
		if (timeSpentInSeconds === seconds) {
			recordEvent(`sessionTime-${friendly}`, `user spent ${seconds} seconds (${friendly}) on the app`);
		}
	})
}