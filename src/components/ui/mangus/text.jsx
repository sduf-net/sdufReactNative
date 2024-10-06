
import * as React from "react";
import { Text } from "react-native-magnus";
import CustomTouchableOpacity from "../../helpers/touchableOpacity";

const TextWidget = ({ data }) => {
    return (
        <CustomTouchableOpacity data={data}>
            <Text {...data.props}>
                {data.text}
            </Text>
        </CustomTouchableOpacity>
    );
};

export default TextWidget;