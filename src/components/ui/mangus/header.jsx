
import * as React from "react";
import { Header, Icon } from "react-native-magnus";

const HeaderWidget = ({ data }) => {
    return (
        <Header
            {...data.props}
            prefix={data.prefix ? <Icon {...data.prefix.props} /> : null}
            suffix={data.suffix ? <Icon {...data.suffix.props} /> : null}
        >
            {data?.text?.value}
        </Header>
    );
};

export default HeaderWidget;