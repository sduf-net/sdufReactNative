
import * as React from "react";
import { Button, Icon, Text } from "react-native-magnus";

const ButtonWidget = ({ data }) => {
    return (
        <Button {...data.props}>
            {data.text ? <Text {...data.text.props}>{data.text.value}</Text> : null}
            {data.icon ? <Icon {...data.icon.props} /> : null}
        </Button>
    );
};

export default ButtonWidget;