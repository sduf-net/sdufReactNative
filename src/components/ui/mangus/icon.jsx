
import * as React from "react";
import { Icon } from "react-native-magnus";

const IconWidget = ({ data }) => {
    return (
        <Icon {...data.props} />
    );
};

export default IconWidget;