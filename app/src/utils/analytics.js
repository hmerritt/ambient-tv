import axios from "axios";
import Constants from "expo-constants";

import env from "@/env";

/**
 * Records plausible.io event (if enabled).
 *
 * @param {'pageview' | 'image/view' | 'image/skip' | 'sessiontime/10m' | 'sessiontime/30m' | 'sessiontime/1h' | 'sessiontime/6h' | 'sessiontime/12h' | 'sessiontime/24h' | 'sessiontime/1w'} name - The name of the event
 */
export const recordEvent = async (name = "pageview") => {
    try {
        if (!env.PLAUSIBLE_ENABLE) return;
        const userAgent = (await Constants.getWebViewUserAgentAsync()) || "";

        await axios.post(
            `${env.PLAUSIBLE_API_URL}/api/event`,
            {
                name,
                domain: env.PLAUSIBLE_HOST,
                url: `https://${env.PLAUSIBLE_HOST}/`
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "User-Agent": userAgent
                }
            }
        );
    } catch (e) {
        // Fail silently
    }
};

export const recordSessionTimeSpent = (timeSpentInSeconds = 0) => {
    if (!env.PLAUSIBLE_ENABLE || !timeSpentInSeconds) return;

    // @Note: Needs to be divisible by 2
    const timersToRecord = [
        [60 * 10, "10m"],
        [60 * 30, "30m"],
        [60 * 60 * 1, "1h"],
        [60 * 60 * 6, "6h"],
        [60 * 60 * 12, "12h"],
        [60 * 60 * 24, "24h"],
        [60 * 60 * 24 * 7, "1w"]
    ];

    timersToRecord.forEach(([seconds, friendly]) => {
        if (timeSpentInSeconds === seconds) {
            recordEvent(`sessiontime/${friendly}`);
        }
    });
};
