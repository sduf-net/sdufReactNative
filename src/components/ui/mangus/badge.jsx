
import * as React from "react";
import { VirtualizedList } from "react-native";
import { Badge } from "react-native-magnus";
import { getItem, getItemCount } from "../../../utils";

const BadgeWidget = (config) => {
    const renderWidget = ({ item }) => <config.factory props={item} />;

    return (
        <Badge {...config.data.props}>
            {config?.nestedComponents?.length > 0 ? <VirtualizedList
                data={config.nestedComponents}
                renderItem={renderWidget}
                keyExtractor={(item) => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            /> : config.data.text.value ? config.data.text.value : null}
        </Badge>
    );
};

export default BadgeWidget;