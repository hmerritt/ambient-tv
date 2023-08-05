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
