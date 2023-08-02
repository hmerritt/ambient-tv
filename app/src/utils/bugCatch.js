/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */
import { recordEvent as bugcatchRecordEvent } from '@bug-catch/react-native';

import env from '../../env';

export const bugCatchOptions = {
	base_url: `${env.APP_SERVER_URL}/bug-catch`,
	release: '1.2.12',
	logEvents: true,
};

export const recordEvent = (name, data) => {
	if (!env.BUGCATCH_ENABLE) return;
	bugcatchRecordEvent(name, data, bugCatchOptions);
};
