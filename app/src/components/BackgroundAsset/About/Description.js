import React from "react";
import { StyleSheet, Text } from "react-native";

const Description = ({ background }) => {
    // Render nothing if no description available
    if (!background.description) {
        return <></>;
    }

    return (
        <>
            <Text style={[styles.text, styles.description]} numberOfLines={1}>
                {background.method === "unsplash" && (
                    <>{background.description || "Untitled"}</>
                )}
                {background.method !== "unsplash" && <>{background.description}</>}
            </Text>
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        width: 350,
        opacity: 0.8,
        fontFamily: "Roboto-Medium",
        fontSize: 10,
        color: "#ffffff",
        textTransform: "capitalize"
    },
    description: {
        fontSize: 13
    }
});

export default Description;
