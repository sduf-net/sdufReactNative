
import * as React from "react";
import { Text } from "react-native-magnus";

const TextWidget = ({ data }) => {
    return (
        <Text {...data.props}>
            {data.text}
        </Text>
    );
};

export default TextWidget;