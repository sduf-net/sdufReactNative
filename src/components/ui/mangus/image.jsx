
import * as React from "react";
import { Image } from "react-native-magnus";

const ImageWidget = ({ data }) => {
    return (
        <Image {...data.props} />
    );
};

export default ImageWidget;