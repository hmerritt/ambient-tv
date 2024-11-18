import React, { useCallback } from "react";
import { Alert, Button, Linking, Text } from "react-native";

const Link = ({ type, url, children }) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    switch (type) {
        case "text":
            return <Text onPress={handlePress}>{children}</Text>;

        default:
            return <Button title={children} onPress={handlePress} />;
    }
};

export default Link;
