
import * as React from "react";
import { Toggle } from "react-native-magnus";

const ToggleWidget = ({ data }) => {
    const [on, toggle] = useState(false);

    return (
        <Toggle on={on}
            onPress={() => toggle(!on)} {...data.props} />
    );
};

export default ToggleWidget;