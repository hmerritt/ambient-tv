import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";

import { useInterval } from "@/hooks/useInterval";

const Clock = () => {
    const [clock, setClock] = useState(moment.now());

    // Increment clock
    useInterval(() => {
        setClock(moment.now());
    }, 5000);

    return (
        <>
            <Text style={styles.text}>{moment(clock).format("HH:mm")}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        opacity: 0.9,
        fontFamily: "Roboto-Medium",
        fontSize: 45,
        color: "#ffffff",
        paddingLeft: 25
    }
});

export default Clock;
