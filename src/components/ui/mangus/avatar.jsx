
import * as React from "react";
import { Avatar, Icon } from "react-native-magnus";

const AvatarWidget = ({ data }) => {
    return (
        <Avatar {...data.props} >
            {data?.text?.value}
            {data?.image?.props && <Icon {...data.image.props} />}
        </Avatar>
    );
};

export default AvatarWidget;