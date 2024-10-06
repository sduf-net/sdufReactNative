
import * as React from "react";
import { Input, Icon } from "react-native-magnus";

const InputWidget = ({ data }) => {
    return (
        <Input {...data.props}/>
    );
};

export default InputWidget;