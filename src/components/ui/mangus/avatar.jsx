
import * as React from "react";
import { Avatar, Icon } from "react-native-magnus";
import CustomTouchableOpacity from "../../helpers/touchableOpacity";

const AvatarWidget = ({ data }) => {
    return (
        <CustomTouchableOpacity data={data}>
            <Avatar {...data.props} >
                {data?.text?.value}
                {data?.image?.props && <Icon {...data.image.props} />}
            </Avatar>
        </CustomTouchableOpacity>
    );
};

export default AvatarWidget;