import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";

import store from "@/state";

import BGSlideshow from "./BackgroundAsset/BGSlideshow";
import Controls from "./Controls";
import Overlay from "./Overlay";
import Title from "./Title";

const AmbientScene = ({ interactive = true, requestLocationPermission = true }) => {
    return (
        <Provider store={store}>
            <View style={styles.root}>
                <Title />
                <BGSlideshow />
                <Overlay requestLocationPermission={requestLocationPermission} />
                {interactive && <Controls />}
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff"
    }
});

export default AmbientScene;
