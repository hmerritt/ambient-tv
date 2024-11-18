import React from "react";
import { Animated } from "react-native";
import { useSelector } from "react-redux";

import env from "@/env";

import Attribution from "./Attribution";
import Description from "./Description";

const BGAbout = () => {
    const backgrounds = useSelector((state) => state.bgImage.render.backgrounds);
    const loading = useSelector((state) => state.bgImage.render.current.loading);

    const currentBG = backgrounds[backgrounds.length - 1];
    const previousBG = backgrounds[backgrounds.length - 2];

    const fadeIn = currentBG && !loading;
    const fade = new Animated.Value(fadeIn ? 0 : 1);
    if (currentBG) {
        Animated.timing(fade, {
            toValue: fadeIn ? 1 : 0,
            duration: fadeIn ? env.ANIMATION_LONG : 500,
            delay: fadeIn ? env.ANIMATION_LONG / 2.2 : 0,
            useNativeDriver: true
        }).start();
    }

    return (
        <>
            {currentBG && !loading && (
                <Animated.View style={{ opacity: fade }}>
                    <Description background={currentBG} />
                    <Attribution background={currentBG} />
                </Animated.View>
            )}
            {previousBG && loading && (
                <Animated.View style={{ opacity: fade }}>
                    <Description background={previousBG} />
                    <Attribution background={previousBG} />
                </Animated.View>
            )}
        </>
    );
};

export default BGAbout;
